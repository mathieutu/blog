<template>
  <div id="tags" class="no-edit">
    <div class="content">
      <TagBadges :tags="$tags.list.map(t => t.name).sort()"/>
    </div>
    <LayoutWithBio/>
  </div>
</template>

<script>
import LayoutWithBio from "./LayoutWithBio";
import TagBadges from '@theme/components/TagBadges.vue';

export default {
  name: 'Tags',
  components: { LayoutWithBio, TagBadges }
};
</script>

<style>
.tags {
  padding-left: 1.2em;
}

</style>
