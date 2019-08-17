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
        prop="position"
        label="管理员岗位" >
      </el-table-column>
      <el-table-column
        prop="managerId"
        label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.managerId)" type="text">编辑</el-button>
          <el-button type="text" style="color: red" @click="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getAdminList } from '@/api/admin';

  export default {

    name: 'index',
    data() {
      return {
        adminList: [
          { managerId:'M63POCO13KJM15KW', name: '1', mobile: '15733333331', role: 'seller', position: 'master', vendorId: '', sellerId: '' }
        ]
      };
    },
    methods:{
      addAdmin(){
        this.$emit('fun','adminAdd')
        this.$router.push('adminManagement/add')
      },
      handleClick(id){
        this.$emit('fun','editor')
        this.$router.push('adminManagement/editor/'+id)
      }
    },
    async mounted() {
      // let rs = await getAdminList();
      // console.log(rs)
    }
  };
</script>

<style scoped>

  .el-table>th {
    background-color: #f5f5f8
  }
</style>
