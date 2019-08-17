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
import postManagement from '../components/systemManager/postManagement';
import adminManagement from '../components/systemManager/adminManagement'
import QRCodeManage from '../components/OperationManager/QRCodeManage';
import RegisterNav from '../pages/Register/register';
//配置管理
import Register from '../pages/Register/register';
import CookCategoryIndex from '../components/configManage/cookCategoryIndex';
import CookCategory from '../components/configManage/cookCategory';
import CookCategoryAdd from '../components/configManage/cookCategoryAdd';
import CookCategoryEdit from '../components/configManage/cookCategoryEdit';
import CookCategoryChild from '../components/configManage/cookCategoryChild';
import GoodsCategoryIndex from '../components/configManage/goodsCategoryIndex';
import GoodsCategory from '../components/configManage/goodsCategory';
import GoodsCategoryAdd from '../components/configManage/goodsCategoryAdd';
import GoodsCategoryEdit from '../components/configManage/goodsCategoryEdit';
import GoodsCategoryChild from '../components/configManage/goodsCategoryChild';
import Directive from '../components/configManage/Directive';
//配置管理/
import CentralKitchenSettlement from '../components/FinancialSettlement/CentralKitchenSettlement';
import CashOutManage from '../components/FinancialSettlement/CashOutManage';
import DistributorManage from '../components/FinancialSettlement/DistributorManage';
import DistributionCommissionSetting from '../components/FinancialSettlement/DistributionCommissionSetting';

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
      component: Register,
    },
    {
      path: '/dashboard',
      component: DashBoard,
      meta:{title:'首页'},
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
        //配置管理/菜谱分类
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
              name: 'cookCategoryAdd',
              meta: { title: '分类添加' },
              component: CookCategoryAdd,
            },
            {
              path: 'edit/:id',
              name: 'cookCategoryEdit',
              meta: { title: '分类编辑' },
              component: CookCategoryEdit,
            },
            {
              path: 'child/:id',
              name: 'cookCategoryChild',
              meta: { title: '子分类列表' },
              component: CookCategoryChild,
            },
          ],
        },
        //配置管理/商品分类
        {
          path: 'configManage/goodsCategory',
          meta: { title: '商品分类' },
          component: GoodsCategoryIndex,
          children:[
            {
              path: '',
              name: 'goodsCategory',
              meta: { title: '商品分类' },
              component: GoodsCategory,
            },
            {
              path: 'add/:id',
              name: 'goodsCategoryAdd',
              meta: { title: '分类添加' },
              component: GoodsCategoryAdd,
            },
            {
              path: 'edit/:id',
              name: 'goodsCategoryEdit',
              meta: { title: '分类编辑' },
              component: GoodsCategoryEdit,
            },
            {
              path: 'child/:id',
              name: 'goodsCategoryChild',
              meta: { title: '子分类列表' },
              component: GoodsCategoryChild,
            },
          ],
        },
        //配置管理/指令管理
        {
          path: 'configManage/directive',
          name: 'directive',
          meta: { title: '指令管理' },
          component: Directive,
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
        {
          path:'systemManager/postManagement',
          component: postManagement
        },
        {
          path:'systemManager/adminManagement',
          component: adminManagement,
          children:[
            {
              path:'add',
              redirect:false,
            },
            {
              path:'editor/:a',
              redirect:false,
            },
          ]
        }
      ],
    },
  ],
});

