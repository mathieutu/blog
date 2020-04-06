<template>
  <div id="tags" class="no-edit">
    <div class="theme-default-content">
      <PageTitle title="List of Tags" />
      <TagBadges :tags="tagsList" />
    </div>
    <LayoutWithBio />
  </div>
</template>

<script>
import LayoutWithBio from './LayoutWithBio';
import TagBadges from '@theme/components/TagBadges.vue';

export default {
  name: 'Tags',
  components: { LayoutWithBio, TagBadges },
  computed: {
    tagsList() {
      return this.$site.pages
      .filter(({ type }) => type === 'tag')
      .map(({ frontmatter: { tagName } }) => tagName);
    },
  },
};
</script>
