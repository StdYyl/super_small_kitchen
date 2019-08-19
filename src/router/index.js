import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../pages/Login/Login';
import DashBoard from './../pages/DasgBoard/DashBoard';
import MainPage from './../components/MainPage';
import CentralKitchenManage from '../components/CooperationManager/CentralKitchenManage';
import OperationStoreManage from '../components/CooperationManager/OperationStoreManage';
import StoreAdd from '../components/CooperationManager/AddStore';
import StoreEdit from '../components/CooperationManager/EditStore';
import OrderManage from '../components/OperationManager/OrderManage';
import MemberManage from '../components/OperationManager/MemberManage';
import CommodityStoreManage from '../components/OperationManager/CommodityStoreManage';
import MenuManage from '../components/OperationManager/MenuManage';
import GoodsAdd from '../components/OperationManager/AddGoods';
import MenuAdd from '../components/OperationManager/AddMenu';
import QRCodeManage from '../components/OperationManager/QRCodeManage';
import RegisterNav from '../pages/Register/register';
import CookCategoryIndex from '../components/configManage/cookCategoryIndex';
import CookCategory from '../components/configManage/cookCategory';
import CategoryAdd from '../components/configManage/categoryAdd';
import CategoryEdit from '../components/configManage/categoryEdit';
import CategoryChild from '../components/configManage/categoryChild';
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
      meta:{title:'首页'},
      children: [
        {
          path: '',
          component: MainPage,
        },
        {
          path: 'cooperationManger/centralKitchenManage',
          name: 'centralKitchenManage',
          meta: { title: '中央厨房管理' },
          component: CentralKitchenManage,
        },
        {
          path: 'cooperationManger/centralKitchenManage/add',
          name: 'StoreAdd',
          meta: { title: '中央厨房添加' },
          component: StoreAdd,
        },
        {
          path: 'cooperationManger/centralKitchenManage/edit/:vendorId',
          name: 'StoreEdit',
          meta: { title: '中央厨房编辑' },
          component: StoreEdit,
        },
        {
          path: 'cooperationManger/cooperationStoreManage',
          name: 'cooperationStoreManage',
          meta: { title: '合作门店管理' },
          component: OperationStoreManage,
        },
        {
          path: 'operationManger/orderManage',
          name: 'centralKitchenManage',
          meta: { title: '订单管理' },
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
          path: 'configManage/cookCategory',
          meta: { title: '菜谱分类' },
          component: CookCategoryIndex,
          children:[
            {
              path: '',
              name: 'cookCategory',
              meta: { title: '菜谱分类' },
              component: CookCategory,
            },
            {
              path: 'add/:id',
              name: 'categoryAdd',
              meta: { title: '分类添加' },
              component: CategoryAdd,
            },
            {
              path: 'edit/:id',
              name: 'categoryEdit',
              meta: { title: '分类编辑' },
              component: CategoryEdit,
            },
            {
              path: 'child/:id',
              name: 'categoryAdChild',
              meta: { title: '子分类列表' },
              component: CategoryChild,
            },
          ],
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

