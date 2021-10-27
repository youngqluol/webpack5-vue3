<template>
  <div class="app-page">
    <router-view></router-view>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    // console.log('route', useRoute());
    // const router = useRouter();
    // router.push({ name: 'home' });
  }
};
</script>
<style lang="less" scoped>
  .app-page {
    font-size: 0.3rem;
    position: relative;
    width: 100%;
    height: auto;
  }
</style>
