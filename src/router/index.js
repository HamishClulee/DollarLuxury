import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Auctions from '@/views/Auctions'
import Account from '@/views/Account'
import Admin from '@/views/Admin'

Vue.use(Router)

console.log("store - index.js")

function guardRoute (route, redirect, next) {
  if (window.confirm(`Navigate to ${route.path}?`)) {
    next()
  } else if (window.confirm(`Redirect to /baz?`)) {
    redirect('/baz')
  }
}

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
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ],
  linkActiveClass: 'is-active',
  mode: 'history',
  beforeEach : ((route, redirect, next) => {
    if (route.matched.some(m => m.meta.needGuard)) {
      guardRoute(route, redirect, next)
    } else {
      next()
    }
  })
})
