<template>
  <div id="directiveSetIndex">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'directiveSetIndex'
  };
</script>

<style lang="scss">
  /*以下样式将被所有指令集管理相关页面继承*/
  #directiveSetIndex {
    .header{
      margin: 34px 0 20px 0 ;
      padding-left: 20px;
      padding-top: 20px;
      border: 1px solid #ddd;
      background-color: #fff;
      font-weight: 400;
    }
    .el-table th, .el-table tr {
      background: none;
    }

    .templateSpan span {
      cursor: pointer;
    }

    .templateSpan span:after {
      content: " | ";
      color: #999999;
    }

    .templateSpan span:last-child:after {
      content: "";
    }

    /*控制表格外框和白背景*/
    .directiveSetTable {
      padding: 23px 30px;
      margin-top: 30px;
      min-height: 800px;
      border: 1px solid #ddd;
      background: white;
    }
  }

</style>
