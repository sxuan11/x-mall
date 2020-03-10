import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    meta:{
      keepAlive:true,
    },
    component: () => import(/* webpackChunkName: "home" */ './../views/home/Home.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ './../views/profile/Profile.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ './../views/cart/Cart.vue')
  },
  {
    path: '/category',
    name: 'category',
    meta:{
      keepAlive:true,
    },
    component: () => import(/* webpackChunkName: "category" */ './../views/category/Category.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
