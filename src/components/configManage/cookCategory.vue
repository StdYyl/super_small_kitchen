<template>
  <div id="app">
    <breadcrumb></breadcrumb>
    <div class="categoryTable" id="cookCategory">
      <el-button @click="categoryAdd(0)" style="float: right" type="primary">菜谱分类添加</el-button>
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
            <span
              @click="scope.row.inputStatus = scope.row.inputStatus !== true"
              :style="scope.row.inputStatus === true?'color:#35c1c2':'color:#409eff'">
              {{scope.row.inputStatus ? '确定':'修改'}}</span>
            <span @click="categoryChild(scope.row.cookCategoryId)">子分类</span>
            <span @click="categoryEdit(scope.row.cookCategoryId)">编辑</span>
            <span @click="categoryDel(scope.row.cookCategoryId)" style="color: #fe6a58">删除</span>
          </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getCookBookList} from '@/api/cookBook';
  import breadcrumb from '@/components/currency/breadcrumb';
  export default {
    name:"cookCategory",
    components:{breadcrumb},
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      categoryChild:function (id) {
        this.$router.push({
          path : 'cookCategory/child/' + id
        });
      },
      categoryEdit:function (id) {
        this.$router.push({
          path : 'cookCategory/edit/' + id
        });
      },
      categoryDel:function (id) {
        ;
      },
      categoryAdd:function (id) {
        this.$router.push({
          path : 'cookCategory/add/' + id
        });;
      }
    },
    mounted() {
      getCookBookList().then(val => {
        this.tableData = val;
        for (var i = 0; i < this.tableData.length; i++) {
          this.$set(this.tableData[i], 'inputStatus', false);
        }
      });
    }
  }
</script>
<style>
  /*以下样式不会影响全局*/
  #cookCategory .el-table__row:nth-of-type(1) .cell{
    height: 32px;
    line-height: 32px;
  }
  #cookCategory .el-input__inner{
    height: 32px;
  }

</style>

