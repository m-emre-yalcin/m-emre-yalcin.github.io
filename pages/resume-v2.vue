<template>
  <div>
    <div class="cover-page">
      <img
        src="~/assets/images/mehmet-emre-yalcin.jpg?inline"
        alt="Mehmet Emre Yalçın"
      />
    </div>

    <nuxt-content :document="page" />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'clean',
  async asyncData({ $content }) {
    const page = await $content('portfolio-v2').fetch()
    return { page }
  },
  mounted() {
    document.querySelectorAll('img[alt*="logo"]').forEach((img) => {
      img.parentElement.style = `
            display: inline-flex;
            position: absolute;
            transform: translate(300px, -60px);
        `
      img.style.width = '80px'

      if (img.attributes.getNamedItem('alt').value === 'Lorinto logo') {
        img.parentElement.style.transform = 'translate(350px, -60px)'
      }
    })
  },
})
</script>

<style lang="scss">
html{
  font-size: 17px !important;
}
.cover-page {  
  display: none;
  // min-height: 297mm;
}
</style>
