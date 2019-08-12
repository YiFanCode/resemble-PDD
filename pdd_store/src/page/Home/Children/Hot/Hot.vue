<template>
    <div id="hot">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(casual, index) in homecasual" :key="index">
                    <img :src="casual.imgurl" width="100%" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
         <!-- 导航 -->
        <HotNav></HotNav>
        <!-- 商品列表 -->
        <HotShopList></HotShopList>
    </div> 
</template>

<script>
// 引入swiper
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

// 引入子组件
import HotNav from './HotNav'
import HotShopList from './HotShopList'

// 引入数据
import {mapState} from 'vuex';
export default {
    name: 'Hot',
    components:{
        HotNav,
        HotShopList
    },
    computed: {
       ...mapState(['homecasual']) 
    },
    mounted() {
        // 请求轮播图数据
        this.$store.dispatch('reqHomeCasual');
        // 请求导航数据
        this.$store.dispatch('reqHomeNav');
        // 请求商列表品数据
        this.$store.dispatch('reqHomeShopList');
    },
    watch: {
        homecasual(){
            this.$nextTick(()=>{
                // 初始化轮播图
                new Swiper('.swiper-container',{
                    autoplay: true,
                    loop: true,
                    pagination:{
                        el: '.swiper-pagination'
                    }
                })
            })
        }
    },
}
</script>

<style scope lang="stylus" ref="stylesheet/stylus">
#hot
    width 100%
    height 100%
    overflow-x hidden !important
    padding-top 2.5625rem
    .swiper-pagination-bullet-active
        background #e9232c
</style>