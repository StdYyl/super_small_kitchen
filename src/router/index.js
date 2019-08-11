import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../pages/Login/Login';
import Register from './../pages/Register/Register';
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
      ],
    },
  ],
});
