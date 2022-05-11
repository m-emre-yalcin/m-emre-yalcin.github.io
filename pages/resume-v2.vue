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
    const page = await $content('portfolio-v2').fetch()
    return { page }
  },
  mounted() {
    document.querySelectorAll('img[alt*="logo"]').forEach((img) => {
      img.parentElement.style = `
            display: inline-flex;
            position: absolute;
            transform: translate(300px, -50px);
        `
      img.style.width = '80px'

      if (img.attributes.getNamedItem('alt').value === 'Lorinto logo') {
        img.parentElement.style.transform = 'translate(350px, -50px)'
      }
    })
  },
})
</script>

<style lang="scss">
html {
  font-size: 21px !important;
  blockquote {
    background-color: unset !important;
    font-style: italic;
  }
  p{
    margin: 8px 0;
  }

  .clean {
    header {
      padding-bottom: 0;
      border-bottom: unset;
      .col {
        line-height: 20px;
        a span {
          color: rgb(23, 23, 23);
          font-weight: 900;
          font-size: 12px;
          white-space: nowrap;
        }
      }
      .col.navs {
        grid-template-columns: repeat(4, auto);
      }
    }
  }
}
</style>
