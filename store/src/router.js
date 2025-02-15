import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta:{
      requiresLogin:false
    }
  },
  {
    path: '/checkout',
    name: 'CheckoutPage',
    meta:{
      requiresLogin:true
    },
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/store'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.meta.requiresLogin && !isLoggedIn) {
    // next({ name: 'Login' })
    window.location.href = '/login?redirect-to=/store'
    // next()
  }

  // if (to.name === 'Login' && isLoggedIn) {
  //   next({ name: 'Home' })
  // } else if (to.name !== 'Login' && !isLoggedIn) {
  //   next({ name: 'Login' })
  // } else {
  //   next()
  // }
  next()
})

export default router
