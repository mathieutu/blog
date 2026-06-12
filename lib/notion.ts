import {
  type ExtendedRecordMap,
  type SearchParams,
  type SearchResults
} from 'notion-types'
import { getBlockValue, getPageProperty, mergeRecordMaps } from 'notion-utils'
import pMap from 'p-map'

import {
  isPreviewImageSupportEnabled,
  navigationLinks,
  navigationStyle
} from './config'
import { getTweetsMap } from './get-tweets'
import { notion } from './notion-api'
import { getPreviewImageMap } from './preview-images'

const getNavigationLinkPages = async (): Promise<ExtendedRecordMap[]> => {
  const navigationLinkPageIds = (navigationLinks || [])
    .map((link) => link?.pageId)
    .filter(Boolean)

  if (navigationStyle !== 'default' && navigationLinkPageIds.length) {
    return pMap(
      navigationLinkPageIds,
      async (navigationLinkPageId) =>
        notion.getPage(navigationLinkPageId, {
          chunkLimit: 1,
          fetchMissingBlocks: false,
          fetchCollections: false,
          signFileUrls: false
        }),
      {
        concurrency: 4
      }
    )
  }

  return []
}

function compareBlocks(
  a: string,
  b: string,
  recordMap: ExtendedRecordMap
): number {
  const blockA = getBlockValue(recordMap.block[a])
  const blockB = getBlockValue(recordMap.block[b])

  const featuredA = blockA
    ? getPageProperty<boolean>('Featured', blockA, recordMap)
    : false
  const featuredB = blockB
    ? getPageProperty<boolean>('Featured', blockB, recordMap)
    : false

  if (featuredA !== featuredB) return featuredA ? -1 : 1

  const dateA = blockA
    ? (getPageProperty<number>('Last Updated', blockA, recordMap) ??
      blockA.last_edited_time ??
      0)
    : 0
  const dateB = blockB
    ? (getPageProperty<number>('Last Updated', blockB, recordMap) ??
      blockB.last_edited_time ??
      0)
    : 0

  return dateB - dateA
}

function sortCollectionBlockIds(recordMap: ExtendedRecordMap): void {
  for (const collectionId of Object.keys(recordMap.collection_query ?? {})) {
    for (const viewId of Object.keys(
      recordMap.collection_query[collectionId]!
    )) {
      const result = recordMap.collection_query[collectionId]![viewId]!

      if (result.collection_group_results?.blockIds) {
        result.collection_group_results.blockIds =
          result.collection_group_results.blockIds.toSorted((a, b) =>
            compareBlocks(a, b, recordMap)
          )
      }

      if (result.blockIds) {
        result.blockIds = result.blockIds.toSorted((a, b) =>
          compareBlocks(a, b, recordMap)
        )
      }

      if (result.groupResults) {
        for (const group of result.groupResults) {
          if (group.blockIds) {
            group.blockIds = group.blockIds.toSorted((a, b) =>
              compareBlocks(a, b, recordMap)
            )
          }
        }
      }
    }
  }
}

function filterPrivatePages(recordMap: ExtendedRecordMap): void {
  const privatePageIds = new Set(
    Object.keys(recordMap.block).filter((id) => {
      const block = getBlockValue(recordMap.block[id])
      if (
        !block ||
        block.type !== 'page' ||
        block.parent_table !== 'collection'
      ) {
        return false
      }
      return (
        getPageProperty<boolean | null>('Public', block, recordMap) === false
      )
    })
  )

  if (!privatePageIds.size) return

  for (const id of privatePageIds) {
    delete recordMap.block[id]
  }

  for (const collectionId of Object.keys(recordMap.collection_query ?? {})) {
    for (const viewId of Object.keys(
      recordMap.collection_query[collectionId]!
    )) {
      const result = recordMap.collection_query[collectionId]![viewId]!
      if (result.blockIds) {
        result.blockIds = result.blockIds.filter(
          (id) => !privatePageIds.has(id)
        )
      }
      if (result.groupResults) {
        for (const group of result.groupResults) {
          if (group.blockIds) {
            group.blockIds = group.blockIds.filter(
              (id) => !privatePageIds.has(id)
            )
          }
        }
      }
    }
  }
}

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  let recordMap = await notion.getPage(pageId)

  if (navigationStyle !== 'default') {
    // ensure that any pages linked to in the custom navigation header have
    // their block info fully resolved in the page record map so we know
    // the page title, slug, etc.
    const navigationLinkRecordMaps = await getNavigationLinkPages()

    if (navigationLinkRecordMaps?.length) {
      recordMap = navigationLinkRecordMaps.reduce(
        (map, navigationLinkRecordMap) =>
          mergeRecordMaps(map, navigationLinkRecordMap),
        recordMap
      )
    }
  }

  filterPrivatePages(recordMap)
  sortCollectionBlockIds(recordMap)

  if (isPreviewImageSupportEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap)
    ;(recordMap as any).preview_images = previewImageMap
  }

  await getTweetsMap(recordMap)

  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}
