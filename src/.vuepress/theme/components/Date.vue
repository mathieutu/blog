<template>
  <div class="date-container">
    <span class="date">{{ dateFormatted }}</span>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      required: false,
      default: () => null
    },
    options: {
      type: Object,
      required: false,
      default: () => {},
    },
    lang: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    dateFormatted() {
      const page = this.page || this.$page;
      const lang = this.lang || this.$lang;

      return new Date(page.frontmatter.date || page.lastUpdated).toLocaleDateString(lang, this.options);
    }
  },
};
</script>

<style>
  .date {
    font-weight: 400;
    font-size: 14px;
    color: hsl(0, 0%, 60%);
  }
</style>
