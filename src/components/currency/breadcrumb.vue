<template>
  <div id="app">
    <div class="headerInner">
      <el-breadcrumb v-if="breadcrumbList !==undefined && breadcrumbList.length > 0" style="margin: 15px 0;" separator="/">
        <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :to="{ path: breadcrumb.path }" :key="breadcrumb.id">{{breadcrumb.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-top:15px;padding-bottom: 20px;font-size: 20px;text-align: left;">
        {{title}}
      </div>
    </div>
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
  .headerInner{
    border: 1px solid #ddd;
    margin: 35px 0 30px;
    padding-left: 20px;
    background: white;
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    font-weight: 400
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    color: #303133;
  }
</style>
