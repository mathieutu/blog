<template>
  <div class="hints" v-if="hints && hints.length">
    <p class="">You can find this page with theses search keywords:</p>
    <div class="list">
      <span v-for="(hint, index) in hints" :key="index">
        <span class="sep"> / </span><span v-text="hint" class="text"/><span class="sep" v-if="index === hints.length - 1"> / </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Hints',
  computed: {
    hints() {
      return this.$page.frontmatter.hints;
    }
  }
};
</script>
<style lang="stylus">
  @require '~@vuepress/theme-default/styles/wrapper.styl'
  .hints
    @extend $wrapper
    padding-top 0
    padding-bottom 0
    overflow auto
    font-size 0.9em
    margin-top -1rem
    margin-bottom 2rem

    p
      margin-block-end 0.5rem

    .list
      margin-left 1rem

    .text
      color: hsl(0, 0%, 60%);

    .sep
      color: var(--tag-badge-color)
</style>
