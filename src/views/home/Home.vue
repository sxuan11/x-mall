<template>
  <div id='home'>
    <div v-if="!showLoading">
      <TopBar></TopBar>
      <Swipe1 :swipe_list='swipe_list' />
      <!-- <Swipe></Swipe> -->
      <Grid :grid_list='grid_list'></Grid>
      <FastSale :sale_list='sale_list'></FastSale>
      <GuessYouLike :guess_list='guess_list'></GuessYouLike>
      <a v-if="showBackToTop" @click="backTop"><ToTop/></a>
    </div>
    <div v-else>
      <van-loading 
      size="24px" 
      color="#1989fa" 
      vertical
      style="position: absolute;left:50%;top:40%;transform: translate(-50%)"
      >加载中...</van-loading>
    </div>
  </div>
</template>

<script>
  import Swipe from './components/Swipe/Swipe'
  import Swipe1 from './components/Swipe/vue-awesome-swiper'
  import TopBar from './components/TopBar/TopBar'
  import Grid from './components/Grid/Grid'
  import FastSale from './components/FastSale/index'
  import GuessYouLike from './components/GuessYouLike/index'
  import ToTop from './../../components/scroolToTop/top'
  import { mapMutations , mapState } from 'vuex'
  import PubSub from 'pubsub-js'
  import { Toast } from 'vant';
  import { getHomeData , addToCart } from './../../server/api/index.js'
  export default {
    data(){
      return{
        swipe_list:[],
        grid_list:[],
        sale_list:[],
        guess_list:[],
        //是否显示loading框
        showLoading:true,
        //显示返回顶部
        showBackToTop:false,
      }
    },
    name:'Home',
    components:{
      Swipe,
      TopBar,
      Grid,
      Swipe1,
      FastSale,
      GuessYouLike,
      ToTop,
    },
    computed:{
      ...mapState(["userInfo"])
    },
    created() {
      //使用异步调用
      this.requDate();
    },
    mounted () {
      window.addEventListener('scroll', this.scrollToTop);
      //添加购物车的消息订阅
      PubSub.subscribe('homeAddToCart',(msg,goods)=>{
        if (msg === "homeAddToCart") {
          console.log(this.userInfo)
          if( this.userInfo.token){  
            this.addRealCart(goods)   
        }else {
          Toast('尚未登录')
          this.$router.push('/login')
          }
        }
      })
    },
    beforeDestroy(){
      PubSub.unsubscribe('homeAddToCart')
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods:{
      ...mapMutations(["ADD_GOODS"]),
      //返回顶部
      backTop () {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      //添加到购物车
      async addRealCart(goods){
        let result = await addToCart(this.userInfo.token,goods.id,goods.name,goods.price,goods.small_image)
        if (result.success_code === 200 ){
          this.ADD_GOODS({
            itemId:goods.id,
            goodsName:goods.name,
            smallImage:goods.small_image,
            salePrice:goods.price,
        })
         //发送提示给用户
          Toast({
            message:"添加购物车成功",
            type:"success",
            duration:1000
          });
        }else{
          Toast.fail('其他错误，请尝试重新登录')
        }
      },
      // 计算距离顶部的高度，当高度大于300显示回顶部图标，小于300则隐藏
      scrollToTop () {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 300) {
          that.showBackToTop = true
        } else {
          that.showBackToTop = false
        }
      },
      //请求首页数据
      async requDate(){
        let response = await getHomeData();
        // console.log(res)
        if(response.success){
           this.swipe_list= response.data.list[0].icon_list
           this.grid_list= response.data.list[2].icon_list
           this.sale_list= response.data.list[3]
           this.guess_list= response.data.list[12]
           this.showLoading = !this.showLoading
         }
         
      }
    }
  }
</script>

<style lang="scss" scoped>
#home{
  width: 100%;
  height: 100%;
  background-color: rgb(247, 247, 247);
}
.btn{
  position: fixed;
  right: 0;
  bottom: 1rem;
}
</style>