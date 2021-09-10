<template>
  <div class="app-page">
    app page
  </div>
</template>
<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    const num = ref(0);
    const obj = reactive({title: 1});
    return {
      num,
      obj
    }
  }
}
</script>
<style lang="less" scoped>
.app-page {
  color: red;
}
</style>
