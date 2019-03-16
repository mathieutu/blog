<template>
  <ExternalLink :href="url" :title="`${nickname} Twitter profile`">{{content}}</ExternalLink>
</template>

<script>
import ExternalLink from '@theme/global-components/ExternalLink.vue';

export default {
  name: 'Twl',
  props: { id: { type: String, required: false } },
  components: {
    ExternalLink
  },

  computed: {
    slot() {
      return this.$slots.default[0].text
    },
    nickname() {
      const nick = this.id || this.slot;

      return nick[0] === '@' ? nick : `@${nick}`
    },
    content() {
      return this.slot && this.id ? this.slot : this.nickname ;
    },
    url() {
      return 'https://twitter.com/' + this.nickname.substring(1)
    }
  }

};

</script>

<style lang="scss" scoped>

</style>
