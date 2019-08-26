<template>
  <component :id="slugTitle" :is="tag">
    <a :href="`#${slugTitle}`" aria-hidden="true" class="header-anchor">#</a> {{ title }}
  </component>
</template>
<script>
import { remove } from 'diacritics';

function slugify(str) {
  return remove(str)
  // Remove control characters
    .replace(/[\u0000-\u001f]/g, '')
    // Replace special characters
    .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g, '-')
    // Remove continous separators
    .replace(/-{2,}/g, '-')
    // Remove prefixing and trailing separtors
    .replace(/^-+|\-+$/g, '')
    // ensure it doesn't start with a number (#121)
    .replace(/^(\d)/, '_$1')
    // lowercase
    .toLowerCase();
};

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
      return slugify(this.title);
    }
  }
};
</script>
