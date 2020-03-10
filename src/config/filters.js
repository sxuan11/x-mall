import vue from 'vue'

//人民币过滤器
vue.filter('moneyFormat',(value)=>{
    return '￥' + Number(value).toFixed(2)
})