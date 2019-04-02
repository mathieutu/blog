<template>
  <CenterWrapper>
    <img :src="dataUri" :alt="alt" v-bind="$attrs">
  </CenterWrapper>
</template>

<script>
import CenterWrapper from '@theme/components/CenterWrapper.vue';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  components: {
    CenterWrapper,
  },

  data() {
    return {
      dataUri: {}
    };
  },

  async serverPrefetch() {
    const imageDataUri = require('image-data-uri');
    this.dataUri = await imageDataUri.encodeFromURL(this.src);

    this.$setInStore(this.storageKey, this.dataUri);
  },

  mounted() {
    this.dataUri = this.$getInStore(this.storageKey);
  },

  computed: {
    storageKey() {
      return `image-${this.src}`
    }
  }
};

</script>
