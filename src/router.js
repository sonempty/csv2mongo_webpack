import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import DashBoard from './views/DashBoard.vue'

Vue.use(Router)

async function requireAuth (to, from, next) {
  let currentUser = await store.dispatch('checkCurrentUser')
  if (currentUser) {
    next()
  } else {
    next('/')
  }
}

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    beforeEnter: requireAuth
  }]
})
