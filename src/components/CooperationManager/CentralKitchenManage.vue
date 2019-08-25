<template>
    <div>
      <div class="header">
        <BreadCrumb></BreadCrumb>
        <el-tabs v-model="activeName">
          <el-tab-pane label="已审核" name="first"></el-tab-pane>
          <el-tab-pane label="待审核" name="second"></el-tab-pane>
          <el-tab-pane label="已拒绝" name="third"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="main" v-if="activeName=='first'">
        <div class="main_hd">
          <router-link to="/dashboard/cooperationManger/centralKitchenManage/add">
            <el-button type="primary">商户新增</el-button>
          </router-link>
        </div>
        <div class="main_list">
          <div class="table_container">
            <el-table
              :data="auditedData" style="width: 100%;"
              :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
              <el-table-column prop="name" label="商家名称" min-width="80">
              </el-table-column>
              <el-table-column label="商家封面" min-width="50" :align="'center'" prop="cover">
                <template slot-scope="scope">
                  <div style="display: flex;justify-content: center;align-items: center">
                    <div :style="'width:60px;height:60px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="introduction" label="商家描述" min-width="120">
              </el-table-column>
              <el-table-column prop="address" label="商家地址" min-width="120">
              </el-table-column>
              <el-table-column label="操作" width="100" :align="'center'" prop="vendorId">
                <template slot-scope="scope">
                  <a :href="'http://localhost:8080/#/dashboard/cooperationManger/centralKitchenManage/edit/'+scope.row.vendorId" style="color:#409eff;">编辑</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="main_more" v-if="auditedData.length!=0">
          <p>已加载全部</p>
        </div>
      </div>

      <div class="main" v-if="activeName=='second'">
        <div class="main_hd">
          <el-button type="primary">商户新增</el-button>
        </div>
        <div class="main_list">
          <div class="table_container">
            <el-table
              :data="checkPendingData"
              style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
              <el-table-column prop="name" label="商家名称" min-width="80">
              </el-table-column>
              <el-table-column label="商家封面" min-width="50" :align="'center'" prop="cover">
                <template slot-scope="scope">
                  <div style="display: flex;justify-content: center;align-items: center">
                    <div :style="'width:60px;height:60px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="introduction" label="商家描述" min-width="120">
              </el-table-column>
              <el-table-column prop="address" label="商家地址" min-width="120">
              </el-table-column>
              <el-table-column label="操作" width="100" :align="'center'" prop="vendorId">
                <template slot-scope="scope">
                  <a :href="'http://localhost:8080/#/dashboard/cooperationManger/centralKitchenManage/edit/'+scope.row.vendorId" style="color:#409eff;">编辑</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="main_more" v-if="checkPendingData.length!=0">
          <p>已加载全部</p>
        </div>
      </div>

      <div class="main" v-if="activeName=='third'">
        <div class="main_hd">
          <el-button type="primary">商户新增</el-button>
        </div>
        <div class="main_list">
          <div class="table_container">
            <el-table
              :data="rejectedData"
              style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
              <el-table-column prop="name" label="商家名称" min-width="80">
              </el-table-column>
              <el-table-column label="商家封面" min-width="50" :align="'center'" prop="cover">
                <template slot-scope="scope">
                  <div style="display: flex;justify-content: center;align-items: center">
                    <div :style="'width:60px;height:60px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="introduction" label="商家描述" min-width="120">
              </el-table-column>
              <el-table-column prop="address" label="商家地址" min-width="120">
              </el-table-column>
              <el-table-column label="操作" width="100" :align="'center'" prop="vendorId">
                <template slot-scope="scope">
                  <a :href="'http://localhost:8080/#/dashboard/cooperationManger/centralKitchenManage/edit/'+scope.row.vendorId" style="color:#409eff;">编辑</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="main_more" v-if="rejectedData.length!=0">
          <p>已加载全部</p>
        </div>
      </div>
    </div>
</template>

<script>
import BreadCrumb from '../BreadCrumb';
import {getVendorList} from '../../api/vendor';
export default {
  name: 'CentralKitchenManage',
  data() {
    return {
      activeName: 'first',
      auditedData: [],
      checkPendingData: [],
      rejectedData: [],
    };
  },
  methods: {
    handleClick(tab, event) {},
  },
  async mounted() {
    let auditedData = await getVendorList('approved');
    this.auditedData = auditedData.data.body.list;

    let checkPendingData = await getVendorList('auditing');
    this.checkPendingData = checkPendingData.data.body.list;

    let rejectedData = await getVendorList('rejected');
    this.rejectedData = rejectedData.data.body.list;
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
