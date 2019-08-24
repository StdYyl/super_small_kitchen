<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path }">{{headcrumb}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{breadcrumb}}</el-breadcrumb-item>
    </el-breadcrumb>
    <p class="title">{{breadcrumb}}</p>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumbS',
    data(){
      return{
        headcrumb:'',
        breadcrumb:'',
        path:''
      }
    },
    watch: {
      $route() {
        this.breadcrumb =this.$route.meta['title']
      }
    },
    created() {
      this.breadcrumb = this.$route.meta['title']
      this.headcrumb = this.$route.matched[1].meta.title
      this.path = this.$route.matched[1].path
    }
  };
</script>

<style scoped>
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
</style>
