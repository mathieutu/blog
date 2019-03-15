<template>
  <ExternalLink :href="url" :title="`${id} Twitter profile`"><slot/></ExternalLink>
</template>

<script>
import ExternalLink from '@theme/global-components/ExternalLink.vue';

export default {
  name: 'Twl',
  //props: { id: { type: String, required: true } },
  components: {
    ExternalLink
  },

  computed: {
    id() {
      return this.$slots.default[0].text;
    },
    url() {
      return 'https://twitter.com/' + this.id.replace(/^@/, '')
    }
  }

};

</script>

<style lang="scss" scoped>

</style>
