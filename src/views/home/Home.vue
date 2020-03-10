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
  import {getHomeData} from './../../server/api/index.js'
  import FastSale from './components/FastSale/index'
  import GuessYouLike from './components/GuessYouLike/index'
  import ToTop from './../../components/scroolToTop/top'
  import {mapMutations} from 'vuex'
  import PubSub from 'pubsub-js'
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
    created() {
      //使用异步调用
      this.requDate();
    },
    mounted () {
      window.addEventListener('scroll', this.scrollToTop);
      PubSub.subscribe('homeAddToCart',(msg,goods)=>{
        if (msg === "homeAddToCart") {
          this.ADD_GOODS({
            goodsId:goods.id,
            goodsName:goods.name,
            goodsImage:goods.small_image,
            goodsPrice:goods.price,
          })
        }
      })
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods:{
      ...mapMutations(["ADD_GOODS"]),
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