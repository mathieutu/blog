<template>
  <div class="tweet" ref="tweetWrapper">
    <div v-if="tweet" class="styled-tweet" v-html="tweet" style="display: inline-block"/>
    <div v-else v-html="defaultTweet" style="display: inline-block"/>
    <div ref="slotWrapper" v-show="false">
      <slot/>
    </div>
  </div>
</template>

<script>
const warningMessage = `<blockquote class="warning">☝️ This tweet can't be shown properly. This can be due to privacy blocking by your browser.
 The preview is made by a custom component, so I can guarantee you that no piece of information is leaking to anybody on this website.
 You can trustly and peacefully disable your privacy blocker during your navigation on the blog.</blockquote>`;


export default {
  name: 'Tweet',

  data() {
    return {
      tweet: null,
      rawTweet: null,
    };
  },
  computed: {
    id() {
      const matches = this.rawTweet
        .match(/(?:^|(?:https?:)?\/\/(?:www\.)?twitter\.com(?::\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i);

      const id  = matches && matches[1];

      return this.rawTweet.match('data-cards="hidden"') ? `${id}-c` : id
    },
    defaultTweet() {
      return this.rawTweet + warningMessage;
    }
  },

  async mounted() {
    this.rawTweet = this.$refs.slotWrapper.innerHTML;

    if (!window.__twttr) {
      window.__twttr = [];
    }

    const idSanitized = this.id.replace('-', '');

    window.__twttr[`_${idSanitized}`] = (result) => {
      this.tweet = result[this.id]
        .replace(/data-src-2x/g, 'src')
        .replace(/data-image="(\S+)"/g, 'src="$1.png"')
        .replace(/href/g, 'target="_blank" rel="noopener noreferer" href');
    };

    var script = document.createElement('script');
    script.src = `https://cdn.syndication.twimg.com/tweets.json?ids=${this.id}&callback=__twttr._${idSanitized}`;
    this.$refs.tweetWrapper.appendChild(script);
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
        max-width: inherit !important;
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
