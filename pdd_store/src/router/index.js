import Vue from 'vue'
import Router from 'vue-router'

// 一级路由
import Home from '@/page/Home/Home'
import Recommend from '@/page/Recommend/Recommend'
import Search from '@/page/Search/Search'
import Cart from '@/page/Cart/Cart'
import Me from '@/page/Me/Me'
import Login from '@/page/Login/Login'

// 二级路由
import Hot from '@/page/Home/Children/Hot/Hot'
import Box from '@/page/Home/Children/Box/Box'
import Dress from '@/page/Home/Children/Dress/Dress'
import Food from '@/page/Home/Children/Food/Food'
import Ele from '@/page/Home/Children/Ele/Ele'
import General from '@/page/Home/Children/General/General'
import Man from '@/page/Home/Children/Man/Man'
import Mbaby from '@/page/Home/Children/Mbaby/Mbaby'
import Shirt from '@/page/Home/Children/Shirt/Shirt'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '/home', 
      name: 'Home', 
      component: Home,
      children:[
        {path: 'hot', name:'Hot', component: Hot, meta:{showBottomTabBar: true}},
        {path: 'box', name:'Box', component: Box, meta:{showBottomTabBar: true}},
        {path: 'dress', name:'Dress', component: Dress, meta:{showBottomTabBar: true}},
        {path: 'mbaby', name:'Mbaby', component: Mbaby, meta:{showBottomTabBar: true}},
        {path: 'general', name:'General', component: General, meta:{showBottomTabBar: true}},
        {path: 'food', name:'Food', component: Food, meta:{showBottomTabBar: true}},
        {path: 'shirt', name:'Shirt', component: Shirt, meta:{showBottomTabBar: true}},
        {path: 'man', name:'Man', component: Man, meta:{showBottomTabBar: true}},
        {path: 'ele', name:'Ele', component: Ele, meta:{showBottomTabBar: true}},
        {path: '/home', redirect: '/home/hot'}
      ] 
    },

    { path: '/recommend', name: 'Recommend', component: Recommend, meta:{showBottomTabBar: true}},
    
    { path: '/search', name: 'Search', component: Search, meta:{showBottomTabBar: true}},

    { path: '/cart', name: 'Cart', component: Cart, meta:{showBottomTabBar: true}},

    { path: '/me', name: 'Me', component: Me, meta:{showBottomTabBar: true}},

    { path: '/login', name:'Login', component: Login },

    { path: '/', redirect: '/home'}
  ]
})
