import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import './assets/site/css/style.css'
import VueRouter from 'vue-router'
// 模块化导入必须加上下面这句
Vue.use(VueRouter);
// 将axios添加到Vue的原型中,时Vue实例化的对象(组件)都能调用
Vue.prototype.$axios = axios;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false

import proList from './components/proList.vue'
import proDetail from './components/proDetail.vue'
import shopCar from './components/shopCar.vue'

let routes = [
  {path:'/',redirect:'/proList'},
  {path:'/proList',component:proList},
  {path:'/proDetail/:artId',component:proDetail},
  {path:'/shopCar',component:shopCar}
]

let router = new VueRouter({
  routes
})

import moment from 'moment';
// 定义全局过滤器
Vue.filter('showTime', function (value) {
  return moment(value).format("YYYY-MM-DD");
})
Vue.filter('showTimePlus', function (value) {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
