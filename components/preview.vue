<template>
  <div class="preview-container" @click="close()">
    <h1>{{ previewProps.title }}</h1>

    <div>{{ previewProps.images }}</div>
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  margin: 0;
  overflow: hidden;
  img {
    min-width: 320px;
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