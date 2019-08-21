<template>
  <div>
    <div class="header">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="main" v-if="activeName=='first'">
      <div class="main_hd">
        <router-link to="/dashboard/operationManger/commodityStoreManage/add">
          <el-button type="primary">商品新增</el-button>
        </router-link>
      </div>
      <div class="main_list">
        <div class="table_container">
          <el-table
            :data="auditedData"
            style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
            <el-table-column label="商品封面" min-width="12" :align="'center'">
              <template slot-scope="scope">
                <img :src="'./../../../static/images/role_member.png'" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名称" min-width="25">
            </el-table-column>
            <el-table-column prop="goodsDescription" label="商品介绍" min-width="30">
            </el-table-column>
            <el-table-column label="操作" min-width="30" :align="'center'">
              <template slot-scope="scope">
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#409eff;">编辑</a>
                <span>|</span>
                <a :href="'http://localhost:8080/#/dashboard/main_page'" style="color:#fe6a58;">删除</a>
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
import BreadCrumb from '../BreadCrumb';
export default {
  name: 'CommodityStoreManage',
  data() {
    return {
      activeName: 'first',
      auditedData: [],
    };
  },
  methods: {
    handleClick(tab, event) {},
  },
  mounted() {
    this.axios.get('api/cgi/m1/wares/select').then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          console.log(res.data.body.list);
          this.auditedData = res.data.body.list;
        }
      }
    });
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
