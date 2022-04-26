<template>
  <div class="base">
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.$store.commit('setScrollY')
    },
  },
})
</script>

<style lang="scss" scoped>
.base {
  // background: url(https://wallpaperaccess.com/full/295664.jpg) no-repeat center center fixed;
  background: url(~/assets/images/foggy-forest.jpg) no-repeat center center
    fixed;
  animation: bg 100s infinite;

  @keyframes bg {
    0% {
      background-size: 100% 100%;
    }
    50% {
      background-size: 120% 120%;
    }
    100% {
      background-size: 100% 100%;
    }
  }
}
.base {
  position: relative;
  min-height: 100vh;
  &::before {
    content: '';
    position: fixed;
    pointer-events: none;
    padding: 10px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // filter: blur(5px);
    opacity: 0.9;
    z-index: 0;
  }
}
</style>
