import Vue from 'vue'
import App from './App.vue'
import './assets/site/css/style.css'
import VueRouter from 'vue-router'
// 模块化导入必须加上下面这句
Vue.use(VueRouter);

Vue.config.productionTip = false

import proList from './components/proList.vue'

let routes = [
  {path:'/',redirect:'/proList'},
  {path:'/proList',component:proList}
]

let router = new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
