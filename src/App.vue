<template>
  <div class="app-page" @click="handleClick">
    app page23
  </div>
</template>
<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    const num = ref(0);
    const obj = reactive({title: 1});
    const handleClick = () => {
      console.log(111);
      console.log(process.env.NODE_ENV);
    }
    return {
      num,
      obj,
      handleClick
    }
  }
}
</script>
<style lang="less" scoped>
.app-page {
  color: green;
}
</style>
