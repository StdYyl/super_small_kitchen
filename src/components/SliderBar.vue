<template>
  <div class="sidebar_container">
    <div class="menu_wrapper">
      <dl>
        <dt class="first">
          <router-link to="/dashboard" tag="a">
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
          <router-link to="/dashboard/operationManger/qrcodeManage">二维码管理</router-link>
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
          <router-link to="/dashboard/configManage/cookCategory" tag="a">菜谱分类</router-link>
        </dd>
        <dd><router-link to="/dashboard/configManage/goodsCategory" tag="a">商品分类</router-link></dd>
        <dd><router-link to="/dashboard/configManage/directive" tag="a">指令管理</router-link></dd>
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
        <dd>
          <router-link to="/dashboard/financialSettlement/centralKitchenSettlement"
                       tag="a">中央厨房结算</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/financialSettlement/cashOutManage" tag="a">提现管理</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/financialSettlement/distributorManage"
                       tag="a">分销员管理</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/financialSettlement/distributionCommissionSetting"
                       tag="a">分销佣金设置</router-link>
        </dd>
      </dl>
    </div>
    <div class="menu_wrapper">
      <dl>
        <dt>
            <svg-icon icon-class="tree"></svg-icon>
            <span>系统管理</span>
        </dt>
        <dd>
          <router-link to="/dashboard/systemManager/postManagement">岗位管理</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/systemManager/adminManagement">管理员管理</router-link>
        </dd>
        <dd>
          <router-link to="/dashboard/systemManager/recommendManagement">推荐位管理</router-link>
        </dd>
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
    padding-left: 50px;
    margin-top: 20px;
    min-width: 150px;
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
