<template>
  <a v-bind="$attrs" target="_blank" rel="noopener noreferrer"><slot/><OutboundLink/></a>
</template>
<script>
export default {
  name: 'ExternalLink',
};
</script>
