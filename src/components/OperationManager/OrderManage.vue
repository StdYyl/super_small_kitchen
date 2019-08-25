<template>
    <div>
      <div class="header">
        <BreadCrumb></BreadCrumb>
      </div>
      <div class="main">
        <div class="main_hd">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="form_container">
              <div class="form_item">
                <span>起止时间:</span>
                <el-date-picker
                  v-model="form.value"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" style="width: 370px;">
                </el-date-picker>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <span>中央厨房:</span>
                <el-select v-model="form.kitchen" placeholder="请选择" style="width: 300px;">
                  <el-option label="wer" value="wer"></el-option>
                  <el-option label="超小厨中央厨房" value="super"></el-option>
                  <el-option label="中原厨房" value="zhongyuan"></el-option>
                  <el-option label="拜特尔厨房" value="baiteer"></el-option>
                </el-select>
              </div>
              <div class="form_item">
                <span>合作门店:</span>
                <el-select v-model="form.store" placeholder="请选择" style="width: 300px;">
                  <el-option label="超小厨合作门店" value="super"></el-option>
                  <el-option label="拜特尔门店" value="baiteer"></el-option>
                </el-select>
              </div>
            </div>
            <div class="form_container">
              <div class="form_item">
                <span>订单编号:</span>
                <el-input v-model="form.orderId" style="width: 280px;"
                          placeholder="请输入订单号"></el-input>
              </div>
              <div class="form_item">
                <span>状态:</span>
                <el-select v-model="form.state" placeholder="请选择" style="width: 280px;">
                  <el-option label="待付款" value="待付款"></el-option>
                  <el-option label="代发货" value="代发货"></el-option>
                  <el-option label="已付款" value="已付款"></el-option>
                  <el-option label="已取消" value="已取消"></el-option>
                </el-select>
              </div>
              <div class="form_item">
                <el-button>重置</el-button>
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
             <el-table-column prop="orderId" label="订单号" min-width="1" :align="'center'">
             </el-table-column>
             <el-table-column prop="orderTime" label="下单时间" min-width="1" :align="'center'">
             </el-table-column>
             <el-table-column prop="receivePerson" label="收货人" min-width="1" :align="'center'">
             </el-table-column>
             <el-table-column prop="moneyNote" label="金额标签" min-width="1" :align="'center'">
             </el-table-column>
             <el-table-column prop="orderState" label="订单状态" min-width="1" :align="'center'">
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
import BreadCrumb from '../BreadCrumb';
import {getOrderList} from "../../api/order";

export default {
  name: 'OrderManage',
  data() {
    return {
      auditedData: [],
      form: {
        kitchen: '',
        store: '',
        value: '',
        orderId: '',
        state: '',
      },
    };
  },
  methods: {
    handleClick(tab, event) {},
    onSubmit() {
      console.log('submit!');
    },
  },
  async mounted() {
    let auditedData = await getOrderList();
    this.auditedData = auditedData.data.body.list;
  },
  components: {
    BreadCrumb,
  }
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
  .main{
    padding: 18px 30px;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .main_hd{
    text-align: right;
    padding: 10px 0;
    font-size: 14px;
    min-width: 900px;
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
    min-width: 900px;
  }
  .table_container{
    width: 95%;
    padding: 20px;
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
