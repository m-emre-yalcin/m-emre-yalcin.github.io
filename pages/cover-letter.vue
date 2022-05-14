<template>
  <div>
    <nuxt-content :document="page" />
  </div>
</template>

<script>
export default {
  layout: 'clean',
  async asyncData({ $content }) {
    const page = await $content('/cover-letter').fetch()

    return { page }
  },
  head: {
    title: 'M. Emre Yalcin - Cover Letter',
  },
  mounted() {
    document.querySelector('header').remove()
  },
}
</script>

<style lang="scss">
html {
  font-size: 21px !important;
  background-color: white !important;
}
</style>
