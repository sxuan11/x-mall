<template>
  <div>
    <van-tabbar 
    v-model="active"
    >
      <van-tabbar-item icon="home-o" replace to='home'>首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" replace to='category'>分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" replace to='cart' :info="goodsNum >0 ? goodsNum :''">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" replace to="profile" info="2">我的</van-tabbar-item>
    </van-tabbar>
      <!-- <van-tabbar v-model="active" >
        <van-tabbar-item icon="home-o" replace to="/dashboard/home">
            <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item icon="apps-o" replace to="/dashboard/category">
            <span>分类</span>
        </van-tabbar-item>
        <van-tabbar-item icon="cart-o" replace to="/dashboard/cart" :info="goodsNum > 0 ? goodsNum : ''">
            <span>购物车</span>
        </van-tabbar-item>
        <van-tabbar-item icon="contact" replace to="/dashboard/profile">
            <span>我的</span>
        </van-tabbar-item>
      </van-tabbar>
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/> -->
  </div>
</template>

<script>
  import { Notify , Toast } from 'vant';
  import {mapState , mapMutations , mapActions } from 'vuex'
  import { autoUploadUserInfo , getShopCart}  from './../../server/api/index.js'

  export default {
    data() {
      return {
        active: Number(sessionStorage.getItem('tabbarActiveIndex')) || 0
      }
    },
    watch:{
      active(value){
        // console.log(this.$route.meta)
        let tabbarActiveIndex = value
        sessionStorage.setItem('tabbarActiveIndex',value)
      }
    },
    methods:{
      ...mapMutations(["INIT_SHOP_CART","INIT_USER_INFO"]),
      ...mapActions(['reqUserInfo']),
      async initShopCart(){
        console.log(this.userInfo)
        // if(this.userInfo.token){
          let result = await getShopCart(this.userInfo.token)
          console.log(result)
          if(result.success_code === 200){
            let cartArr = result.data;
            let shopCart = {};
            cartArr.forEach((value)=>{
                shopCart[value.goods_id] = {
                    "num": value.num,
                    "id": value.goods_id,
                    "name": value.goods_name,
                    "small_image": value.small_image,
                    "price": value.goods_price,
                    "checked": value.checked
                }
            });
            setStore('shopCart', shopCart);
            this.INIT_SHOP_CART()
          }

        // }else{
        //   Toast.fail('未知错误，请尝试重新登录')
        // }
      }
    },
    computed:{
      ...mapState(["shopCart","userInfo"]),
      
      async autoLogin(){
        let result  = await autoUploadUserInfo()
        if(result.success_code === 200 ){
          this.INIT_USER_INFO()
        }else{
          // Toast.fail('请先登录')
        }
      },
      goodsNum(){
        // console.log(123)
        if(this.shopCart){
          //总购物车数量
          let num  = 0;
          // console.log(Object.values(this.shopCart))
          Object.values(this.shopCart).forEach((item,index)=>{
            num += item.num;
          })
          return num;
        }else{
          return 0;
        }

      }
    },
    updated(){
      // this.initShopCart()
    },
    mounted(){
      //获取当前购物车的数据
      this.initShopCart()
      //获取用户数据,判断是否可以自动登录
      this.autoLogin
      this.reqUserInfo()
    },

  }
</script>

<style lang="scss" scoped>

</style>