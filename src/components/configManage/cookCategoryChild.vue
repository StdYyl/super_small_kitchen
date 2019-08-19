<template>
<div>
  <div class="header">
    <breadcrumb></breadcrumb>
  </div>
  <div class="categoryTable">
    <el-button @click="add" style="float: right" type="primary">分类添加</el-button>
    <div style="clear: both;"></div>
    <el-table
      :header-cell-style="{background: '#f5f5f8'}"
      :data="tableData"
      highlight-current-row
      style="width: 100%;margin-top: 20px;">
      <el-table-column
        property="cover"
        label="分类封面"
        align="center"
        width="80">
        <template slot-scope="scope">
          <div class="cover" :style="{'background': 'url('+/img/+scope.row.cover+'/360'+') center center /cover no-repeat'}"></div>
        </template>
      </el-table-column>
      <el-table-column
        property="name"
        label="分类名称"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        property="sort"
        label="分类排序"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.inputStatus"
            v-model="scope.row.sort"
            type="text"
            :value="scope.row.sort">
          </el-input>
          <span v-else>{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="description"
        min-width="300"
        label="分类描述">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.inputStatus"
            v-model="scope.row.description"
            type="text"
            :value="scope.row.description">
          </el-input>
          <span v-else>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="operation"
        label="操作"
        width="200"
        align="center">
        <template slot-scope="scope">
          <span class="templateSpan" style="color:#409eff">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row.cookCategoryId)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row.cookCategoryId)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
  import {getCookBookList,delCookBookCategory} from '@/api/cookCategory';
  import breadcrumb from '@/components/currency/breadcrumb';
  export default {
    name: 'cookCategoryChild',
    components:{breadcrumb},
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      edit:function (id) {
        this.$router.push({
          path : '../edit/' + id
        });
      },
      del:function (id) {
        var form = {};
        form.cookCategoryId = id;
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCookBookCategory(form).then(value => {
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
      add:function () {
        this.$router.push({
          path : '../add/' + this.$route.params.id
        });;
      },
      init:function () {
        getCookBookList(this.$route.params.id).then(val => {
          this.tableData = val;
          for (var i = 0; i < this.tableData.length; i++) {
            this.$set(this.tableData[i], 'inputStatus', false);
          }
        });
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style>

</style>
