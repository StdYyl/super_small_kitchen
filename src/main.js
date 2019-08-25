import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
// svg组件
import './icons/index';
// 状态管理
import store from './store/index';
//cookie,检测登录过期
import cookie from 'vue-cookie'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(cookie);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
