import Vue from 'vue'

import moment from 'moment';
// 中文简体
moment.locale('zh-cn');

//人民币过滤器
Vue.filter('moneyFormat',(value)=>{
    return '￥' + Number(value).toFixed(2)
})

//时间过滤器
Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') =>{
    return moment(dataStr).format(pattern)
})