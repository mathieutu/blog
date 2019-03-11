<template>
  <div>
    <div :key="year" v-for="year in years">
      <TitleWithLink v-if="groupByYear" tag="h3" :title="year" />
      <ul :key="post.title" v-for="post in sortByDate(posts[year])">
        <li :id="post.key">
          <div style="display: flex;">
            <router-link :to="post.path">{{ post.title }}</router-link>
            <Date :page="post" style="margin-left: 0.5rem;" :options="{month: 'long', day: '2-digit'}"/>
          </div>
          <TagBadges :tags="post.frontmatter.tags"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TitleWithLink from '@theme/components/TitleWithLink.vue';
import TagBadges from '@theme/components/TagBadges.vue';
import DateComponent from '@theme/components/Date.vue';

export default {
  name: 'Posts',
  components: { TitleWithLink, TagBadges, Date: DateComponent },
  props: {
    filter: {
      type: Function,
      required: false,
      default: () => true
    },
    groupByYear: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    posts() {
      return this.$site.pages
        .filter(({ type }) => type === 'post')
        .filter(this.filter)
        .reduce((posts, post) => {
          const year = post.path.match(/blog\/20\d{2}/)[0].split('/')[1];

          return { ...posts, [year]: [...(posts[year] || []), post] };
        }, {});
    },
    years() {
      return Object.keys(this.posts).sort((a, b) => a - b);
    }
  },
  methods: {
    sortByDate(pages) {
      return pages.sort((a, b) => {
        return new Date(a.frontmatter.date) < new Date(b.frontmatter.date) ? 1 : -1;
      });
    },
    getPostYear(post) {
      return new Date(post.frontmatter.date).getFullYear();
    }
  }
};
</script>

<style scoped>
  .excerpt {
    color: gray;
  }

  ul {
    list-style-type: none;
  }
</style>
