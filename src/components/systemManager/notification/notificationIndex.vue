<template>
  <div id="notificationIndex">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'notificationIndex'
  };
</script>

<style lang="scss">
  /*以下样式将被所有通知管理相关页面继承*/
  #notificationIndex {
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
    .notificationTable {
      padding: 23px 30px;
      margin: 30px 0;
      min-height: 800px;
      border: 1px solid #ddd;
      background: white;
    }
  }

</style>
