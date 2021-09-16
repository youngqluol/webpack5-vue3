<template>
  <div class="vue2-page">
    vue2 page
    {{num}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 11111
    }
  }
}
</script>
<style lang="less" scoped>
.vue2-page {
  color: green;
}
</style>