<template>
  <div id="goodsCategoryIndex">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'goodsCategoryIndex'
  };
</script>

<style lang="scss">
  /*以下样式将被所有菜谱相关页面继承*/
  #goodsCategoryIndex {
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

    /*控制表格小图片显示*/
    .cover {
      width: 32px;
      height: 32px;
      margin: 0 auto;
    }

    /*控制表格外框和白背景*/
    .categoryTable {
      padding: 23px 30px;
      margin-top: 30px;
      min-height: 800px;
      border: 1px solid #ddd;
      background: white;
    }
  }

</style>
