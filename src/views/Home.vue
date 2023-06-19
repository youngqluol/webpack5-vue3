<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import HelloWorld from '@src/components/HelloWorld.vue';
import useCounterStore from '@src/store';

const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>

<template>
  <div class="main-page">
    <p>Home page</p>
    <HelloWorld />
    <div class="img2" />
    <router-link to="/about">
      Go to ahout page
    </router-link>
    <el-button
      type="primary"
      @click="() => { increment() }"
    >
      点我+1 {{ count }}
    </el-button>
  </div>
</template>

<style lang="less" scoped>
    .main-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      .img2 {
        width: 3rem;
        height: 3rem;
        background-image: url('../assets/logo.png');
        background-size: 3rem 3rem;
      }
    }
</style>
