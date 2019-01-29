import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Advertising from '../components/advertising'
import About from '../components/about'
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
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      component: error
    }
  ]
})
