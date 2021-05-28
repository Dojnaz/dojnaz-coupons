import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'Tables',
      requiresAuth: true
    },
    path: '/tables',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Tables" */ '../views/Tables.vue')
  },
  {
    meta: {
      requiresAuth: true
    },
    path: '/coupons/:slug',
    name: 'couponPage',
    component: () => import(/* webpackChunkName: "CouponPage" */ '../views/CouponPage.vue')
  },
  {
    meta: {
      title: 'Forms',
      requiresAuth: true
    },
    path: '/forms',
    name: 'forms',
    component: () => import(/* webpackChunkName: "Forms" */ '../views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile',
      requiresAuth: true
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue')
  },
  {
    meta: {
      title: 'Auth'
    },
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue')
  },
  {
    meta: {
      title: 'Coupon Viewer'
    },
    path: '/view/:code',
    name: 'view',
    component: () => import(/* webpackChunkName: "CouponView" */ '../views/CouponView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    await store.dispatch('init')
    $store.commit('setLoading', false)

    if (store.state.userName) {
      return next();
    }
    return $router.push("/auth")
  }
  $store.commit('setLoading', false)
  return next()
})

export default router
