<template>
  <div>
    <Layout/>
    <Bio/>
  </div>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue';
import Bio from '@theme/components/Bio.vue';

export default {
  name: 'LayoutWithBio',
  components: {
    Layout, Bio
  }
};
</script>
