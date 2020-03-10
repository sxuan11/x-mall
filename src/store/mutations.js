import {ADD_GOODS} from './mutations-type';

export default {
  //网购物车添加数据
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
      }
    //生成新的对象
    state.shopCart = {...shopCart};
    }
  }
}