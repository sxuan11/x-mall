<template>
  <div>
    <div class="head">
      <div class="title">
        <div class="tip"></div>
        <div class="tip-text">{{sale_list.link.data.title}}</div>
        <div class="tip-time">{{sale_list.sub_title}}</div>
        <div class="tip-state">已结束</div>
        <div class="tip-more">更多</div>
      </div>
      <div class="items" >
        <div class="item-i" v-for="(item , index)  in sale_list.product_list " :key="index">
          <div class="items-img">
            <van-image :src="item.small_image" class="items-img" lazy-load>
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
          </div>
          <div class="items-detail">{{item.name}}</div>
          <div class="item-price">{{item.origin_price|moneyFormat}}</div>
          <div class="butt">
            <div class="item-sale-price">{{item.price|moneyFormat}}</div>
            <van-icon @click="addToCart(item)" name="cart"  color="#38f" size='0.7rem' style="margin-top: 0.1rem; right:0.3rem;    position: absolute;"/>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    props:{
      sale_list:Object
    },
    components:{
      
    },
    methods:{
      addToCart(item){
        PubSub.publish("homeAddToCart",item)
      }
    }
  }
</script>

<style scoped>
.head{
  background-color: #fff;
  width: 100%;
  height: 7rem;

}
.title{
  width: 100%;
  height: 1.3rem;
  position: relative;
}
.tip{
  background-color: #38f;
  width: 0.18rem;
  height: 0.6rem;
  position: absolute;
  left: 0.4rem;
  top: 0.4rem;
}
.tip-text{
  position: absolute;
  left: 0.6rem;
  top: 0.4rem;
  font-size: 20px;
}
.tip-time{
  position: absolute;
  left: 2.3rem;
  top: 0.5rem;
  font-size: 13px;
  color: rgb(252, 171, 65);
}
.tip-state{
  position: absolute;
  left: 3.5rem;
  top: 0.5rem;
  border: 0.3px #444444 solid;
  font-size: 13px;
}
.tip-more{
  color:#38f;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  font-size: 13px;
}
.items{
  width: 100%;
  /* background-color: yellow; */
  height: 7rem;
  display: flex;
  overflow-x: scroll;
}
.item-i{
  margin-left: 0.2rem;
}
.items-img{
  width: 2.7rem;
  height: 3rem;
}
.items-detail{
  font-size: 15px;
  line-height: 0.39rem;
  height: 0.7rem;
}
.item-price{
  font-size: 13px;
  margin-top: 0.2rem;
  color: rgb(192, 192, 192);
  text-decoration:line-through;
  line-height: 0.39rem;
  height: 0.5rem;
}
.item-sale-price{
  font-size: 17px;
  margin-top: 0.2rem;
  color: rgb(231, 122, 48)
}
.shop{
  
}
.butt{
  display: flex;
  position: relative;
}
</style>