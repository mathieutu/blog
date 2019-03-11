<template>
  <div class="top">
    <router-link to="/" class="avatar">
      <img alt="Mathieu TUDISCO" src="https://s.gravatar.com/avatar/ec7f64a5549ebe9d760185fbba4477a3?s=80"/>
    </router-link>
    <h1 v-if="headerText">{{ headerText }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    headerText: {
      type: String,
      required: false,
      default: null
    },
  },
};
</script>
<style scoped>
  .top {
    display: flex;
  }

  img {
    height: 75px;
    width: auto;
    border-radius: 50%;
    border: solid 1px;
  }

  .avatar + h1 {
    margin-left: 1rem;
  }

</style>
