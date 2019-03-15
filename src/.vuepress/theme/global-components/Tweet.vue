<template>
  <div class="tweet">
    <div v-html="tweet" @click="onClick" style="display: inline-block"/>
  </div>
</template>

<script>
export default {
  name: 'Tweet',
  props: { url: { type: String, required: true } },

  data() {
    return {
      tweet: ''
    };
  },
  computed: {
    id() {
      const id = this.url.replace(/(?:^|(?:https?:)?\/\/(?:www\.)?twitter\.com(?::\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i, '$1');
      return `${id}-c`;
    }
  },

  async mounted() {
    window.__twttr = (result) => {
      this.tweet = result[this.id].replace('data-src-2x', 'src');
    };
    var script = document.createElement('script');
    script.src = `https://cdn.syndication.twimg.com/tweets.json?ids=${this.id}&callback=__twttr`;
    document.getElementsByTagName('head')[0].appendChild(script);
  },
  methods: {
    onClick() {
      window.open(this.url, '_blank', 'noopener');
    }
  }
};

</script>

<style lang="stylus">
  .tweet
    display flex
    justify-content center
    blockquote
      color initial

    @import "../../styles/twitter.styl"
</style>
