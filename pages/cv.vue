<template>
 <div>
  <div class="cover-page">
   <img src="~/assets/images/mehmet-emre-yalcin.jpg?inline" alt="Mehmet Emre Yalçın" />
  </div>

  <nuxt-content :document="page" />
 </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
 layout: 'clean',
 async asyncData({ $content }) {
  const page = await $content('/portfolio').fetch()
  return { page }
 },
})
</script>

<style lang="scss" scoped>
.cover-page {
 min-height: 297mm;
}
</style>
