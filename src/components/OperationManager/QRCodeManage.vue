<template>
  <div>
    <div>
      <div class="header">
        <BreadCrumb></BreadCrumb>
      </div>
      <div class="main" v-if="activeName=='first'">
        <div class="main_list">
          <div class="table_container">
            <el-table
              :data="auditedData"
              style="width: 100%" :header-cell-style="{background:'#f5f5f8',color:'#909399'}">
              <el-table-column prop="name" label="菜谱名称" min-width="1" :align="'center'">
              </el-table-column>
              <el-table-column label="菜谱封面" min-width="1" :align="'center'" prop="cover">
                <template slot-scope="scope">
                  <div style="display: flex;justify-content: center;align-items: center">
                    <div :style="'width:100px;height:100px;background:url('+/img/+scope.row.cover+'/360) center center / cover no-repeat;'"></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="cookbookId" label="二维码" min-width="1" :align="'center'">
                <template slot-scope="scope">
                  <div style="display: flex;flex-direction: column;
                align-items: center;justify-content: center">
                    <div style="display: flex;justify-content: center;align-items: center">
                      <div :id="scope.row.cookbookId" :style="'width:100px;height:100px;'" :ref="scope.row.cookbookId"></div>
                    </div>
                    <span>{{scope.row.name}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="1" :align="'center'" prop="cookbookId">
                <template slot-scope="scope">
                  <a :href="'#'"
                     style="color:#409eff;" download="" @click.prevent="download(scope.row.cookbookId, $event)">下载</a>
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
import BreadCrumb from '../BreadCrumb';
import {selectCookBookList} from '../../api/cookBook'
import QRCode from 'qrcodejs2';
export default {
  name: 'QRCodeManage',
  data() {
    return {
      activeName: 'first',
      auditedData: [],
    };
  },
  methods: {
    handleClick(tab, event) {},
    download(cookbookId, event) {
      var a = document.createElement('a');
      var e = new MouseEvent('click');
      // 下载图名字
      a.download = cookbookId;
      //url 
      a.href = document.querySelector('#'+cookbookId+'>img').src;
      //合成函数，执行下载 
      a.dispatchEvent(e);
    },
  },
  mounted() {
    selectCookBookList({}).then((res) => {
      if(res.status === 200){
        if(res.data.code === 200){
          this.auditedData = res.data.body.list;
          this.auditedData.forEach((item) => {
            let qrCode = item.cookbookId;
            setTimeout(() => {
              new QRCode(this.$refs[''+qrCode+''], {
                text: item.cookbookId,
                width: 100,
                height: 100,
                colorDark: "#333333", //二维码颜色
                colorLight: "#ffffff", //二维码背景色
                correctLevel: QRCode.CorrectLevel.L,
              });
            },100);
          });
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
