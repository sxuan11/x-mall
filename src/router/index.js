import Vue from 'vue'
import VueRouter from 'vue-router'

import Router from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

// import DashBoard from './../views/dashboard/DashBoard.vue'
// const Home = ()=> import('./../views/home/Home.vue');
// const Category = ()=> import('./../views/category/Category.vue');
// const Cart = ()=> import('./../views/cart/Cart.vue');
// const Profile = ()=> import('./../views/profile/Profile.vue');

// const Order = ()=> import('./../views/order/Order.vue');

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
    component: () => import(/* webpackChunkName: "cart" */ './../views/cart/Cart.vue'),
    children:[
     
    ],
  },
  {
    path: '/category',
    name: 'category',
    meta:{
      keepAlive:true,
    },
    component: () => import(/* webpackChunkName: "category" */ './../views/category/Category.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import(/* webpackChunkName: "order" */ './../views/order/Order.vue'),
    children:[
      {
        path: 'addresslist',
        name: 'addresslist',
        component: () => import(/* webpackChunkName: "addresslist" */ './../views/order/components/AddressList.vue')
      }
    ]
  },
  {
    path: '/addresslist',
    name: 'addresslist',
    component: () => import(/* webpackChunkName: "addresslist" */ './../views/order/components/AddressList.vue'),
    children:[
      
    ]
  },
  {
    path: '/addressadd',
    name: 'addressadd',
    component: () => import(/* webpackChunkName: "addresslist" */ './../views/order/components/AddressAdd.vue')
  },
  {
    path: '/addressedit',
    name: 'addressedit',
    component: () => import(/* webpackChunkName: "addressedit" */ './../views/order/components/AddressEdit.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './../views/login/Login.vue'),
    children :[
      // {
      //   path: 'inputcode',
      //   name: 'inputcode',
      //   component: () => import(/* webpackChunkName: "login" */ './../views/login/InputCode.vue')
      // },
    ]
  },
  {
    path: '/inputcode',
    name: 'inputcode',
    component: () => import(/* webpackChunkName: "login" */ './../views/login/InputCode.vue')
  },
  

  // {path: '/', redirect: '/dashboard'},
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   component: DashBoard,
  //   children: [
  //       {path: '/dashboard', redirect: '/dashboard/home'},
  //       {path: 'home', name:'home', component: Home, meta: { keepAlive: true}},
  //       {path: 'category', name:'category', component: Category, meta: { keepAlive: true}},
  //       {path: 'cart', name:'cart', component: Cart},
  //       {
  //           path: 'profile',
  //           name:'profile',
  //           component: Profile,
  //           // children: [
  //           //     {path: 'userCenter', component: UserCenter}, // 用户中心
  //           //     {path: 'mineOrder', component: MineOrder} // 我的订单
  //           // ]
  //       }
  //   ]
  // },
  // {
  //   path: '/confirmOrder',
  //   name: 'order',
  //   component: Order,
  //   // children: [
  //   //     {
  //   //         path:'myAddress',
  //   //         name: 'myAddress',
  //   //         component: MyAddress,
  //   //         children: [
  //   //             // 添加地址
  //   //             {path: 'addAddress', name:'addAddress', component: AddAddress},
  //   //             {path: 'editAddress', name:'editAddress', component: EditAddress},
  //   //         ]
  //   //     },
  //   //     {
  //   //         path: 'orderDetail',
  //   //         name: 'orderDetail',
  //   //         component: OrderDetail
  //   //     }
  //   // ]
// },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
