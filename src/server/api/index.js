import ajax from './ajax.js'
//
//定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc'

//获取首页数据
export const getHomeData = () => ajax(BASE_URL + '/api/homeApi' )

//获取分类列表
export const getCategory = () => ajax(BASE_URL + '/api/homeApi/categories')
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);

//地址接口
//获取用户当前的地址
// export const
//添加新地址
//编辑用户的地址
//删除用户的地址
//获取单条的地址

