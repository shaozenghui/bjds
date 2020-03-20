import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './router'
Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASEURL,
  routes
})

export default router
