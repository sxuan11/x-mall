<template>
  <div id='cart'>
    <div class="header">
      <div>&lt;</div>
      <div>购物车</div>
      <div @click="showSheet">···
        <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @cancel="onCancel"
        @select="onSelect"
      />
      </div>
    </div>
    <div class="item">
      <div v-for="(item,index) in shopCart" :key="index" class="item-d">
        <div class="selected">
          <van-checkbox v-model="item.checked"></van-checkbox>
        </div>
        <div class="item-1">
          <div class="item-1-left">
            <img :src="item.smallimage" alt="" class="item-1-img">
          </div>
          <div class="item-1-right">
            <div class="itemdetail">{{item.name}}</div>
            <div class="num-edit">
              <div class="price">{{item.salePrice | moneyFormat}}</div>
              <div class="num-edit-detail">
                <van-button class="vbtn" type="primary" size="mini" color="#38f" text="-" @click="itemDelete(item.id,item.num)"></van-button>
                <div class="num-count">
                  <input class="num-count-input" type="number" v-model="item.num">
                </div>
                <van-button class="vbtn" type="primary"  size="mini" color="#38f" text="+" @click="itemPlus(item.id,item.name,item.smallImage,item.price)">+</van-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="submit" class="submit" >
      <van-submit-bar
        :price="5999"
        button-text="提交订单"
        @submit="onSubmit"
        class="van-submit-bar"
      >
        <van-checkbox v-model="checked">全选</van-checkbox>
        <span slot="tip">
          你的收货地址不支持同城送, <span>修改地址</span>
        </span>
      </van-submit-bar>
      </div>
  </div>
</template>

<script>
import { ActionSheet } from 'vant';
import { Toast , Dialog} from 'vant';
import {mapState, mapMutations} from 'vuex'
  export default {
    name:'Cart',
    data() {
      return {
        checked:false,
        // num:1,
        show: false,
        actions: [
          { name: '清空购物车' ,color: 'rgb(240, 74, 74)',index:0},

        ],
      }
    },
    computed: {
      ...mapState(["shopCart"])
    },
    methods:{
      ...mapMutations(['DELETE_SHOP_ATCART','ADD_GOODS']),
      showSheet(){
        this.show = !this.show;
        // Toast('show');
      },
      onSubmit(){

      },
      onSelect(item){
        this.show = false;
        if(item.index === 0){
          Toast(item.index);
        }
      },
      onCancel() {
        this.show = !this.show;
        // Toast('cancel');
      },
      
      //删除商品
      itemDelete(itemId,itemNum){
        if(itemNum>1){
          this.DELETE_SHOP_ATCART({itemId})
          Toast.fail('减少了一件了');
        }else if(itemNum === 1){
          Dialog.confirm({
            title: '真的要删除这件商品吗',
            message: '',
          }).then(() => {
            // on confirm
            // console.log('dele')
            this.DELETE_SHOP_ATCART({itemId})
          }).catch(() => {
            // on cancel
          });
        }
      },
      //增加商品
      itemPlus(itemId,itemName, smallImage, itemPrice){
        // this.num = Number(this.num);
        // this.num +=1 
        this.ADD_GOODS({
          itemId,
          itemName,
          smallImage,
          itemPrice,
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  #cart{
    width: 100%;
    height: 100%;
    // background-color: #f5f5f5;
  }
  .header{
    line-height: 0.8rem;
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 0.35rem;
    background-color: #fff;
  }
  .submit{
    // position: fixed;
    // bottom: 3rem;
    // left: 0;
    // z-index: 100;
    // width: 100%;
  }
  .van-submit-bar{
    position: fixed;
    bottom: 0.9rem;
    left: 0;
    z-index: 100;
    width: 100%;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
  }
  .item-img{
    width: 1rem;
    height: 1rem;
  }
  .item{
    
  }
  .item-d{
    width: 100%;
    height: 1.6rem;
    position: relative;
    // border-style:none none dashed none; 
    margin-top: 0.25rem;
  }
  .selected{
    position: absolute;
    left: 0.25rem;
    top: 1rem;
  }
  .item-1{
    position: absolute;
    left:1rem;
    top: 0.5rem;
    display: flex;
    width: 1.6rem;
    height: 1.6rem;
  }
  .item-1-left{
    width: 1.6rem;
    height: 1.6rem;
  }
  .item-1-img{
    width: 1.6rem;
    height: 1.6rem;
  }
  .item-1-right{
    width: 1.6rem;
    height: 1.6rem;
    display: flex;
    flex-direction: column;
  }
  .itemdetail{
    font-size: 0.2rem;
    height: 1rem;
    line-height: 1rem;
    margin-left: 0.1rem;
    width: 4rem;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .num-edit{
    display: flex;
    height: 0.6rem;
    align-items: center;
    justify-content: space-between;
  }
  .price{
    font-size: 0.3rem;
    color: rgb(231, 122, 48);
    margin-left: 0.1rem;
  }
  .num-edit-detail{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 0.6rem;
    
  }
  .num-count{
    font-size: 0.3rem;
    width: 0.6rem;
    text-align: center;
    background-color: rgb(240, 240, 240);
  }
  .num-count-input{
    width: 0.4rem;
    font-size: 0.3rem;
    width: 0.6rem;
    height: 0.4rem;
    text-align: center;
    background-color: rgb(240, 240, 240);
    background:none;  
    outline:none;  
    border:none;
  }
  .vbtn{
    width: 0.2rem;
    height: 0.4rem;
    // text-align: center
    // line-height:0.3rem;
  }
  button{
    // margin: 0;
    // padding: 0;
    // border: none;  //自定义边框
    // outline: none;    //消除默认点击蓝色边框效果
    // background: none;
    // // background-color: transparent;
    // border-radius: 10px;
    // border: none;
    // outline: none;
    // width: 0.5rem;
    // height: 0.5rem;
    // -webkit-appearance: none;
    // -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

</style>