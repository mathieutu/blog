import { NotionAPI } from 'notion-client'

export const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL,
  ofetchOptions: {
    retry: 3,
    retryDelay: (ctx) => Math.min(1000 * 2 ** (3 - (ctx.options.retry as number ?? 0)), 8000)
  }
})
