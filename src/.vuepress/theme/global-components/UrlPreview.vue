<template>
  <CenterWrapper>
    <a class="url-preview" :href="url" rel="noopener noreferer">
      <div class="url-preview__image" v-if="imgUrlComputed" :style="{ backgroundImage: `url(${imgUrlComputed})`}" />
      <div class="url-preview__text">
        <span class="url-preview__title" v-text="titleComputed" />
        <span class="url-preview__description" v-text="descriptionComputed" />
        <span class="url-preview__link" v-text="domainComputed" />
      </div>
    </a>
  </CenterWrapper>
</template>

<script>
import CenterWrapper from '@theme/components/CenterWrapper.vue';

import axios from 'axios';
import ellipsize from 'ellipsize';

export default {
  props: {
    imgUrl: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
  },
  components: {
    CenterWrapper,
  },

  data() {
    return {
      meta: {}
    };
  },

  async serverPrefetch() {
    this.meta = (await axios.get(
      `https://metatags.io/api/metadata?domain=${this.url}`,
      { headers: { Referer: 'https://metatags.io/' } }
    )).data;
    this.$setInStore(this.storageKey, this.meta);
  },

  mounted() {
    this.meta = this.$getInStore(this.storageKey);
  },

  computed: {
    imgUrlComputed() {
      return this.imgUrl || this.meta['og:image'] || this.meta['twitter:image'];
    },
    titleComputed() {
      return this.title || this.meta['title'] || this.meta['og:title'];
    },
    descriptionComputed() {
      const description = this.description || this.meta['description'] || this.meta['og:description'] || this.meta['twitter:description'];

      return ellipsize(description, 200, { chars: [' ', '-', '.', ',', '!', '?', ';', ':'], truncate: false });
    },
    domainComputed() {
      return (new URL(this.url)).hostname.replace('www.', '');
    },
    storageKey() {
      return `meta-${this.url}`;
    }
  }
};

</script>

<style>
  .url-preview {
    text-decoration: none !important;
    color: inherit;
    /*cursor: pointer;*/
    position: relative;
    display: block;
    background-color: #ffffff;
    border-radius: 5px;
    border-style: solid;
    border-color: #E1E8ED;
    border-width: 1px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: background-color .15s ease-in-out, border-color .15s ease-in-out
  }

  @media only screen and (min-width: 770px) {
    .url-preview {
      width: 506px;
      border-radius: 0.42857em;
      overflow: hidden
    }
  }

  @media only screen and (min-width: 770px) {
    .url-preview:hover {
      background-color: #F5F8FA;
      border-color: rgba(136, 153, 166, 0.5)
    }
  }

  .url-preview__image {
    height: 150px;
    background-size: cover;
    background-color: #E1E8ED;
    background-repeat: no-repeat;
    background-position: center;
    border-style: solid;
    border-color: inherit;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    overflow: hidden
  }

  @media only screen and (min-width: 770px) {
    .url-preview__image {
      height: 252px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      overflow: hidden
    }
  }

  .url-preview__text {
    padding: 9px
  }

  @media only screen and (min-width: 770px) {
    .url-preview__text {
      padding: 0.75em 1em
    }
  }

  .url-preview__title {
    display: block;
    margin: 0 0 0.15em;
    font-size: 14px;
    line-height: 18.375px;
    letter-spacing: normal;
    overflow: hidden
  }

  @media only screen and (min-width: 770px) {
    .url-preview__title {
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 1em;
      font-weight: bold;
      line-height: 1.3em;
      max-height: 1.3em
    }
  }

  .url-preview__description {
    display: none;
    margin-top: 0.32333em;
    line-height: 1.3em;
    letter-spacing: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  @media only screen and (min-width: 770px) {
    .url-preview__description {
      display: block;
    }
  }

  .url-preview__link {
    display: block;
    color: #657786;
    text-transform: lowercase;
    line-height: 1.3125;
    letter-spacing: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  @media only screen and (min-width: 770px) {
    .url-preview__link {
      margin-top: 0.32333em;
      color: #8899A6
    }
  }
</style>
