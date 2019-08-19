<template>
  <div id="app">
    <el-breadcrumb v-if="breadcrumbList !==undefined && breadcrumbList.length > 0" separator="/">
      <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :to="{ path: breadcrumb.path }" :key="breadcrumb.id">{{breadcrumb.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <p style="font: normal 400 20px/56px '微软雅黑';">
      {{title}}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumb',
    data(){
      return{
        title:"",
        breadcrumbItemTemp:[],
        breadcrumbList:[]
      }
    },
    mounted() {
      let routerData = this.$route.matched;
      var breadcrumbItem = {};
      for (var i = 0; i < routerData.length; i++) {
        breadcrumbItem = {};
        breadcrumbItem.path = routerData[i].path;
        breadcrumbItem.title = routerData[i].meta.title;
        if (routerData[i].meta.title !== undefined) {
          this.breadcrumbList.push(breadcrumbItem);
          this.title = breadcrumbItem.title;
          this.breadcrumbItemTemp = breadcrumbItem;
        };
      };
      if (this.breadcrumbList.length < 3) {
        this.breadcrumbList.push(this.breadcrumbItemTemp);
      };
    }
  };
</script>

<style>
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    font-weight: 400
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    color: #303133;
  }
</style>
