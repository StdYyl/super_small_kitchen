<template>
  <div class="room">
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/dashboard/systemManager/adminManagement' }">管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{breadcrumb}}</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">{{breadcrumb}}</p>
    </div>
    <div class="bd_mes">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'adminManagement',
    data(){
      return{
        breadcrumb:''
      }
    },
    watch: {
      $route() {
        let path = this.$route.path;
        switch (path) {
          case '/dashboard/systemManager/adminManagement':
            this.breadcrumb = '管理员管理';
            break;
          case "/dashboard/systemManager/adminManagement/add":
            this.breadcrumb = '管理员添加';
            break;
          default:
            this.breadcrumb = '管理员编辑';
        }
      }
    },
    created() {
      this.breadcrumb = this.$route.meta.name
    }
  };
</script>

<style scoped>
  .room {
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
