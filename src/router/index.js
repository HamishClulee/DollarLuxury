import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Auctions from '@/views/Auctions'
import Account from '@/views/Account'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auctions',
      name: 'Auctions',
      component: Auctions
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    }
  ],
  linkActiveClass: 'is-active',
  mode: 'history'
})
