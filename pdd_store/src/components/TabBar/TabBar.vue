<template>
    <div>
        <div class="bottom-tab">
            <div class="tab-item" @click="switchTo('/home')">
                <img :src="$route.path.includes('/home') ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="">
                <span :class="{on: $route.path.includes('/home')}">首页</span>
            </div>
            <div class="tab-item" @click="switchTo('/recommend')">
                <img :src="$route.path.includes('/recommend') ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="">
                <span :class="{on: $route.path.includes('/recommend')}">推荐</span>
            </div>
            <div class="tab-item" @click="switchTo('/search')">
                <img :src="$route.path.includes('/search') ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="">
                <span :class="{on: $route.path.includes('/search')}">搜索</span>
            </div>
            <div class="tab-item" @click="switchTo('/cart')">
                <img :src="$route.path.includes('/cart') ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" alt="">
                <span :class="{on: $route.path.includes('/cart')}">购物车</span>
            </div>
            <div class="tab-item" @click="switchTo('/me')">
                <img :src="$route.path.includes('/me') ? tabBarImgArr[4].selected : tabBarImgArr[4].normal" alt="">
                <span :class="{on: $route.path.includes('/me')}">个人中心</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabBar',
    data(){
        return{
            tabBarImgArr:[
                {normal: require('./../../common/img/icon_home.png'), selected: require('./../../common/img/icon_home_selected.png')},
                {normal: require('./../../common/img/icon_intro.png'), selected: require('./../../common/img/icon_intro_selected.png')},
                {normal: require('./../../common/img/icon_search.png'), selected: require('./../../common/img/icon_search_selected.png')},
                {normal: require('./../../common/img/icon_chat.png'), selected: require('./../../common/img/icon_chat_selected.png')},
                {normal: require('./../../common/img/icon_mine.png'), selected: require('./../../common/img/icon_mine_selected.png')},
            ]
        }
    },
    methods:{
        switchTo(path){
            // 切换路由
            this.$router.replace(path);
        }
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    .bottom-tab
        border-top-1px(#f5f5f5)
        width 100%
        height 3.125rem
        background #fff
        position fixed
        left 0
        bottom 0
        right 0
        z-index 200
        display flex
        box-shadow 0 -0.2rem 1rem #ccc
        .tab-item
            display flex
            flex 1
            flex-direction column
            justify-content center
            align-items center
            font-size .812rem
            img
                width 34%
                margin-bottom .25rem
            .on
                color #e9232c
</style>