<template>
  <div class="bio-wrapper">
    <div class="bio">
      <Avatar class="avatar"/>
      <div class="bio-text">
        Thanks for reading! <br>
        I'm Mathieu TUDISCO, a lead developer at
        <ExternalLink href="https://link-value.fr">Linkvalue</ExternalLink>
        . <br>
        You can find me anywhere with <strong>@mathieutu</strong>. <br>
        As a start you can follow me on
        <ExternalLink href="https://www.twitter.com/mathieutu">Twitter</ExternalLink>
        or want to find out more about
        <router-link to="/">me</router-link>
        or the
        <router-link to="/blog/">blog</router-link>
        .
      </div>
    </div>
  </div>
</template>
<script>
import ExternalLink from '@theme/components/ExternalLink.vue';
import Avatar from '@theme/global-components/Avatar.vue';

export default {
  components: {
    Avatar, ExternalLink
  }
}
</script>
<style lang="stylus">
  .bio-wrapper {
    background-color: hsl(220, 12%, 97%);

    .bio {
      max-width: var(--content-width, 640px);
      margin: 0 auto;
      display: flex;
      padding: 2rem;

      .bio-text {
        font-size: .9rem;
        font-weight: 400;
        padding: 0.25rem 0;
      }

      .avatar {
        padding-right: 1rem;
      }

      a {
        &:hover {
          text-decoration underline
        }
      }
    }
  }
</style>
