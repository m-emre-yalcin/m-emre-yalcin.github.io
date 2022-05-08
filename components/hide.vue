<!-- hide some parts on the cv page -->
<template>
  <p v-if="show">
    <slot name="placeholder" />
    <slot />
  </p>
  <p v-else-if="placeholder" v-html="placeholder" />
  <p v-else></p>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: this.$route.path === '/',
    }
  },
}
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
  display: inline;
}
</style>
