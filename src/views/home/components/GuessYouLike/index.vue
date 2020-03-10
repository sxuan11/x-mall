<template>
  <div class="guess">
    <div class="header"> -猜你喜欢-</div>
    <div class="item">
      <div class="item-i" v-for=" (item , index) in guess_list.product_list " :key="index" v-lazy>
        <van-image :src="item.small_image" class="item-image" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="item-name">{{item.name}}</div>
        <div class="butt">
            <div class="item-sale-price">{{item.price|moneyFormat}}</div>
            <div class="item-price">{{item.origin_price|moneyFormat}}</div>
            <van-icon @click="addToCart(item)" name="cart"  color="#38f" size='0.7rem' style="margin-top: 0.2rem; right:0.3rem;    position: absolute;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js';
  export default {
    data() {
      return {
        
      }
    },
    props:{
      guess_list:Object
    },
    methods: {
      addToCart(item){
        PubSub.publish("homeAddToCart",item)
      }
    },
  }
</script>

<style scoped>
.butt{
  display: flex;
  position: relative;
}
.header{
  text-align: center;
  font-size: 29px;
  margin: 0.2rem 0 0.3rem 0;
}
.guess{
  width: 100%;
}
.item{
  display: flex;
  flex-wrap: wrap;
}
.item-i{
  width: 3.5rem;
  margin-left: 0.06rem;
  background-color: #fff;
  margin-bottom: 0.5rem;
}
.item-image{
  width: 3.5rem;
  height: 3.5rem;
}
.item-sale-price{
  font-size: 17px;
  margin-top: 0.2rem;
  line-height: 0.8rem;
  color: rgb(231, 122, 48)
}
.item-price{
  font-size: 13px;
  margin-top: 0.2rem;
  margin-left: 0.4rem;
  color: rgb(192, 192, 192);
  text-decoration:line-through;
  line-height: 0.8rem;
  height: 0.5rem;
}
.item-name{
  font-size: 15px;
}
</style>