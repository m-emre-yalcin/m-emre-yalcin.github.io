export const state = {
  scrollY: 0,
  previewProps: null
}

export const mutations = {
  setScrollY(state, dom) {
    state.scrollY = window.scrollY
  },
  setPreview(state, payload) {
    state.previewProps = payload
  }
}
