<template>
    <div>
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
          首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
          中央厨房结算</el-breadcrumb-item>
        <el-breadcrumb-item>中央厨房结算</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">中央厨房结算</p>
    </div>
    <div class="main">
      <div class="main_hd">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="form_container">
            <div class="form_item">
              <span>中央厨房:</span>
              <el-input v-model="form.centralKitchenName" style="width: 280px;"
                        placeholder="请输入中央厨房名称"></el-input>
            </div>
            <div class="form_item">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <div class="main_list">
        <div class="table_container">
          <el-table
            style="width: 100%;"
            :data="auditedData"
            :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
            <el-table-column prop="centralKitchen" label="中央厨房" min-width="1">
            </el-table-column>
            <el-table-column prop="orderCount" label="本月订单数" min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column prop="exceptionOrderCount" label="异常订单数"
                             min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column prop="orderAmount" label="订单总额" min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column label="操作" min-width="1" :align="'center'">
              <template slot-scope="scope">
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">修改</a>
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">删除</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="main_more" v-if="auditedData.length!=0">
            <p>已加载全部</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CentralKitchenSettlement',
  data() {
    return {
      auditedData: [{
        centralKitchen: '21sdawddad22454fa',
        orderCount: '2017-02-08',
        exceptionOrderCount: 'yangyangyang',
        orderAmount: '30.90',
      }, {
        centralKitchen: '21sdawddad22454fa',
        orderCount: '2017-02-08',
        exceptionOrderCount: 'yangyangyang',
        orderAmount: '30.90',
      }, {
        centralKitchen: '21sdawddad22454fa',
        orderCount: '2017-02-08',
        exceptionOrderCount: 'yangyangyang',
        orderAmount: '30.90',
      }, {
        centralKitchen: '21sdawddad22454fa',
        orderCount: '2017-02-08',
        exceptionOrderCount: 'yangyangyang',
        orderAmount: '30.90',
      }],
      checkPendingData: [],
      rejectedData: [],
      form: {
        centralKitchenName: '',
      },
    };
  },
  methods: {
    handleClick(tab, event) {},
    onSubmit() {
      console.log('submit!');
    },
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
    padding: 18px 30px;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .main_hd{
    text-align: right;
    min-width: 900px;
    font-size: 14px;
  }

  .form_container{
    padding: 0 0 20px 0;
    display: flex;
    align-items: center;
  }
  .form_item{
    font:inherit;
    margin-right: 20px;
  }
  .form_item span{
    font:inherit;
    margin-right: 5px;
  }
  .main_list{
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .table_container{
    width: 100%;
    border: 1px solid #f5f5f8;
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
