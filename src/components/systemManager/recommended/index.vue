<template>
  <div>
    <el-button type="primary" class="fr" style="margin:0 20px 20px 0" @click="addPc">推荐位新增</el-button>
    <el-table :data="dataList" :header-cell-style="{ background:'#f5f5f8' }" :cell-style="{padding:'6px'}">
      <el-table-column label="推荐为名称" prop="name" width=""></el-table-column>
      <el-table-column label="类型" prop="type" align="center"></el-table-column>
      <el-table-column label="操作" align="center" prop>
        <template slot-scope="scope">
          <el-button type="text" @click="editorRecommend(scope.row.featureId)">编辑</el-button>
          <span>|</span>
          <el-button type="text" style="color: red" @click="deleteRecommend(scope.row.featureId)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getRecommend, removeRecommend } from '@/api/admin';

  export default {
    name: 'index',
    data() {
      return {
        dataList: []
      };
    },
    methods: {
      addPc() {
        this.$router.push('recommendManagement/add');
      },
      deleteRecommend(id) {
        let that = this;
        this.$confirm('此操作将永久删除该推荐位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let data = { 'featureId': id };
            removeRecommend(data);
            that.getdataList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      async getdataList() {
        let rs = await getRecommend();
        if (rs.data.code === 200) {
          this.dataList.splice(0, this.dataList.length+1, ...rs.data.body);
        }
      },
      editorRecommend(id) {
        this.$router.push(`recommendManagement/editor/${id}`);
      }
    },
    created() {
      this.getdataList();
    },
  };
</script>

<style scoped>
  .el-table th {
    padding: 2px;
  }
</style>
