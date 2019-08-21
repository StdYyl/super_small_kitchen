<template>
  <div class="operation">
    <el-button type="primary" class="fr" style="margin-bottom: 20px" @click="addAdmin">用户新增</el-button>
    <el-table
      :data="adminList"
      style="width: 100%;" :header-cell-style="{background:'#f5f5f8'}">
      <el-table-column
        prop="name"
        label="管理员姓名"
        width="250" style="background: #f5f5f8">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="管理员手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role"
        label="管理员类型">
      </el-table-column>
      <el-table-column
        prop="position"
        label="管理员岗位">
      </el-table-column>
      <el-table-column
        prop="managerId"
        label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.managerId)" type="text">编辑</el-button>
          <el-button type="text" style="color: red" @click="deleteAdmins(scope.row.managerId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div  style="text-align: center">
      <el-button :style="isMore?'color: grey':''" type="text" @click="loadingMore">{{isMore?"加载更多":"已加载全部"}}</el-button>
    </div>

  </div>
</template>

<script>
  import { getAdminList, deleteAdmin } from '@/api/admin';

  export default {

    name: 'index',
    data() {
      return {
        adminList: [],
        lastId: 0,
        isMore: false
      };
    },
    methods: {
      //添加管理员信息
      addAdmin() {
        this.$emit('fun', 'adminAdd');
        this.$router.push('adminManagement/add');
      },
      //编辑（修改管理员信息）
      handleClick(id) {
        this.$emit('fun', 'editor');
        this.$router.push('adminManagement/editor/' + id);
      },
      //请求接口，获取管理员数据
      async loadingAdminList(rows=15){
        let rs = await getAdminList(this.lastId,rows);
        //登录超时 返回首页
        if(rs.data.code == 401){
          this.$router.push('/login')
          return ;
        }
        this.adminList.push(...rs.data.body.list);
        this.adminList.filter(item=>{
          if(item.role == 'master') item.role = "平台管理"
          if(item.role == 'vendor') item.role = "中央厨房管理"
          if(item.role == 'seller') item.role = "合作门店管理"
        })
        this.lastId = rs.data.body.page.last;
        this.isMore = rs.data.body.page.more;
      },
      //加载管理员列表
      loadingMore(){
        if(this.isMore) this.loadingAdminList()
      },
      //删除管理员
      deleteAdmins(e){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let id = { 'managerId':e }
          await deleteAdmin(id)
          let that = this;
          this.adminList.filter((item,index) =>{
            if(item.managerId == e){
              that.adminList.splice(index,1)
              //每次删除时，再次获取一个管理员用于展示
              this.loadingAdminList(1)
            }
          })
        }).catch(()=>{})

      }
    },
    async mounted() {
      this.loadingAdminList()
    }
  };
</script>

<style scoped>

  .el-table > th {
    background-color: #f5f5f8
  }
</style>
