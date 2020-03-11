<template>
  <div>
    <van-tabbar 
    v-model="active"
    >
      <van-tabbar-item icon="home-o" to='home'>首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to='category'>分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to='cart' :info="goodsNum >0 ? goodsNum :''">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="profile" info="2">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Notify } from 'vant';
import {mapState , mapMutations} from 'vuex'
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
      ...mapMutations(["INIT_SHOP_CART"])
    },
    computed:{
      ...mapState(["shopCart"]),
      
      goodsNum(){
        // console.log(123)
        if(this.shopCart){
          //总购物车数量
          let num  = 0;
          // console.log(Object.values(this.shopCart))
          Object.values(this.shopCart).forEach((item,index)=>{
            num += item.num;
            // console.log(num)
          })
          return num;
        }else{
          return 0;
        }

      }
    },
    mounted(){
      //获取当前购物车的数据
      this.INIT_SHOP_CART()
    }
  }
</script>

<style lang="scss" scoped>

</style>