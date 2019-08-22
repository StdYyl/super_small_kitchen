<template>
  <div id="notification">
    <div class="header">
      <breadcrumb></breadcrumb>
    </div>
    <div class="notificationTable">
      <el-input v-model="getMoreForm.search" placeholder="请输入通知名称" style="float: left;width: 300px;line-height: 40px"></el-input>
      <el-button @click="" style="float: left;margin-left: 20px;" type="primary">查询</el-button>
      <el-button @click="notificationAdd()" style="float: right" type="primary">通知添加</el-button>
      <div style="clear: both;"></div>
      <el-table
        :header-cell-style="{background: '#f5f5f8'}"
        :data="tableData"
        highlight-current-row
        style="width: 100%;margin-top: 20px;">
        <el-table-column
          property="title"
          label="通知标题"
          align="left">
        </el-table-column>
        <el-table-column
          property="description"
          label="通知描述"
          align="left">
        </el-table-column>
        <el-table-column
          property="time"
          :formatter="timeFormat"
          label="发送时间"
          align="center">
        </el-table-column>
        <el-table-column
          property="operation"
          label="操作"
          align="center">
          <template slot-scope="scope">
          <span class="templateSpan" style="color:#409eff">
            <span @click="notificationEdit(scope.row.notificationId)">编辑</span>
            <span @click="notificationDel(scope.row.notificationId)" style="color: #fe6a58">删除</span>
          </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="main_more" v-if="tableData.length!==0">
        <a v-if="getMoreForm.more" @click="getMore" style="color: #1890ff" href="javascript:0;">加载更多</a>
        <a v-else href="javascript:0;">已加载全部</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {getNotificationList,delNotification} from '@/api/notification';
  import {formatDate} from '@/basical/methods';
  import breadcrumb from '@/components/currency/breadcrumb';
  export default {
    name:"notification",
    components:{breadcrumb},
    data() {
      return {
        getMoreForm:{
          search:'',
          last: '',
          more: false,
          rows: 10
        },
        tableData: []
      }
    },
    methods: {
      timeFormat:function(row, column){
        var time = row[column.property];
        if (time === undefined) {
          return "";
        }
        return formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss');
      },
      notificationEdit:function (id) {
        this.$router.push({
          path : 'notification/edit/' + id
        });
      },
      notificationDel:function (id) {
        var form = {};
        form.notificationId = id;
        this.$confirm('此操作将永久删除该指令集, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delNotification(form).then(value => {
            if (value.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.init();
            }else {
              this.$message({
                type: 'error',
                message: value.desc
              });
            }
          });
        })
      },
      notificationAdd:function () {
        this.$router.push({
          path : 'notification/add'
        })
      },
      getMore:function () {
        getNotificationList(this.getMoreForm).then(val => {
          this.tableData = this.tableData.concat(val.list);
          this.getMoreForm.last = val.page.last;
          this.getMoreForm.more = val.page.more;
        });
      },
      init:function () {
        this.getMoreForm.last = 0;
        this.getMoreForm.rows = 10;
        getNotificationList(this.getMoreForm).then(val => {
          this.tableData = val.list;
          this.getMoreForm.last = val.page.last;
          this.getMoreForm.more = val.page.more;
        });
      }
    },
    mounted() {
      this.init();
    }
  }
</script>
<style scoped lang="scss">
  .main_more{
    text-align: center;
    font: normal 400 15px/80px '微软雅黑';
    color: grey;
  }
</style>

