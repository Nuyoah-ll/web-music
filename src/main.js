import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import VueLazyLoad from "vue-lazyload";

import api from "./network/api";
Vue.prototype.$api = api;
Vue.prototype.$bus = new Vue();
Vue.filter("getTargetSize", function (url, size) {
  return `${url}?param=${size}y${size}`;
})


Vue.config.productionTip = false;

// 使用图片懒加载插件
Vue.use(VueLazyLoad,{
  // 传入loading指定正在加载时的占位图
  // loading:require("./assets/img/img-placeholder.png")
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
