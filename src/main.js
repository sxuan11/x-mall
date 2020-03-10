import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/fastclick.js'
import './plugins/element.js'
import './plugins/vant.js'
import './config/rem.js'

//引入全局过滤器
import './config/filters.js'
import BScroll from '@better-scroll/core'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
