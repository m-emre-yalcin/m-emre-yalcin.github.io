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
})
</script>

<style lang="scss">
html {
  font-size: 21px !important;
  blockquote {
    background-color: unset !important;
    font-style: italic;
  }
  blockquote + ul {
    list-style: disc;
    padding: 0;
    margin-left: 1rem;
    font-size: 18px;
    li {
      margin-block: 8px;
    }
    ul {
      list-style: circle;
      margin-left: 1rem;
    }
  }
  p {
    margin: 8px 0;
  }
  h3#lorinto-logo---social-network-project a,
  h3#mavi-logo---open-source-project a {
    display: flex;
    align-items: center;
    img {
      width: 70px;
      margin-right: 10px;
    }
  }

  .clean {
    header {
      padding-bottom: 2px;
      border-bottom: 4px solid;
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
