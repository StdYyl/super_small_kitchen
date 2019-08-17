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
      <component :is="isWhich" @fun="getCon"></component>
    </div>
  </div>
</template>

<script>
  import adminAdd from './adminComponent/adminAdd';
  import editor from './adminComponent/editor';
  import index from './adminComponent/index';

  export default {
    name: 'adminManagement',
    components: {
      adminAdd,
      editor,
      index
    },
    data() {
      return {
        isWhich: 'index',
        breadcrumb: '管理员管理'
      };
    },
    methods: {
      getCon(rs) {
        this.isWhich = rs;
        if (rs == 'index') this.breadcrumb = '管理员管理';
        if (rs == 'adminAdd') this.breadcrumb = '管理员添加';
        if (rs == 'editor') this.breadcrumb = '管理员编辑';
      }
    },
    watch: {
      $route() {
        let path = this.$route.path;
        switch (path) {
          case '/dashboard/systemManager/adminManagement':
            this.isWhich = 'index';
            break;
          case "/dashboard/systemManager/adminManagement/add":
            this.isWhich = 'adminAdd';
            break;
          case "/dashboard/systemManager/adminManagement/add" :
            this.isWhich = 'editor'
        }
      }
    },
    // created() {
    //   console.log(console.log(this.$route.path);)
    // }
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
