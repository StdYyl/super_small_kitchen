<template>
  <div>
    <div class="header">
      <breadcrumb></breadcrumb>
      <el-tabs v-model="activeName">
        <el-tab-pane label="分销员列表" name="first"></el-tab-pane>
        <el-tab-pane label="分销员申请" name="second"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="brief_analysis">
      <span>累计分销订单总额：￥30000.00 累计佣金总额：￥3000.00</span>
    </div>
    <div class="main" v-if="activeName==='first'">
      <div class="main_hd">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="form_container">
            <div class="form_item">
              <span>所有分销员:</span>
              <el-select v-model="form.distributors" placeholder="请选择" style="width: 300px;" value="">
                <el-option label="正常" value="正常"></el-option>
                <el-option label="暂停" value="暂停"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form_container">
            <div class="form_item">
              <span>姓名或者电话:</span>
              <el-input v-model="form.nameOrTel" style="width: 280px;"
                        placeholder="请输入姓名或者电话"></el-input>
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
            <el-table-column prop="name" label="姓名" min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column prop="parMethod" label="打款方式" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column prop="totalOrderAmount" label="总订单金额" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column prop="commissionAmount" label="佣金金额" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column label="操作" min-width="2" :align="'center'">
              <template slot-scope="scope">
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">修改</a>
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">删除</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="main_more" v-if="auditedData.length!==0">
            <p>已加载全部</p>
          </div>
        </div>
      </div>
    </div>
    <div class="main" v-if="activeName==='second'">
      <div class="main_hd">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="form_container">
            <div class="form_item">
              <span>姓名或者电话:</span>
              <el-input v-model="form.nameOrTel" style="width: 280px;"
                        placeholder="请输入姓名或者电话"></el-input>
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
            <el-table-column prop="name" label="姓名" min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column prop="tel" label="联系电话" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column prop="parMethod" label="打款方式" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column prop="totalOrderAmount" label="总订单金额" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column prop="commissionAmount" label="佣金金额" min-width="2" :align="'center'">
            </el-table-column>
            <el-table-column label="操作" min-width="2" :align="'center'">
              <template slot-scope="scope">
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">修改</a>
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">删除</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="main_more" v-if="auditedData.length!==0">
            <p>已加载全部</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../currency/breadcrumb';
export default {
  name: 'salesperson',
  components: { Breadcrumb },
  data() {
    return {
      activeName: 'first',
      auditedData: [{
        name: '衬衣覅',
        tel: '19713965024',
        email: '1971395525@qq.com',
        parMethod: '支付宝',
        totalOrderAmount: '30.90',
        commissionAmount: '100.00',
        applyTime: '2017-02-08',
      }, {
        name: '衬衣覅',
        tel: '19713965024',
        email: '1971395525@qq.com',
        parMethod: '支付宝',
        totalOrderAmount: '30.90',
        commissionAmount: '100.00',
        applyTime: '2017-02-08',
      }, {
        name: '衬衣覅',
        tel: '19713965024',
        email: '1971395525@qq.com',
        parMethod: '支付宝',
        totalOrderAmount: '30.90',
        commissionAmount: '100.00',
        applyTime: '2017-02-08',
      }, {
        name: '衬衣覅',
        tel: '19713965024',
        email: '1971395525@qq.com',
        parMethod: '支付宝',
        totalOrderAmount: '30.90',
        commissionAmount: '100.00',
        applyTime: '2017-02-08',
      }],
      checkPendingData: [],
      rejectedData: [],
      form: {
        distributors: '',
        nameOrTel: '',
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
    margin: 34px 0 0 0 ;
    padding-left: 20px;
    padding-top: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-weight: 400;
  }
  .title{
    font: normal 500 20px/56px '微软雅黑';
  }
  .brief_analysis{
    font: normal 400 14px/50px '微软雅黑';
    color: rgb(153, 153, 153);
    padding-left: 20px;
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
