import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './lib/axios'
import {
  requestApi
} from './api'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Meta from 'vue-meta'
import Cookies from 'js-cookie'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import moment from 'moment'
moment.locale('zh-cn');
Vue.prototype.$http = http
// 时间格式化插件
Vue.prototype.$moment = moment
Vue.prototype.requestApi = requestApi
Vue.config.productionTip = false
Vue.use(Meta)
Vue.use(ViewUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
