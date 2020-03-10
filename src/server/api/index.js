import ajax from './ajax.js'
//
//定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc'

export const getHomeData = () => ajax(BASE_URL + '/api/homeApi' )

export const getCategory = () => ajax(BASE_URL + '/api/homeApi/categories')

export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);


