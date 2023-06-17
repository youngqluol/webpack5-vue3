<script setup lang='ts'>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import HelloWorld from '@src/components/HelloWorld.vue';

const num = ref(0);
const obj = reactive({ title: 1 });
const store = useStore();
const vuexNum = computed(() => store.state.num);

function fn(): Promise<void> {
  console.log('before promise');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('promise');
      resolve();
    }, 2000);
  });
}

async function promiseClick() {
  await fn();
  console.log('after promise');
}

function addNum() {
  const obj1 = { a: Math.random() };
  const { a } = obj1;
  if (a > 0.5)
    return;
  store.commit('increment');
}
</script>

<template>
  <div class="main-page">
    <p>This is Home page</p>
    <HelloWorld />
    <div class="img2" />
    <router-link to="/about">
      Go to ahout
    </router-link>
    <el-button
      type="primary"
      @click="() => { addNum();promiseClick() }"
    >
      点我：{{ vuexNum }}
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
