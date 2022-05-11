<template>
  <div>
    <nuxt-content :document="page" />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  layout: 'clean',
  async asyncData({ $content }) {
    const page = await $content('portfolio').fetch()
    return { page }
  },
  mounted() {
    // remove unwanted elements from cv
    document.getElementById('start').style.display = 'none'
    document
      .querySelectorAll('.hide')
      .forEach((el) => (el.style.display = 'none'))

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
  },
})
</script>
