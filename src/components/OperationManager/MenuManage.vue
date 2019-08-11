<template>
  <div>
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
          首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
          菜谱管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜谱管理</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">菜谱管理</p>
      <el-tabs v-model="activeName">
        <el-tab-pane label="已审核" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="third"></el-tab-pane>
        <el-tab-pane label="我的" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="main" v-if="activeName=='first'">
      <div class="main_hd">
        <router-link to="/dashboard/operationManger/menuManage/add">
          <el-button type="primary">菜谱新增</el-button>
        </router-link>
      </div>
      <div class="main_list">
        <el-table
          :data="auditedData"
          style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
          <el-table-column label="菜谱封面" width="100" :align="'center'">
            <template slot-scope="scope">
              <img :src="'./../../../static/images/role_member.png'" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="menuName" label="菜谱名称" min-width="150">
          </el-table-column>
          <el-table-column prop="menuDescription" label="菜谱描述" min-width="150">
          </el-table-column>
          <el-table-column prop="menuSource" label="菜谱来源" min-width="150" :align="'center'">
          </el-table-column>
          <el-table-column prop="checkState" label="审核状态" min-width="150" :align="'center'">
          </el-table-column>
          <el-table-column label="操作" width="250" :align="'center'">
            <template slot-scope="scope">
              <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">编辑</a>
              <span>|</span>
              <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#fe6a58;">删除</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main_more" v-if="auditedData.length!=0">
        <p>已加载全部</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuManage',
  data() {
    return {
      activeName: 'first',
      auditedData: [{
        menuName: '海绵宝宝',
        menuDescription: '海绵宝宝111',
        menuSource: '平台',
        checkState: '已通过',
      }, {
        menuName: '海绵宝宝',
        menuDescription: '海绵宝宝111',
        menuSource: '平台',
        checkState: '已通过',
      }, {
        menuName: '海绵宝宝',
        menuDescription: '海绵宝宝111',
        menuSource: '平台',
        checkState: '已通过',
      }, {
        menuName: '海绵宝宝',
        menuDescription: '海绵宝宝111',
        menuSource: '平台',
        checkState: '已通过',
      }],
      checkPendingData: [],
      rejectedData: [],
    };
  },
  methods: {
    handleClick(tab, event) {},
  },
};
</script>

<style scoped>
  .header{
    margin: 34px 0 20px 0 ;
    padding-left: 20px;
    padding-top: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-weight: 400;
  }
  .title{
    font: normal 500 20px/56px '微软雅黑';
  }
  div.is-top{
    font-size: 18px;
  }
  .main{
    padding: 10px 20px 250px 20px;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .main_hd{
    text-align: right;
    padding: 20px 0;
    min-width: 900px;
  }
  .main_list{
    width: 100%;
    min-width: 900px;
    display: flex;
    justify-content: center;
  }
  .el-table{
    flex: 1;
  }
  .el-table .bgc_cover{
    background-color: #f5f5f8;
  }
  .el-table>thead>tr>th{
    background-color: #f5f5f5;
  }
  .main_more{
    text-align: center;
  }
  .main_more>p{
    font: normal 400 16px/80px '微软雅黑';
    color: grey;
  }
</style>
