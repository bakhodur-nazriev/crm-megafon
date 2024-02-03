<template>
  <button
      class="btn"
      :size="size"
      :color="color"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "16px"
    },
    color: {
      type: String,
      default: "primary"
    }
  }
}
</script>

<style scoped>

</style>