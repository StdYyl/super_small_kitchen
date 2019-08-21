<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :to="{ path: item.path }" :key="index">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <p class="title">
      {{title}}
    </p>
  </div>
</template>

<script>
export default {
  name: "BreadCrumb",
  data() {
    return {
      title: '',
      breadcrumbList: [],
    };
  },
  methods: {
    isHome(route) {
      return route.name === 'dashboard';
    },
    getBreadCrumb() {
      console.log(this.$route);
      let matched = this.$route.matched;
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(matched);
        console.log(matched);
      }
      this.breadcrumbList = matched;
      this.title = this.$route.meta.title;
    },
  },
  watch: {
    $route() {
      this.getBreadCrumb();
    },
  },
  mounted() {
    this.getBreadCrumb();
  }
}
</script>

<style>
  .title{
    font: normal 500 20px/56px '微软雅黑';
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    font-weight: 400
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    color: #303133;
  }
</style>
