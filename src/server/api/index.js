import ajax from './ajax.js'

//定义基础路径
const BASE_URL = 'http://47.102.100.226:3030/sxsx'
/**
 * 数据相关
 */
//获取首页数据
export const getHomeData = () => ajax(BASE_URL + '/api/homeApi' )
//获取分类列表
export const getCategory = () => ajax(BASE_URL + '/api/homeApi/categories')
//获取分类列表数据詳情
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);


/**
 * 登录相关
 */
//用户中心接口
//http://47.102.100.226:3030/sxsx/api/send_code

const API_BASE_URL = '/sxsx'
// const API_BASE_URL = 'http://47.102.100.226:3030/sxsx'
//发送验证码
export const getPhoneCode = (phone) => ajax(API_BASE_URL + '/api/send_code',{phone})
//手机验证码登录
export const phoneCodeLogin = (phone,code) => ajax(API_BASE_URL + '/api/login_code',{phone,code},'POST')
//退出登录
export const userLogOut = () => ajax(API_BASE_URL + '/api/logout')
//自动登录
export const getUserInfo = () => ajax(API_BASE_URL + '/api/userinfo')


/**
 * 购物车相关
 */

 //添加到购物车
export const addToCart = (user_id, goods_id, goods_name, goods_price, small_image) => ajax(API_BASE_URL + '/api/cart/add',{user_id, goods_id, goods_name, goods_price, small_image},'POST')
//获取购物车数据
export const getShopCart = (user_id) => ajax(API_BASE_URL + '/api/cart/search/' + user_id)
//修改购物车数量
export const editShopNum = (user_id,goods_id,type) => ajax(API_BASE_URL + '/api/cart/num',{user_id,goods_id,type},'POST')
//删除购物车物品
export const clearShopCart = (user_id) => ajax(API_BASE_URL + '/api/cart/clear/' +user_id)
//商品的选中和反选
export const singleSelectShop = (user_id,goods_id) => ajax(API_BASE_URL + '/api/cart/singer_select',{user_id,goods_id},'POST')
//全部商品的选中和反选
export const allSelectShop = (user_id,flag) => ajax(API_BASE_URL + '/api/cart/all_select',{user_id,flag},'POST')
//查询当前选中的商品
export const selectShopNow = (user_id) => ajax(API_BASE_URL + '/api/cart/selected/'+user_id)
//删除当前选中的商品
export const deleteSelectShop = (user_id) => ajax(API_BASE_URL + '/api/cart/del_checked/'+user_id)

 /**
  * 地址相关
  */
//添加新地址
export const addNewAddress = (user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) => ajax(API_BASE_URL + '/api/address/add',{user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode},'POST')
//编辑用户的地址
export const editAddress = (address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) => ajax(API_BASE_URL + '/api/address/add',{address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode},'POST')
//删除用户的地址
export const deleteAddress = () => ajax(API_BASE_URL + '/api/address/del')
//获取用户当前的地址
export const getUserNowUseAddress = () => ajax(API_BASE_URL + '/api/address/search')
//获取单条的地址
export const getUserOneAddress = (user_id,address_id) => ajax(API_BASE_URL + '/api/address/one',{user_id,address_id},'POST')
