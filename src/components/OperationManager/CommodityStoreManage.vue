<template>
  <div>
    <div class="header">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="main">
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
            <el-table-column label="商品封面" min-width="12" :align="'center'" prop="cover">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;align-items: center">
                  <div :style="'width:60px;height:60px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" min-width="25">
            </el-table-column>
            <el-table-column prop="description" label="商品介绍" min-width="30">
            </el-table-column>
            <el-table-column label="操作" min-width="30" :align="'center'" prop="waresId">
              <template slot-scope="scope">
                <a :href="'http://localhost:8080/#/dashboard/operationManger/commodityStoreManage/edit/'+scope.row.waresId" style="color:#409eff;">编辑</a>
                <span>|</span>
                <a :href="'#'" style="color:#fe6a58;" @click.prevent="deleteWares(scope.row.waresId)">删除</a>
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
      auditedData: [],
    };
  },
  methods: {
    handleClick(tab, event) {},
    deleteWares(waresId) {
      console.log(waresId);
      this.axios.post('api/cgi/m1/wares/remove',{
        "waresId": waresId
      }).then((res) => {
        console.log(res);
        if(res.data.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }
      }).catch((err) => {
        console.log(err);
        this.$message.error('删除失败');
      });
      let idx = this.auditedData.findIndex((item) => {
        return item.waresId === waresId;
      });
      this.auditedData.splice(idx, 1);
    },
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
