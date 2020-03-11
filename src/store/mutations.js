import {
  ADD_GOODS,
  INIT_SHOP_CART,
  DELETE_SHOP_ATCART
} from './mutations-type';
import {getStore, setStore, removeStore} from '../config/global'

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
  [INIT_SHOP_CART](state,{}){
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
          console.log("--")
          console.log(goods['num'])
          if(goods['num']===0){
            delete shopCart[itemId];
            console.log("ddd")
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

//   [DELETE_SHOP_ATCART](state, {itemId}){
//     let shopCart = state.shopCart;
//     let goods = shopCart[itemId];
//     if(goods){ // 找到该商品
//         if(goods['num'] > 0){
//             goods['num']--;
//             // 3.1 判断是否只有0个
//             if(goods['num'] === 0){
//                 delete shopCart[itemId];
//             }
//         }else {
//             goods = null;
//         }
//         // 3.2 同时数据
//         state.shopCart = {...shopCart};
//         setStore('shopCart', state.shopCart);
//     }
// },



}