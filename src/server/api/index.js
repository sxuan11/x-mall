import ajax from './ajax.js'
//
//定义基础路径
const BASE_URL = 'http://47.102.100.226:3030/sxsx'

//获取首页数据
export const getHomeData = () => ajax(BASE_URL + '/api/homeApi' )

//获取分类列表
export const getCategory = () => ajax(BASE_URL + '/api/homeApi/categories')
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);

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
//
// export const userLogOut = (phone,code) => ajax(API_BASE_URL + '/api/logout',{phone,code},'POST')

//地址接口
//获取用户当前的地址
// export const
//添加新地址
//编辑用户的地址
//删除用户的地址
//获取单条的地址

