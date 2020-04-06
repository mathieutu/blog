<template>
  <div class="tags">
    <div class="tag" v-for="tag in tagList">
      <router-link :to="tagsPaths[tag]">
        <Badge vertical="middle">{{ tag }}</Badge>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: null,
    },
  },
  computed: {
    tagList() {
      return (this.tags || this.$page.frontmatter.tags || []).sort((a, b) => a.localeCompare(b));
    },
    tagsPaths() {
      return Object.fromEntries(
        this.$site.pages
        .filter(({ type }) => type === 'tag')
        .map(({ frontmatter: { tagName }, regularPath }) => [tagName, regularPath])
      );
    },
  },
};
</script>

<style>
  .tags {
    align-items: center;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

  .tags .tag {
    float: left;
  }

  .tag .badge {
    background-color: var(--tag-badge-color) !important;
    white-space: nowrap;
    margin-right: 5px;
  }
</style>
