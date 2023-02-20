<template>
  <div class="app-page">
    <router-view></router-view>
  </div>
</template>
<script setup lang='ts'>
import { testFn } from './utils';

testFn('');
</script>
<style lang="less" scoped>
  .app-page {
    font-size: 0.3rem;
    position: relative;
    width: 100%;
    height: auto;
  }
</style>
