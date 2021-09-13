<template>
  <div class="app-page"
       @click="handleClick">
    app page2
  </div>
  <!-- <img src="./assets/J.png" alt="">
  <img src="./assets/logo.png" alt=""> -->
  <div class="img1"></div>
  <div class="img2"></div>
  <demo-comp />
</template>
<script>
import { ref, reactive } from 'vue';
import DemoComp from './components/Demo-comp.vue';

export default {
  components: {
    DemoComp
  },
  setup() {
    const num = ref(0);
    const obj = reactive({ title: 1 });
    const handleClick = () => {
      console.log(111);
      console.log(process.env.NODE_ENV);
    };
    return {
      num,
      obj,
      handleClick
    };
  }
};
</script>
<style lang="less" scoped>
  .app-page {
    color: green;
  }
  .img1 {
    width: 100px;
    height: 100px;
    background-image: url('./assets/J.png');
    background-size: 100px 100px;
  }
  .img2 {
    width: 100px;
    height: 100px;
    background-image: url('./assets/logo.png');
    background-size: 100px 100px;
  }
</style>
