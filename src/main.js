import Vue from 'vue';
// ajax请求
import Axios from 'axios';
// 地图插件
import AMap from 'vue-amap';
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
Vue.prototype.axios = Axios;
Vue.use(AMap);
Vue.use(cookie);

AMap.initAMapApiLoader({
  // 高德的key
  key: 'c23a73bb2c062de16b9158396b2817de&plugin=AMap.Geocoder',
  // 插件集合
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation',
    'AMap.CitySearch',
  ],
  v: '1.4.4',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
