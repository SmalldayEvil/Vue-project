import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "./assets/site/css/style.css";
import VueRouter from "vue-router";
// 模块化导入必须加上下面这句
Vue.use(VueRouter);
// 设置axios基地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
// 设置让axios能够携带cookie发起请求
axios.defaults.withCredentials = true;
// 将axios添加到Vue的原型中,时Vue实例化的对象(组件)都能调用
Vue.prototype.$axios = axios;
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);

Vue.config.productionTip = false;

import proList from "./components/proList.vue";
import proDetail from "./components/proDetail.vue";
import shopCar from "./components/shopCar.vue";
import order from "./components/order.vue";
import login from "./components/login.vue";
import payMoney from "./components/payMoney.vue";
import paySuccess from "./components/paySuccess.vue";
import VIP from "./components/VIP.vue";
import orderList from "./components/orderList.vue";
import orderDetail from "./components/orderDetail.vue";
import userInfo from "./components/userInfo.vue";


let routes = [
  { path: "/", redirect: "/proList" },
  { path: "/proList", component: proList },
  { path: "/proDetail/:artId", component: proDetail },
  { path: "/shopCar", component: shopCar },
  { path: "/order/:ids", component: order, meta: { cheakLogin: true } },
  { path: "/login", component: login },
  {
    path: "/payMoney/:orderid",
    component: payMoney,
    meta: { cheakLogin: true }
  },
  { path: "/paySuccess", component: paySuccess, meta: { cheakLogin: true } },
  {
    path: "/VIP",
    component: VIP,
    meta: { cheakLogin: true },
    children: [
      {
        path:'',
        component: userInfo,
        meta: { cheakLogin: true }
      },
      {
        path: "orderList",
        component: orderList,
        meta: { cheakLogin: true }
      },
      {
        path: "orderDetail/:orderid",
        component: orderDetail,
        meta: { cheakLogin: true }
      }
    ]
  }
];

let router = new VueRouter({
  mode:'history',
  routes
});

// 注册导航守卫
router.beforeEach((to, from, next) => {
  // if (to.path.indexOf("/order") != -1) {
  if (to.meta.cheakLogin) {
    axios.get("site/account/islogin").then(data => {
      if (data.data.code == "nologin") {
        Vue.prototype.$message({
          message: "请先登录!",
          type: "warning"
        });
        router.push("/login");
        return;
      }
      next();
    });
  } else {
    next();
  }
});

import moment from "moment";
// 定义全局过滤器
Vue.filter("showTime", function(value) {
  return moment(value).format("YYYY-MM-DD");
});
Vue.filter("showTimePlus", function(value) {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
});

// 放大镜组件
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

// Vuex的使用
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    shopCarData: JSON.parse(localStorage.getItem("shopCar")) || {},
    isLogin: false
  },
  mutations: {
    add2shopCar(state, obj) {
      if (state.shopCarData[obj.proId] == undefined) {
        Vue.set(state.shopCarData, obj.proId, obj.proNum);
      } else {
        state.shopCarData[obj.proId] += obj.proNum;
      }
      // console.log(state.shopCarData);
    },
    updateData(state, obj) {
      state.shopCarData = obj;
      // console.log(obj);
    },
    loginChange(state, status) {
      state.isLogin = status;
    },
    delData(state, id) {
      Vue.delete(state.shopCarData, id);
    }
  },
  getters: {
    shopSum: state => {
      let num = 0;
      for (let key in state.shopCarData) {
        num += state.shopCarData[key];
      }
      return num;
    }
  }
});
window.onbeforeunload = () => {
  localStorage.setItem("shopCar", JSON.stringify(store.state.shopCarData));
};

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
