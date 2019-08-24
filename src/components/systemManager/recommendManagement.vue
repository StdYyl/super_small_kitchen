<template>
    <div class="room">
      <breadcrumbS></breadcrumbS>
      <div class="bd_mes">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import breadcrumbS from './breadcrumbS';
  export default {
    name: 'recommendManagement',
    components:{
      breadcrumbS,
    },
    data(){
      return{
        breadcrumb:''
      }
    },
  };
</script>

<style scoped>
  .room{
    max-width: 1280px;
  }
  .header {
    margin: 34px 0 20px 0;
    padding-left: 20px;
    padding-top: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-weight: 400;
  }
  .title {
    font: normal 500 20px/56px '微软雅黑';
  }
  .bd_mes {
    background-color: #fff;
    min-height: 800px;
    border: 1px solid #ddd;
    padding: 24px 20px;
  }
</style>
