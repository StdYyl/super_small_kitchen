<template>
    <div>
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
          首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
          合作门店管理</el-breadcrumb-item>
        <el-breadcrumb-item>合作门店列表</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">合作门店列表</p>
      <el-tabs v-model="activeName">
        <el-tab-pane label="已审核" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="main" v-if="activeName=='first'">
      <div class="main_hd">
        <el-button type="primary">合作门店新增</el-button>
      </div>
      <div class="main_list">
        <el-table
          :data="auditedData" fit
          style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
          <el-table-column prop="storeName" label="合作门店名称" min-width="80">
          </el-table-column>
          <el-table-column label="合作门店封面" min-width="50" :align="'center'">
            <template slot-scope="scope">
              <img :src="'./../../../static/images/role_member.png'" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="storeDescription" label="合作门店描述" min-width="120">
          </el-table-column>
          <el-table-column prop="storeAddress" label="合作门店地址" min-width="120">
          </el-table-column>
          <el-table-column label="操作" min-width="50" :align="'center'">
            <template slot-scope="scope">
              <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">修改</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main_more" v-if="auditedData.length!=0">
        <p>已加载全部</p>
      </div>
    </div>

    <div class="main" v-if="activeName=='second'">
      <div class="main_hd">
        <el-button type="primary">合作门店新增</el-button>
      </div>
      <div class="main_list">
        <el-table
          :data="checkPendingData"
          style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
          <el-table-column prop="storeName" label="合作门店名称" min-width="80">
          </el-table-column>
          <el-table-column label="合作门店封面" min-width="50" :align="'center'">
            <template slot-scope="scope">
              <img :src="'./../../../static/images/role_member.png'" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="storeDescription" label="合作门店描述" min-width="120">
          </el-table-column>
          <el-table-column prop="storeAddress" label="合作门店地址" min-width="120">
          </el-table-column>
          <el-table-column label="操作" min-width="50" :align="'center'">
            <template slot-scope="scope">
              <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">修改</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main_more" v-if="checkPendingData.length!=0">
        <p>已加载全部</p>
      </div>
    </div>

    <div class="main" v-if="activeName=='third'">
      <div class="main_hd">
        <el-button type="primary">合作门店新增</el-button>
      </div>
      <div class="main_list">
        <el-table
          :data="rejectedData"
          style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
          <el-table-column prop="storeName" label="合作门店名称" min-width="80">
          </el-table-column>
          <el-table-column label="合作门店封面" min-width="50" :align="'center'">
            <template slot-scope="scope">
              <img :src="'./../../../static/images/role_member.png'" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="storeDescription" label="合作门店描述" min-width="120">
          </el-table-column>
          <el-table-column prop="storeAddress" label="合作门店地址" min-width="120">
          </el-table-column>
          <el-table-column label="操作" min-width="50" :align="'center'">
            <template slot-scope="scope">
              <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">修改</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="main_more" v-if="rejectedData.length!=0">
        <p>已加载全部</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationStoreManage',
  data() {
    return {
      activeName: 'first',
      auditedData: [{
        storeName: 'sadawdwa',
        storeDescription: '上海市普陀区金沙江路 1518 弄',
        storeAddress: '上海市普陀区金沙江路 1518 弄',
      }, {
        storeName: 'asdda',
        storeDescription: '上海市普陀区金沙江路 1518 弄',
        storeAddress: '上海市普陀区金沙江路 1518 弄'
      }, {
        storeName: 'asdasd',
        storeDescription: '上海市普陀区金沙江路 1518 弄',
        storeAddress: '上海市普陀区金沙江路 1518 弄',
      }, {
        storeName: 'asdasd',
        storeDescription: '上海市普陀区金沙江路 1518 弄',
        storeAddress: '上海市普陀区金沙江路 1518 弄',
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
    padding: 10px 0;
    min-width: 900px;
  }
  .main_list{
    width: 100%;
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
