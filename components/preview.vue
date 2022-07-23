<template>
  <div class="preview-container" @click="close()">
    <main class="content">
      <h1>{{ previewProps.title }}</h1>

      <div class="slider-container">
        <div ref="slider" class="images" vue-dragscroll @click.stop.prevent>
          <img
            v-for="img in previewProps.images"
            :key="img"
            :src="img"
            :alt="`screenshot of the ${previewProps.title} project`"
            class="child"
          />
        </div>

        <div class="navs">
          <div
            class="chevron left"
            @click.stop.prevent
            @mousedown="slide('left')"
          >
            <icn-chevron-left />
          </div>
          <div
            class="chevron right"
            @click.stop.prevent
            @mousedown="slide('right')"
          >
            <icn-chevron-right />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['previewProps']),
  methods: {
    close() {
      this.$store.commit('setPreview')
    },
    slide(direction) {
      const dom = this.$refs.slider
      const val = 1 * (direction === 'left' ? -1 : 1)

      if (dom) {
        const slideWidth = dom.clientWidth / 2

        dom.scrollTo({
          left: (dom.scrollLeft += val * slideWidth),
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.preview-container {
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.908000700280112) 0%,
    rgba(0, 0, 0, 0.8743872549019608) 86%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  margin: 0;
  overflow: hidden;

  main.content {
    display: flex;
    flex-direction: column;
    color: white;
    padding: 0 calc(10% + 400px);
    font-size: 1rem;
    position: relative;
  }

  .slider-container {
    display: flex;
    align-items: center;

    .images {
      width: 1200px;
      min-height: 500px;
      max-height: 70vh;
      display: flex;
      gap: 2rem;
      overflow-y: hidden;
      overflow-x: auto;
      padding: 2rem 4rem;
      scroll-padding-left: 0rem;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      white-space: nowrap;
      align-items: flex-start;

      img {
        scroll-snap-align: start;
        width: 100%;
        max-height: 70vh;
      }
    }
    .navs {
      margin-top: -100px;

      .chevron {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        border-radius: 8px;
        padding: 1rem;

        &:active {
          svg {
            transform: scale(1.25);
          }
        }

        &.left {
          left: 10%;
        }
        &.right {
          right: 10%;
        }

        svg {
          fill: white;
          width: 40px;
          height: 40px;
          transition: transform 0.25s ease;
        }
      }
    }
  }

  img {
    // min-width: 320px;
    max-width: auto;
    width: auto;
    @media screen and (max-width: 1000px) {
      width: inherit;
    }
    height: auto;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    pointer-events: none;
  }
}
</style>