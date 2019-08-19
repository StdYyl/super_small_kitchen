<template>
  <div>
    <div>
      <div class="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
            首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
            二维码管理</el-breadcrumb-item>
          <el-breadcrumb-item>二维码管理</el-breadcrumb-item>
        </el-breadcrumb>
        <p class="title">二维码管理</p>
      </div>
      <div class="main" v-if="activeName=='first'">
        <div class="main_list">
          <div class="table_container">
            <el-table
              :data="auditedData"
              style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
              <el-table-column prop="menuName" label="菜谱名称" min-width="1" :align="'center'">
              </el-table-column>
              <el-table-column label="菜谱封面" min-width="1" :align="'center'">
                <template slot-scope="scope">
                  <img :src="'./../../../static/images/role_member.png'" alt="">
                </template>
              </el-table-column>
              <el-table-column prop="qrCode" label="二维码" min-width="1" :align="'center'">
                <template slot-scope="scope">
                  <div style="display: flex;flex-direction: column;
                align-items: center;justify-content: center">
                    <img :src="'./../../../static/images/role_member.png'" alt="">
                    <span>{{scope.row.qrCode.name}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="1" :align="'center'">
                <template slot-scope="scope">
                  <a :href="'./../../../static/images/role_member.png'"
                     style="color:#409eff;" download="">下载</a>
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
  </div>
</template>

<script>
export default {
  name: 'QRCodeManage',
  data() {
    return {
      activeName: 'first',
      auditedData: [{
        menuName: '海绵宝宝',
        qrCode: {
          name: '海绵宝宝',
        },
      }, {
        menuName: '海绵宝宝',
        qrCode: {
          name: '海绵宝宝',
        },
      }, {
        menuName: '海绵宝宝',
        qrCode: {
          name: '海绵宝宝',
        },
      }, {
        menuName: '海绵宝宝',
        qrCode: {
          name: '海绵宝宝',
        },
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
  .main{
    padding: 20px 30px 250px 30px;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .main_list{
    width: 100%;
    min-width: 900px;
    display: flex;
    overflow: hidden;
    justify-content: center;
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
