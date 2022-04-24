export const state = {
    scrollY: 0
}

export const mutations = {
    setScrollY(state, dom) {
        state.scrollY = window.scrollY
    }
}