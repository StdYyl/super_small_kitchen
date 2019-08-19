<template>
  <div>
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
          首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
          会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">会员管理</p>
    </div>
    <div class="main">
      <div class="main_hd">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="form_container">
            <div class="form_item">
              <span>昵称:</span>
              <el-input v-model="form.nickname" style="width: 280px;"
                        placeholder="请输入昵称"></el-input>
            </div>
            <div class="form_item">
              <span>注册时间:</span>
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
              <div class="form_item">
                <span>注册手机号:</span>
                <el-input v-model="form.registerTel" style="width: 280px;"
                          placeholder="请输入注册手机号"></el-input>
              </div>
            </div>
            <div class="form_item">
              <el-button>重置</el-button>
              <el-button type="primary" @click="selectInfo">查询</el-button>
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
            <el-table-column prop="nickname" label="用户名" min-width="1">
            </el-table-column>
            <el-table-column prop="created" label="注册时间" min-width="1">
            </el-table-column>
            <el-table-column prop="orderNum" label="下单数" min-width="1">
            </el-table-column>
            <el-table-column label="操作" min-width="1" :align="'center'">
              <template slot-scope="scope">
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">查看详情</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="main_more" v-if="auditedData.length!=0">
        <p>已加载全部</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberManage',
  data() {
    return {
      auditedData: [],
      form: {
        value: '',
        nickname: '',
        registerTel: '',
      },
    };
  },
  methods: {
    handleClick(tab, event) {},
    selectInfo() {
      console.log(this.form.value);
      console.log(this.form.nickname);
      console.log(this.form.registerTel);
      this.axios.get('api/cgi/m/user/select').then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            console.log(res.data.body.list);
            this.auditedData = res.data.body.list;
          }
        }
      });
    },
  },
  mounted() {
    this.axios.get('api/cgi/m/user/select').then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          console.log(res.data.body.list);
          var date = new Date(res.data.body.list.created);
          var createdTime = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
          this.auditedData = res.data.body.list;
        }
      }
    });
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
    padding: 10px 0;
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
    align-items: center;
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
