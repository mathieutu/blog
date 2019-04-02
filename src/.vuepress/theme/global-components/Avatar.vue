<template>
  <div class="avatar">
    <router-link to="/" class="link">
      <image-offline alt="Mathieu TUDISCO" src="https://s.gravatar.com/avatar/ec7f64a5549ebe9d760185fbba4477a3?s=80"/>
    </router-link>
    <h1 v-if="header">{{ header }}</h1>
  </div>
</template>

<script>
import ImageOffline from './ImageOffline';

export default {
  components: { ImageOffline },
  props: {
    header: {
      type: String,
      required: false,
      default: null
    },
  },
};
</script>
<style lang="stylus">
  .avatar {
    display: flex;

    img {
      height: 75px;
      width: auto;
      border-radius: 50%;
      border: solid 1px;
    }

    h1 {
      margin-left: 1rem;
    }
  }


</style>
