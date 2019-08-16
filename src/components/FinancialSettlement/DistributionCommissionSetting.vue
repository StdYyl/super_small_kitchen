<template>
  <div>
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard/main_page' }">
          首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dashboard/cooperationManger/centralKitchenManage' }">
          分销佣金设置</el-breadcrumb-item>
        <el-breadcrumb-item>分销佣金设置</el-breadcrumb-item>
      </el-breadcrumb>
      <p class="title">分销佣金设置</p>
      <p class="content">设置佣金结算比例和分销员每次最低提现金额</p>
    </div>
    <div class="main">
      <div class="commission_container">
        <div class="commission_item">
          <div class="context">
            <div class="title">佣金结算比例</div>
            <div class="content">分销员得到的佣金金额会显示在分销员的「我的分销中心」页面，
              佣金算法：订单的实际成交金额（运费除外）×佣金比例=分销员获得的佣金。
              您需自行负责商品发货和售后服务，分销员无需承担任何因退款或纠纷产生的损失。</div>
            <div class="business_volume">
              <span>订单实际成交金额：</span>
              <div>
                <el-input placeholder="请输入内容" v-model="business_volume_amount"
                style="width: 200px;height: 32px;">
                  <template slot="append">%</template>
                </el-input>
              </div>
              <span>（不包含运费）</span>
            </div>
          </div>
        </div>
        <div class="commission_item">
          <div class="context">
            <div class="title">佣金结算比例</div>
            <div class="content">在移动端分销员申请提现界面，如果申请提现金额小于最低提现金额时会有相应提示。</div>
            <div class="business_volume">
              <span>最低提现金额：</span>
              <div>
                <el-input placeholder="请输入内容" v-model="business_volume_amount"
                          style="width: 200px;height: 32px;">
                  <template slot="append">%</template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="commit">
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DistributionCommissionSetting',
  data() {
    return {
      activeName: 'first',
      business_volume_amount: '',
      checkPendingData: [],
      rejectedData: [],
      form: {
        payMethod: '',
        nameOrTel: '',
      },
    };
  },
  methods: {
    handleClick(tab, event) {},
    onSubmit() {
      console.log('submit!');
    },
  },
};
</script>

<style scoped lang="scss">
  .header{
    margin: 34px 0 20px 0 ;
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-weight: 400;
  }
  .title{
    font: normal 500 20px/56px '微软雅黑';
  }
  .content{
    font: normal 400 14px/20px '微软雅黑';
    color: #666;
  }
  div.is-top{
    font-size: 18px;
  }
  .main{
    padding: 23px 30px 300px;
    border: 1px solid #ddd;
    background-color: #fff;
    .commission_container{
      .commission_item{
        .context{
          margin-right: 300px;
          .title{
            font: normal 700 19px/20px '微软雅黑';
            margin: 20px 0;
          }
          .content{
            color: rgb(153, 153, 153);
            margin: 20px 0;
          }
          .business_volume{
            display: flex;
            align-items: center;
            margin: 10px 0;
            span{
              font: normal 400 14px/20px '微软雅黑';
            }
          }
        }
      }
    }
  }
</style>
