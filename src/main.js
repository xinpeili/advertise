// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueParticles from 'vue-particles'
import animated from 'animate.css'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { setCookie, getCookie, delCookie } from '@/assets/js/cookie.js';

Vue.use(ElementUI);
Vue.use(animated)
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueParticles,
  components: { App },
  template: '<App/>'
})
