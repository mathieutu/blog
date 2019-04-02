<template>
  <div class="tweet">
    <div class="styled-tweet" v-html="tweet" style="display: inline-block"/>
  </div>
</template>

<script>
import axios from 'axios';

const replaceAllImagesToDataUri = async str => {
  const promises = [];
  const regex = /(https:)?(\/\/\S+twimg[^\s"]+)/g;

  const imageDataUri = require('image-data-uri');

  str.replace(regex, (match, https, url) => {
    promises.push(imageDataUri.encodeFromURL('https:' + url));
  });

  const dataUris = await Promise.all(promises);

  return str.replace(regex, () => dataUris.shift());
};


export default {
  props: {
    url: {
      type: String,
      required: true
    },
    media: {
      type: Boolean,
      default: true
    },
    parent: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tweet: 'Loading Tweet...',
    };
  },

  async serverPrefetch() {
    this.tweet = await this.getTweetHtml((await axios.get(this.apiUrl)).data);
    this.$setInStore(this.storageKey, this.tweet);
  },

  mounted() {
    this.tweet = this.$getInStore(this.storageKey);
  },

  computed: {
    id() {
      const matches = this.url
        .match(/(?:^|(?:https?:)?\/\/(?:www\.)?twitter\.com(?::\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i);

      const id = matches && matches[1];

      const options = [
        !this.media && 'c',
        !this.parent && 't',
      ].filter(Boolean).join('');

      return id + (options ? `-${options}` : '');
    },

    apiUrl() {
      return `https://cdn.syndication.twimg.com/tweets.json?ids=${this.id}`;
    },
    storageKey() {
      return `tweet-${this.id}`;
    }
  },

  methods: {
    async getTweetHtml(response) {
      const html = response[this.id]
        .replace(/href/g, 'target="_blank" rel="noopener noreferer" href')
        .replace(/data-src-2x/g, 'src')
        .replace(/data-image="(\S+)"/g, 'src="$1?format=png&name=medium"');

      return await replaceAllImagesToDataUri(html);
    }
  },

};

</script>

<style lang="stylus">
  .tweet {
    display flex
    justify-content center
    margin: 1rem 0

    .warning {
      font-size: 0.7rem
      font-style: italic
      border-left: none
      margin: 2rem
      padding: 0
    }

    .styled-tweet {
      blockquote {
        color initial
      }

      @import "../../styles/twitter.styl"

      a {
        font-weight 400
        text-decoration none !important
      }

      .EmbeddedTweet {
        cursor default
      }

      .u-linkBlend:not(:focus):not(:hover):not(:active) {
        color: inherit !important;
      }

      img {
        // Problème avec /blog/2019/git-checkout-pr.html
        // max-width: inherit !important;
      }
    }

    blockquote.twitter-tweet {
      overflow: hidden;
      color: #1c2022;
      background-color: #fff;
      border: 1px solid;
      border-color: #eee #ddd #bbb;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      width: 500px;
      max-width: 100%;
      min-width: 220px;
      padding: 1rem;
      margin-left 2rem
      font-weight: bold;


      &:before {
        content: none;
      }

      p {
        white-space: pre-wrap;
        font: 16px / 1.4 Helvetica, Roboto, 'Segoe UI', Calibri, sans-serif;
        margin-bottom: 0.5rem;
        font-weight: normal;
      }

      a {
        color: #2b7bb9;
      }

      a:visited {
        color: #2b7bb9;
      }
    }
  }
</style>
