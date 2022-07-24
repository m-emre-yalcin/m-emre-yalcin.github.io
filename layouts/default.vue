<template>
  <div
    class="base"
    @mousemove.stop.prevent="customCursor"
    @mousedown.stop.prevent="customCursorClick"
    @mouseup.stop.prevent="customCursorUp"
  >
    <div class="cursor" ref="cursor"></div>

    <transition name="fade">
      <preview v-if="$store.state.previewProps" />
    </transition>
    <nuxt />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.$store.commit('setScrollY')
    },
    customCursor(e) {
      this.$refs.cursor.style.top = e.clientY - 16 + 'px'
      this.$refs.cursor.style.left = e.clientX - 16 + 'px'
      this.$refs.cursor.classList.remove('cursor-link')

      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'SUMMARY' ||
        e.target.id === 'showcase'
      ) {
        this.$refs.cursor.classList.add('cursor-link')
      }
    },
    customCursorClick() {
      this.$refs.cursor.classList.add('big')
    },
    customCursorUp() {
      this.$refs.cursor.classList.remove('big')
    },
  },
})
</script>

<style lang="scss">
.base {
  // background: url(https://wallpaperaccess.com/full/295664.jpg?inline) no-repeat center center fixed;
  background: url(~/assets/images/foggy-forest.jpg?inline) no-repeat center
    center fixed;
  animation: bg 100s infinite;

  * {
    cursor: none;
  }
  .cursor {
    cursor: none;
    position: fixed;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: transform 0.2s ease;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(113, 113, 113, 0.389);
    font-weight: 100;
    font-size: 24px;
    z-index: 9999;
    pointer-events: none;
    transform: scale(1);
    &.move {
      transform: scale(1.25);
    }
    &.big {
      transform: scale(1.5);
    }
    &.cursor-link {
      transform: scale(1.5);
      background-color: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
  }

  @media screen and (max-width: 1000px) {
    animation: unset;
    background-attachment: fixed;
    background-size: cover;
  }

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
