import Vue from 'vue';
import Router from 'vue-router';
import registerNav from '@/components/register/registerNav';
import cookCategory from '@/components/cookbook/cookCategory';
import basicInformation from '@/components/register/infoRegistration';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'registerNav',
      component: () => import('@/view/register')
    },{
      path: '/cookCategory',
      name: 'cookCategory',
      meta: {title:'菜谱分类'},
      component: cookCategory,
      redirect: false,
      children:[
        {
          path: 'cookCategory2',
          name: 'cookCategory2',
          meta: {title:'菜谱分类2'},
          component: cookCategory,
        }
      ]
    }
  ],
});
