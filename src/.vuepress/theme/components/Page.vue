<template>
  <main class="page">
    <slot name="top"/>

    <Content class="theme-default-content"/>
    <Hints/>
    <PageEdit/>
    <PageNav v-bind="{ sidebarItems }"/>

    <slot name="bottom"/>
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';
import Hints from './Hints';

export default {
  components: { Hints, PageEdit, PageNav },
  props: ['sidebarItems']
};
</script>

<style lang="stylus">
  .page
    padding-bottom 2rem
    display block
</style>
