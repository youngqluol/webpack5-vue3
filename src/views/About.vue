<template>
  <div class="about-page">
    <p>This is about page.</p>
    <img src="../assets/J.png"
         alt="img">
  </div>
</template>
<script>
export default {
  name: 'about',
  setup() {}
};
</script>
<style lang="less" scoped>
  .about-page {
    width: 5.4rem;
    height: 7.4rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 5rem;
      height: 5rem;
      display: inline-block;
      margin: 0 auto;
      margin-top: .5rem;
    }
  }
</style>
