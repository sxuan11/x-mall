import {
  ADD_GOODS,
  INIT_SHOP_CART,
  DELETE_SHOP_ATCART,
  SELECT_SINGLE_GOODS,
  SELECT_ALL_GOODS,
  CLEAR_SHOP_CART
} from './mutations-type';
import {getStore, setStore, removeStore} from '../config/global'
import Vue from 'vue'

export default {
  //购物车添加数据
  [ADD_GOODS](state,{itemId,goodsName,smallImage,salePrice}){
    let shopCart = state.shopCart

    //先判断商品是否存在
    if (shopCart[itemId]) {//yes
      shopCart[itemId]['num']++;
    }else{
      shopCart[itemId]={
        "num":1,
        "id":itemId,
        "name":goodsName,
        "smallimage":smallImage,
        "salePrice":salePrice,
        "checked":true,
      }
      
    }
    //生成新的对象
    state.shopCart = {...shopCart};
    //存入本地浏览器
    setStore('shopCart',state.shopCart)
  },

  //页面初始化，先获取当前浏览器的购物车数据
  [INIT_SHOP_CART](state){
    let initShopCart  = getStore('shopCart')
    if (initShopCart) {
      state.shopCart = JSON.parse(initShopCart)
    }
  },

  //把商品从购物车中删除
  [DELETE_SHOP_ATCART](state,{itemId}){
    let shopCart  = state.shopCart;
    let goods = shopCart[itemId];
    // console.log("dd")
    if(goods){//查找产品
      if (goods['num']>0) {
          goods['num']--;
          if(goods['num']===0){
            delete shopCart[itemId];
          }      
      }else{
        goods = null
      }
        //同步数据
        state.shopCart = {...shopCart};
        setStore('shopCart',state.shopCart)
    }
    // let deleteShopCart = removeStore('shopCart')
  },

  //商品的选中
  [SELECT_SINGLE_GOODS](state,{itemId}){
    let shopCart  = state.shopCart;
    let goods = shopCart[itemId];
    if (goods) {
      if (goods.checked) {//判断是否有该属性
        goods.checked = !goods.checked;
      }else{
        Vue.set(goods,"checked",true)
      }
      //同步数据
      state.shopCart = {...shopCart};
      setStore('shopCart',state.shopCart)
    }
  },

  //商品全选
  [SELECT_ALL_GOODS](state,{isSelected}){
    let shopCart  = state.shopCart;
    Object.values(shopCart).forEach((goods,index)=>{
      if(isSelected == true){
        goods.checked = !goods.checked
      }else if(isSelected == false){
        goods.checked = true
      }
      state.shopCart = {...shopCart};
      setStore('shopCart',state.shopCart)
    })
  },

  //清空购物车 
  [CLEAR_SHOP_CART](state){
    state.shopCart = {};
    state.shopCart = {...shopCart}
    setStore('shopCart',state.shopCart)
  }

}