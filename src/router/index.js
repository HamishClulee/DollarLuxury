import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Auctions from '@/views/Auctions'
import Account from '@/views/Account'
import Admin from '@/views/Admin'
import NotFound from '@/views/NotFound.vue'
import Auction from '@/components/content/Auction.vue'

Vue.use(Router)

console.log("store - index.js")

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
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
      path: '/auctions/:id',
      name: 'Auction',
      component: Auction
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ],
  linkActiveClass: 'is-active'
})
