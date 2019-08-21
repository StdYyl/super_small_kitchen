<template>
  <div>
    <div class="header">
      <BreadCrumb></BreadCrumb>
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
        <div class="table_container">
          <el-table
            :data="auditedData"
            style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
            <el-table-column label="菜谱封面" width="100" :align="'center'" prop="cover">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;align-items: center">
                  <div :style="'width:60px;height:60px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="菜谱名称" min-width="1">
            </el-table-column>
            <el-table-column prop="description" label="菜谱描述" min-width="1">
            </el-table-column>
            <el-table-column prop="vendorInfo.name" label="菜谱来源" min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column prop="status" label="审核状态" min-width="1" :align="'center'">
              <template slot-scope="scope" v-if="scope.row.status === 1">
                已审核
              </template>
              <template slot-scope="scope" v-else>
                未审核
              </template>
            </el-table-column>
            <el-table-column prop="cookbookId" label="操作" width="250" :align="'center'">
              <template slot-scope="scope">
                <a :href="'http://localhost:8080/#/dashboard/operationManger/menuManage/edit/'+scope.row.cookbookId" style="color:#409eff;">编辑</a>
                <span>|</span>
                <a :href="'#'" style="color:#fe6a58;" @click.prevent="deleteMenu(scope.row.cookbookId)">删除</a>
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
        <router-link to="/dashboard/operationManger/menuManage/add">
          <el-button type="primary">菜谱新增</el-button>
        </router-link>
      </div>
      <div class="main_list">
        <div class="table_container">
          <el-table
            :data="pendingData"
            style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
            <el-table-column label="菜谱封面" width="100" :align="'center'" prop="cover">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;align-items: center">
                  <div :style="'width:60px;height:60px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="菜谱名称" min-width="1">
            </el-table-column>
            <el-table-column prop="description" label="菜谱描述" min-width="1">
            </el-table-column>
            <el-table-column prop="vendorInfo.name" label="菜谱来源" min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column prop="status" label="审核状态" min-width="1" :align="'center'">
              <template slot-scope="scope" v-if="scope.row.status === 1">
                已审核
              </template>
              <template slot-scope="scope" v-else>
                未审核
              </template>
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
      </div>
      <div class="main_more" v-if="auditedData.length!=0">
        <p>已加载全部</p>
      </div>
    </div>

    <div class="main" v-if="activeName=='third'">
      <div class="main_hd">
        <router-link to="/dashboard/operationManger/menuManage/add">
          <el-button type="primary">菜谱新增</el-button>
        </router-link>
      </div>
      <div class="main_list">
        <div class="table_container">
          <el-table
            :data="rejectedData"
            style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
            <el-table-column label="菜谱封面" width="100" :align="'center'" prop="cover">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;align-items: center">
                  <div :style="'width:60px;height:60px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="菜谱名称" min-width="1">
            </el-table-column>
            <el-table-column prop="description" label="菜谱描述" min-width="1">
            </el-table-column>
            <el-table-column prop="vendorInfo.name" label="菜谱来源" min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column prop="status" label="审核状态" min-width="1" :align="'center'">
              <template slot-scope="scope" v-if="scope.row.status === 1">
                已审核
              </template>
              <template slot-scope="scope" v-else>
                未审核
              </template>
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
      </div>
      <div class="main_more" v-if="auditedData.length!=0">
        <p>已加载全部</p>
      </div>
    </div>

    <div class="main" v-if="activeName=='fourth'">
      <div class="main_hd">
        <router-link to="/dashboard/operationManger/menuManage/add">
          <el-button type="primary">菜谱新增</el-button>
        </router-link>
      </div>
      <div class="main_list">
        <div class="table_container">
          <el-table
            :data="mineData"
            style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
            <el-table-column label="菜谱封面" width="100" :align="'center'" prop="cover">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center;align-items: center">
                  <div :style="'width:60px;height:60px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="菜谱名称" min-width="1">
            </el-table-column>
            <el-table-column prop="description" label="菜谱描述" min-width="1">
            </el-table-column>
            <el-table-column prop="vendorInfo.name" label="菜谱来源" min-width="1" :align="'center'">
            </el-table-column>
            <el-table-column prop="status" label="审核状态" min-width="1" :align="'center'">
              <template slot-scope="scope" v-if="scope.row.status === 1">
                已审核
              </template>
              <template slot-scope="scope" v-else>
                未审核
              </template>
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
  name: 'MenuManage',
  data() {
    return {
      activeName: 'first',
      auditedData: [],
      pendingData: [],
      rejectedData: [],
      mineData: [],
    };
  },
  methods: {
    handleClick(tab, event) {},
    deleteMenu(cookbookId) {
      this.axios.post('api/cgi/m/cookbook/remove',{
        "cookbookId": cookbookId
      }).then((res) => {
        if(res.status === 200){
          if(res.data.code === 200){
            let idx = this.auditedData.findIndex((item, index) => {
              return item.cookbookId === cookbookId;
            });
            this.auditedData.splice(idx, 1);
          }
        }
      });
    },
  },
  mounted() {
    this.axios.get('api/cgi/m/cookbook/select?auditStatus=approved').then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          this.auditedData = res.data.body.list;
        }
      }
    });
    this.axios.get('api/cgi/m/cookbook/select?auditStatus=auditing').then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          this.pendingData = res.data.body.list;
        }
      }
    });
    this.axios.get('api/cgi/m/cookbook/select?auditStatus=rejected').then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          this.rejectedData = res.data.body.list;
        }
      }
    });
    this.axios.get('api/cgi/m/cookbook/select').then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          this.mineData = res.data.body.list;
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
    padding: 20px 0;
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
