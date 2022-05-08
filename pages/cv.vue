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
    const page = await $content('/portfolio').fetch()
    return { page }
  },
  mounted() {
    setTimeout(() => {
      document.querySelectorAll('summary').forEach((summary) => {
        const parent = summary.parentElement
        const div = document.createElement('div')
        div.classList.add('details')
        div.innerHTML = parent.innerHTML

        parent.after(div)
        parent.remove()
      })

      document.querySelectorAll('img[alt*="logo"]').forEach((img) => {
        const src = img.attributes.getNamedItem('src').value
        const newSrc = src.replace('.svg', '-black.svg')
        img.setAttribute('src', newSrc)

        img.parentElement.style = `
            display: inline-flex;
            position: absolute;
            transform: translate(300px, -54px);
        `
        img.style.width = '80px'

        if (img.attributes.getNamedItem('alt').value === 'Lorinto logo') {
          img.parentElement.style.transform = 'translate(350px, -52px)'
        }
      })
    }, 500)
  },
})
</script>

<style lang="scss">
.cover-page {
  display: none;
  // min-height: 297mm;
}
</style>
