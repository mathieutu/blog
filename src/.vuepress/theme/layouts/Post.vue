<template>
  <div class="post">
    <div class="content header">
      <PageTitle/>
    </div>
    <div class="meta wrapper">
      <div>
        <Date/>
        ·
        <ReadingTime/>
      </div>
      <TagBadges/>
    </div>
    <LayoutWithBio/>
  </div>
</template>

<script>
import LayoutWithBio from '@theme/layouts/LayoutWithBio.vue';
import Date from '@theme/components/Date.vue';
import ReadingTime from '@theme/components/ReadingTime.vue';
import TagBadges from '@theme/components/TagBadges.vue';
import PageTitle from '@theme/global-components/PageTitle.vue';

export default {
  name: 'Post',
  components: { LayoutWithBio, Date, ReadingTime, TagBadges, PageTitle },
  computed: {}
};
</script>


<style lang="stylus">
  .post {
    .content {
      max-width: var(--content-width);

      &:not(.custom) {
        > h1:first-child {
          margin-bottom: 0 !important;
        }

        > *:first-child {
          margin-top: 2rem;
        }
      }

      &.header {
        margin-top: 2rem;
      }
    }

    .date-container {
      display: inline-block;
      margin-top: 0.25rem;
    }

    .meta {
      font-weight: 400;
      font-size: 14px;
      color: hsl(0, 0%, 60%);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
</style>
