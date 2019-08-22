import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../pages/Login/Login';
import DashBoard from './../pages/DasgBoard/DashBoard';
import MainPage from './../components/MainPage';
import SecondLevelRV from '../components/SecondLevelRV';
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
import MenuEdit from '../components/OperationManager/EditMenu';
import postManagement from '../components/systemManager/postManagement';
import adminManagement from '../components/systemManager/adminManagement'
import QRCodeManage from '../components/OperationManager/QRCodeManage';

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
//配置管理//
//财务结算
import VendorAccount from '../components/accountManage/vendorAccount';
import BackMoney from '../components/accountManage/backMoney';
import Salesperson from '../components/accountManage/salesperson';
import Brokerage from '../components/accountManage/brokerage';
//财务结算//


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
      name: 'dashboard',
      meta:{title:'首页'},
      children: [
        {
          path: '',
          component: MainPage,
          name: 'main_page',
          meta:{title:'首页'},
        },
        {
          path: 'cooperationManger/centralKitchenManage',
          name: 'centralKitchenManage',
          meta: { title: '中央厨房管理' },
          component: SecondLevelRV,
          children: [
            {
              path: '',
              name: 'centralKitchenList',
              meta: { title: '中央厨房列表' },
              component: CentralKitchenManage,
            },
            {
              path: 'add',
              name: 'StoreAdd',
              meta: { title: '中央厨房添加' },
              component: StoreAdd,
            },
            {
              path: 'edit/:vendorId',
              name: 'StoreEdit',
              meta: { title: '中央厨房编辑' },
              component: StoreEdit,
            },
          ],
        },
        {
          path: 'cooperationManger/cooperationStoreManage',
          name: 'cooperationStoreManage',
          meta: { title: '合作门店管理' },
          component: SecondLevelRV,
          children: [
            {
              path: '',
              name: 'cooperationStoreList',
              meta: { title: '合作门店列表' },
              component: OperationStoreManage,
            },
            {
              path: 'add',
              name: 'StoreAdd',
              meta: { title: '合作门店添加' },
              component: StoreAdd,
            },
            {
              path: 'edit/:vendorId',
              name: 'StoreEdit',
              meta: { title: '合作门店编辑' },
              component: StoreEdit,
            },
          ],
        },
        {
          path: 'operationManger/orderManage',
          name: 'centralKitchenManage',
          meta: { title: '订单管理' },
          component: SecondLevelRV,
          children: [
            {
              path: '',
              name: 'centralKitchenManage',
              meta: { title: '订单管理' },
              component: OrderManage,
            }
          ]
        },
        {
          path: 'operationManger/memberManage',
          name: 'memberManage',
          meta: { title: '会员管理' },
          component: SecondLevelRV,
          children: [
            {
              path: '',
              name: 'memberManage',
              meta: { title: '会员管理' },
              component: MemberManage,
            }
          ]
        },
        {
          path: 'operationManger/commodityStoreManage',
          name: 'commodityStoreManage',
          meta: { title: '商品库管理' },
          component: SecondLevelRV,
          children: [
            {
              path: '',
              name: 'commodityStoreManage',
              meta: { title: '商品库管理' },
              component: CommodityStoreManage,
            },
            {
              path: 'add',
              name: 'CommodityStoreAdd',
              meta: { title: '商品库添加' },
              component: GoodsAdd,
            },
          ]
        },
        {
          path: 'operationManger/menuManage',
          name: 'menuManage',
          meta: { title: '菜谱管理' },
          component: SecondLevelRV,
          children: [
            {
              path: '',
              name: 'menuManage',
              meta: { title: '菜谱管理' },
              component: MenuManage,
            },
            {
              path: 'add',
              name: 'MenuAdd',
              meta: { title: '菜谱添加' },
              component: MenuAdd,
            },
            {
              path: 'edit/:cookbookId',
              name: 'MenuEdit',
              meta: { title: '菜谱编辑' },
              component: MenuEdit,
            },
          ]
        },
        {
          path: 'operationManger/qrcodeManage',
          name: 'qrcodeManage',
          meta: { title: '二维码管理' },
          component: SecondLevelRV,
          children: [
            {
              path: '',
              name: 'qrcodeManage',
              meta: { title: '二维码管理' },
              component: QRCodeManage,
            }
          ]
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
        //财务结算
        {
          path: 'accountManage/vendorAccount',
          name: 'vendorAccount',
          meta: { title: '中央厨房结算' },
          component: VendorAccount,
        },
        {
          path: 'accountManage/backMoney',
          name: 'backMoney',
          meta: { title: '提现管理' },
          component: BackMoney,
        },
        {
          path: 'accountManage/salesperson',
          name: 'salesperson',
          meta: { title: '分销员管理' },
          component: Salesperson,
        },
        {
          path: 'accountManage/brokerage',
          name: 'brokerage',
          meta: { title: '分销员佣金设置' },
          component: Brokerage,
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
              path:'',
              component: () => import('../components/systemManager/adminComponent/index'),
              meta:{name:'管理员管理'}
            },
            {
              path:'add',
              component:() => import('../components/systemManager/adminComponent/adminAdd'),
              meta:{name:'管理员添加'}
            },
            {
              path:'editor/:id',
              component:() => import('../components/systemManager/adminComponent/editor'),
              meta:{name:'管理员编辑'}
            },
          ]
        },
        {
          path:'systemManager/directiveSet',
          meta:{title:'指令集管理'},
          component: () => import('../components/systemManager/directiveSet/directiveSetIndex'),
          children:[
            {
              path:'',
              component: () => import('../components/systemManager/directiveSet/directiveSet'),
              meta:{title:'指令集管理'}
            },
            {
              path:'add',
              component:() => import('../components/systemManager/directiveSet/directiveSetAdd'),
              meta:{title:'指令集添加'}
            },
            {
              path:'edit/:id',
              component:() => import('../components/systemManager/directiveSet/directiveSetEdit'),
              meta:{title:'指令集编辑'}
            },
          ]
        },
        {
          path:'systemManager/notification',
          meta:{title:'通知管理'},
          component: () => import('../components/systemManager/notification/notificationIndex'),
          children:[
            {
              path:'',
              component: () => import('../components/systemManager/notification/notification'),
              meta:{title:'通知管理'}
            },
            {
              path:'add',
              component:() => import('../components/systemManager/notification/notificationAdd'),
              meta:{title:'通知新增'}
            },
            {
              path:'edit/:id',
              component:() => import('../components/systemManager/notification/notificationEdit'),
              meta:{title:'通知更新'}
            },
          ]
        }
      ],
    },
  ],
});

