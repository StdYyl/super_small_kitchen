<template>
  <div class="sidebar_container">
    <div class="menu_wrapper">
      <dl>
        <dt class="first">
          <router-link to="/dashboard/main_page" tag="a">
            <svg-icon icon-class="home"></svg-icon>
            <span>首页</span>
          </router-link>
        </dt>
      </dl>
    </div>
    <div class="menu_wrapper">
      <dl>
        <dt>
          <svg-icon icon-class="shoppingCard"></svg-icon>
          <span>合作管理</span>
        </dt>
        <dd>
          <router-link to="/dashboard/cooperationManger/centralKitchenManage">中央厨房管理</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/cooperationManger/cooperationStoreManage">合作门店管理</router-link>
        </dd>
      </dl>
    </div>
    <div class="menu_wrapper">
      <dl>
        <dt>
          <svg-icon icon-class="set"></svg-icon>
          <span>运营管理</span>
        </dt>
        <dd>
          <router-link to="/dashboard/operationManger/orderManage">订单管理</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/operationManger/memberManage">会员管理</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/operationManger/commodityStoreManage">商品库管理</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/operationManger/menuManage">菜谱管理</router-link>
        </dd>
        <dd>
          <router-link to="">二维码管理</router-link>
        </dd>
      </dl>
    </div>
    <div class="menu_wrapper">
      <dl>
        <dt>
          <svg-icon icon-class="nested"></svg-icon>
          <span>配置管理</span>
        </dt>
        <dd>
          <router-link to="/dashboard/cookbook/cookCategory" tag="a">菜谱分类</router-link>
        </dd>
        <dd>商品分类</dd>
        <dd>指令管理</dd>
      </dl>
    </div>
    <div class="menu_wrapper">
      <dl>
        <dt>
          <router-link to="" tag="a">
            <svg-icon icon-class="order"></svg-icon>
            <span>财务结算</span>
          </router-link>
        </dt>
        <dd>中央厨房结算</dd>
        <dd>提现管理</dd>
        <dd>分销员管理</dd>
        <dd>分销佣金设置</dd>
      </dl>
    </div>
    <div class="menu_wrapper">
      <dl>
        <dt>
          <router-link to="" tag="a">
            <svg-icon icon-class="tree"></svg-icon>
            <span>系统管理</span>
          </router-link>
        </dt>
        <dd>岗位管理</dd>
        <dd>管理员管理</dd>
        <dd>推荐位管理</dd>
        <dd>通知管理</dd>
        <dd>指令集管理</dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderBar',
  data() {
    return {};
  },
};
</script>

<style scoped>
  .sidebar_container{
    flex: 2;
    margin-top: 20px;
    padding-left: 50px;
  }
  .menu_wrapper{
    margin: 20px 0;
  }
  .menu_wrapper dt,dd{
    font: normal 400 16px/40px '微软雅黑';
  }
  .menu_wrapper span{
    font-size: 14px;
  }
  dt>span{
    vertical-align: top;
  }
  dt.first{
    line-height: 20px;
  }
  dd{
    padding-inline-start: 24px;
    font: normal 400 14px/40px '微软雅黑';
  }
</style>
