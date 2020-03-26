<template>
  <div id='profile'>
    <div v-if="userInfo.token">
    <van-nav-bar
      title="我的"
      :fixed="true"
      :border="false"
    />
    <van-cell-group style="margin-top:0.85rem;">
    <van-cell style="background-color: rgb(255, 133, 42);">
      <!-- 使用 title 插槽来自定义标题 -->
      <template slot="title">
        <div>
          <div class="personInfo">
            <img src="./img/pic.jpg" alt="" class="personImg"> 
            <div class="info">
              <span class="personName">{{userInfo.real_name}}</span>
              <span class="phoneName">{{userInfo.phone}}</span>
            </div>
          </div>
        </div>
      </template>
    </van-cell>
    </van-cell-group>
    <van-cell title="我的订单" value="点击查看全部订单" is-link style="margin-top:0.1rem;">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-icon
          slot="icon"
          name="label-o"
          style="line-height: inherit;"
          color="rgb(255, 133, 42)"
          size="0.35rem"
        />
    </van-cell>
    <van-grid>
      <van-grid-item icon="peer-pay" text="待支付" />
      <van-grid-item icon="send-gift-o" text="代发货" />
      <van-grid-item icon="shopping-cart-o" text="待收货" />
      <van-grid-item icon="chat-o" text="待评价" />
    </van-grid>
    <van-cell title="我的优惠卷" value="" is-link style="margin-top:0.1rem;">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-icon
          slot="icon"
          name="after-sale"
          style="line-height: inherit;"
          color="rgb(255, 133, 42)"
          size="0.35rem"
        />
    </van-cell>
    <van-cell title="我的收货地址" is-link>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-icon
          slot="icon"
          name="logistics"
          style="line-height: inherit;"
          color="rgb(255, 133, 42)"
          size="0.35rem"
        />
    </van-cell>
    <van-cell title="联系客服" value="9:00-22:00" is-link style="margin-top:0.1rem;">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <van-icon
          slot="icon"
          name="phone-o"
          style="line-height: inherit;"
          color="rgb(255, 133, 42)"
          size="0.35rem"
        />
    </van-cell>
    </div>
    <div v-else><noLogin/></div>
  </div>
</template>

<script>
  import noLogin from './../login/SelectLoginPro'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name:'Profile',
    data() {
      return {
        
      }
    },
    components:{
      noLogin,
    },
    computed:{
      ...mapState(["userInfo"])
    }
  }
</script>

<style lang="scss" scoped>
#profile{
  width: 100%;
  height: calc(100vh);
  background-color: #f5f5f5;
}
.van-nav-bar{
  background-color: rgb(255, 133, 42);
}
.van-nav-bar__title{
  font-size: 0.3rem;
  color: #fff;
}
.personInfo{
  display: flex;
  align-items: center;
  height: 1.4rem;
}
.personImg{
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.8rem;
  border: 0.05rem solid #fff;
}
.info{
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
.personName{
  font-size: 0.5rem;
  margin-left: 0.2rem;
  color: #fff;
}
.phoneName{
  font-size: 0.2rem;
  margin-left: 0.2rem;
  color: #fff;
}
</style>