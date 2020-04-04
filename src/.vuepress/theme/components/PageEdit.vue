<template>
  <footer class="page-edit">
    <ExternalLink :href="editLink"> {{ editLinkText }}</ExternalLink>
    <ExternalLink :href="lastCommitLink" v-if="lastUpdated">Updated {{ lastUpdated }}</ExternalLink>
  </footer>
</template>
<script>
import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { endingSlashRE, normalize, outboundRE } from '@vuepress/theme-default/util';
import ExternalLink from '@theme/global-components/ExternalLink.vue';

export default {
  name: 'PageEdit',
  components: {ExternalLink},
  computed: {
    lastUpdated() {
      const date = this.$page.lastUpdated || parseISO(this.$page.frontmatter.date);

      return isValid(date) ? formatDistanceToNow(date, {
        includeSeconds: true,
        addSuffix: true,
      }) : null;
    },

    lastCommitLink() {
      const {
        repo,
        docsRepo = repo
      } = this.$site.themeConfig;

      const hash = this.$page.lastCommit;

      return this.createLastCommitLink(docsRepo, hash);
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }

      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig;

      let path = normalize(this.$page.path);
      if (endingSlashRE.test(path)) {
        path += 'Readme.md';
      } else {
        path += '.md';
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(docsRepo, docsDir, docsBranch, path);
      }
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText
        || this.$site.themeConfig.editLinkText
        || `Edit this page`
      );
    }
  },

  methods: {
    createEditLink(docsRepo, docsDir, docsBranch, path) {
      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;

      return (
        base.replace(endingSlashRE, '')
        + `/edit/${docsBranch}`
        + (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '')
        + path
      );
    },
    createLastCommitLink(docsRepo, hash) {
      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;

      return (
        base.replace(endingSlashRE, '')
        + `/commit/${hash}`
      );
    }
  }
};
</script>

<style lang="stylus">
  @require '~@vuepress/theme-default/styles/wrapper.styl'
  .no-edit {
    .page-edit {
      display none
    }
  }

  .page-edit
    @extend $wrapper
    padding-top 1rem
    padding-bottom 1rem
    overflow auto
    font-size 0.9em
    display flex
    justify-content space-between
    flex-wrap wrap
    a
      color lighten($textColor, 25%)
      margin-right 0.25rem
      &:hover
        text-decoration underline
</style>
