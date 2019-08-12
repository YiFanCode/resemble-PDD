import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

// 引入首页顶部tab
import LyTab from 'ly-tab'
Vue.use(LyTab)

import loading from '@/common/img/loading.gif'
Vue.use(VueLazyload,{
  loading:loading
});

//引入字体图标
import '@/common/css/style.css'

import "./common/stylus/mixins.styl"

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
