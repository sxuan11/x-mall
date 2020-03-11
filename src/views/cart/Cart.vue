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
      <div class="selected">
        <van-checkbox v-model="checked"></van-checkbox>
      </div>
      <div class="item-1">
        <div class="item-1-left">
          <img src="./images/detail1.jpg" alt="" class="item-1-img">
        </div>
        <div class="item-1-right">
          <div class="itemdetail">詳情</div>
          <div class="num-edit">
            <div class="price">$1</div>
            <div class="num-edit-detail">
              <van-button type="default" size="mini" @click="itemDelete">-</van-button>
              <div class="num-count">
                <input class="num-count-input" type="number" v-model="num"></div>
              <van-button type="default" size="mini" @click="itemPlus">+</van-button>
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
import { Toast } from 'vant';
import {mapState} from 'vuex'
  export default {
    name:'Cart',
    data() {
      return {
        checked:false,
        num:1,
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
      
      itemDelete(){
        if(this.num===1){
          // console.log('不能再减了')
          Toast.fail('不能再减啦');
        }else{
          this.num = Number(this.num);
          this.num -=1 
        }
      },
      itemPlus(){
        this.num = Number(this.num);
        this.num +=1 
      }
    },
  }
</script>

<style lang="scss" scoped>
  #cart{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
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
    position: relative;
    
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
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1rem;
    margin-left: 0.1rem;
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
    margin-left: 1rem;
    
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
    height: 0.3rem;
    text-align: center;
    background-color: rgb(240, 240, 240);
    background:none;  
    outline:none;  
    border:none;
  }

</style>