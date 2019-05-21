<template>
  <span>Hello {{ name }}</span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
