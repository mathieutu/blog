<template>
  <div id="tag" class="no-edit">
    <div class="theme-default-content">
      <PageTitle />
      <Posts :filter="filterByTag" />
    </div>
    <LayoutWithBio />
  </div>
</template>

<script>
import LayoutWithBio from '@theme/layouts/LayoutWithBio';
import PageTitle from '@theme/global-components/PageTitle.vue';
import Posts from '@theme/global-components/Posts.vue';

export default {
  name: 'Tag',
  components: { LayoutWithBio, PageTitle, Posts },
  computed: {
    tagName() {
      return this.$page.frontmatter.tagName;
    },
  },
  methods: {
    filterByTag(page) {
      return page.frontmatter.tags.includes(this.tagName);
    },
  },
};
</script>
