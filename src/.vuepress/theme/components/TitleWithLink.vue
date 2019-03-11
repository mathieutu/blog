<template>
  <component :id="slugTitle" :is="tag">
    <a :href="`#${slugTitle}`" aria-hidden="true" class="header-anchor">#</a> {{ title }}
  </component>
</template>
<script>
import slugiphy from '@vuepress/shared-utils/lib/slugify';

export default {
  name: 'TitleWithLink',
  props: {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    }
  },
  computed: {
    slugTitle() {
      return slugiphy(this.title);
    }
  }
};
</script>
