import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../pages/Login/Login';
import DashBoard from './../pages/DasgBoard/DashBoard';
import MainPage from './../components/MainPage';
import CentralKitchenManage from '../components/CooperationManager/CentralKitchenManage';
import OperationStoreManage from '../components/CooperationManager/OperationStoreManage';
import OrderManage from '../components/OperationManager/OrderManage';
import MemberManage from '../components/OperationManager/MemberManage';
import CommodityStoreManage from '../components/OperationManager/CommodityStoreManage';
import MenuManage from '../components/OperationManager/MenuManage';
import StoreAdd from '../components/CooperationManager/AddStore';
import GoodsAdd from '../components/OperationManager/AddGoods';
import MenuAdd from '../components/OperationManager/AddMenu';
import QRCodeManage from '../components/OperationManager/QRCodeManage';
import RegisterNav from '../pages/Register/register';
import CookCategory from '../components/cookbook/cookCategory';
import CentralKitchenSettlement from '../components/FinancialSettlement/CentralKitchenSettlement';
import CashOutManage from '../components/FinancialSettlement/CashOutManage';
import DistributorManage from '../components/FinancialSettlement/DistributorManage';
import DistributionCommissionSetting from '../components/FinancialSettlement/DistributionCommissionSetting';
import BasicInformation from '../components/register/infoRegistration';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/register',
      component: RegisterNav,
    },
    {
      path: '/dashboard',
      component: DashBoard,
      children: [
        {
          path: 'main_page',
          component: MainPage,
        },
        {
          path: 'cooperationManger/centralKitchenManage',
          component: CentralKitchenManage,
        },
        {
          path: 'cooperationManger/centralKitchenManage/add',
          component: StoreAdd,
        },
        {
          path: 'cooperationManger/cooperationStoreManage',
          component: OperationStoreManage,
        },
        {
          path: 'operationManger/orderManage',
          component: OrderManage,
        },
        {
          path: 'operationManger/memberManage',
          component: MemberManage,
        },
        {
          path: 'operationManger/commodityStoreManage',
          component: CommodityStoreManage,
        },
        {
          path: 'operationManger/commodityStoreManage/add',
          component: GoodsAdd,
        },
        {
          path: 'operationManger/menuManage',
          component: MenuManage,
        },
        {
          path: 'operationManger/menuManage/add',
          component: MenuAdd,
        },
        {
          path: 'operationManger/qrcodeManage',
          name: 'qrcodeManage',
          meta: { title: '二维码管理' },
          component: QRCodeManage,
        },
        {
          path: 'cookbook/cookCategory',
          name: 'cookCategory',
          meta: { title: '菜谱分类' },
          component: CookCategory,
        },
        {
          path: 'financialSettlement/centralKitchenSettlement',
          name: 'centralKitchenSettlement',
          meta: { title: '中央厨房结算' },
          component: CentralKitchenSettlement,
        },
        {
          path: 'financialSettlement/cashOutManage',
          name: 'cashOutManage',
          meta: { title: '提现管理' },
          component: CashOutManage,
        },
        {
          path: 'financialSettlement/distributorManage',
          name: 'distributorManage',
          meta: { title: '分销员管理' },
          component: DistributorManage,
        },
        {
          path: 'financialSettlement/distributionCommissionSetting',
          name: 'distributionCommissionSetting',
          meta: { title: '分销员管理' },
          component: DistributionCommissionSetting,
        },
      ],
    },
  ],
});

