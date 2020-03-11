import {
  ADD_GOODS,
  INIT_SHOP_CART,
} from './mutations-type';
import {getStore, setStore} from '../config/global'

export default {
  //购物车添加数据
  [ADD_GOODS](state,{goodsId,goodsName,smallImage,salePrice}){
    let shopCart = state.shopCart

    //先判断商品是否存在
    if (shopCart[goodsId]) {//yes
      shopCart[goodsId]['num']++;
    }else{
      shopCart[goodsId]={
        "num":1,
        "id":goodsId,
        "name":goodsName,
        "smallimage":smallImage,
        "salePrice":salePrice,
        "checked":true,
      }
      
    }
    //生成新的对象
    state.shopCart = {...shopCart};
    //存入本地
    setStore('shopCart',state.shopCart)
  },

  //页面初始化，先获取当前浏览器的购物车数据
  [INIT_SHOP_CART](state,{}){
    let initShopCart  = getStore('shopCart')
    if (initShopCart) {
      state.shopCart = JSON.parse(initShopCart)
    }
  }
}