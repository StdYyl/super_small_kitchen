<template>
  <div class="login_header">
    <div class="l_h_center">
      <img src="./../../static/images/logo.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginHeader',
};
</script>

<style scoped>
  .login_header{
    min-width: 1200px;
    height: 70px;
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 2px #ccc;
  }
  .l_h_center{
    width: 1200px;
    margin: 0 auto;
  }
</style>
