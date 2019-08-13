<template>
  <div id="app">
    <el-table
      :header-cell-style="{background: '#f5f5f8'}"
      :data="tableData"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        property="img"
        label="分类封面"
        align="center"
        width="80">
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
            v-if="scope.row.status"
            v-model="scope.row.sort"
            type="text"
            :value="scope.row.sort">
          </el-input>
          <span v-else>{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="describe"
        min-width="300"
        label="分类描述">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.status"
            v-model="scope.row.describe"
            type="text"
            :value="scope.row.describe">
          </el-input>
          <span v-else>{{scope.row.describe}}</span>
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
              @click="scope.row.status = scope.row.status !== true"
              :style="scope.row.status === true?'color:#35c1c2':'color:#409eff'">
              {{scope.row.status === true ? '确定':'修改'}}
            </span>
            <span @click="">子分类</span>
            <span @click="">编辑</span>
            <span @click="" style="color: #fe6a58">删除</span>
          </span>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name:"test",
    data() {
      return {
        tableData: [{
          img: '2016-05-02',
          name: '月子餐',
          sort: '1',
          describe:"营养健康",
          operation:"修改|子分类|编辑|删除",
          status:false
        }, {
          img: '2016-05-02',
          name: '宝宝餐',
          sort: '2',
          describe:"帮助宝宝成长",
          status:false,
          operation:"修改|子分类|编辑|删除"
        }, {
          img: '2016-05-02',
          name: '老人餐',
          sort: '3',
          describe:"长寿养生",
          operation:"修改|子分类|编辑|删除"
        }, {
          img: '2016-05-02',
          name: '减肥餐',
          sort: '4',
          describe:"健康减肥",
          operation:"修改|子分类|编辑|删除"
        },{
          img: '2016-05-02',
          name: '水果餐',
          sort: '5',
          describe:"补充维生素",
          operation:"修改|子分类|编辑|删除"
        },{
          img: '2016-05-02',
          name: '加班餐',
          sort: '6',
          describe:"加班助力",
          operation:"修改|子分类|编辑|删除"
        }]
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>
<style>
  .el-table th, .el-table tr{
    background: none;
  }
  .templateSpan span{
    cursor:pointer;
  }
  .templateSpan span:after{
    content: " |";
    color: #999999;
  }
  .templateSpan span:last-child:after{
    content: "";
  }
</style>
