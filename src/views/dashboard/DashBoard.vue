<template>
  <div>
    <van-tabbar 
    v-model="active"
    >
      <van-tabbar-item icon="home-o" to='home'>首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to='category'>分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to='cart'>购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="profile" info="2">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Notify } from 'vant';
  export default {
    data() {
      return {
        active: Number(sessionStorage.getItem('tabbarActiveIndex')) || 0
      }
    },
    watch:{
      active(value){
        console.log(value)
        let tabbarActiveIndex = value
        sessionStorage.setItem('tabbarActiveIndex',value)
      }
    },
    methods:{
     
    }
  }
</script>

<style lang="scss" scoped>

</style>