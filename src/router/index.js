import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Advertising from '../components/advertising'
import About from '../components/about'
import myOrder from '../components/myOrder'
import adMsg from '../components/adMsg'
import error from '../components/error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/advertising',
      name: 'Advertising',
      // meta: {
      //   login: false
      // },
      component: Advertising
    },
    {
      path: '/advertising/:id',
      name: 'AdMsg',
      component: adMsg
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      component: error
    }
  ]
})
