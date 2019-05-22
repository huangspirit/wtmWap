// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import Promise from 'promise-polyfill'
import axios from 'axios'
import qs from 'qs'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
FastClick.attach(document.body)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://cdn.weitaomi.cn/wap/index/error1545119705994.png',
  loading: '',
  attempt: 1
})
if (!window.Promise) {
  window.Promise = Promise
}
Vue.config.productionTip = false
function goPAGE () {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    // window.location.href="移动端url";
    return 'mobile'
  } else {
    // window.location.href="pc端url";
    return 'pc'
  }
}
Vue.prototype.$dev = goPAGE()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
