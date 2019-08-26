<template>
  <div id="tag" class="no-edit">
    <div class="theme-default-content">
      <PageTitle :title="title"/>
      <Posts :filter="filterByTag"/>
    </div>
    <LayoutWithBio/>
  </div>
</template>

<script>
import LayoutWithBio from '@theme/layouts/LayoutWithBio';
import PageTitle from '@theme/global-components/PageTitle.vue';
import Posts from '@theme/global-components/Posts.vue';

function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
  name: 'Tag',
  components: { LayoutWithBio, PageTitle, Posts },
  methods: {
    filterByTag(page) {
      return page.frontmatter.tags.indexOf(this.tagName) > -1;
    }
  },
  computed: {
    tagName() {
      return this.$route.meta.tagName;
    },
    title() {
      return 'Posts about ' + ucFirst(this.tagName);
    }
  }
};
</script>
