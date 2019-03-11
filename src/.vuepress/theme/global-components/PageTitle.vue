<template>
  <TitleWithLink tag="h1" :title="computedTitle" />
</template>
<script>
import TitleWithLink from '@theme/components/TitleWithLink';

export default {
  name: 'PageTitle',
  components: { TitleWithLink },
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    computedTitle() {
      return this.title || this.$page.title;
    },
  }
};
</script>
