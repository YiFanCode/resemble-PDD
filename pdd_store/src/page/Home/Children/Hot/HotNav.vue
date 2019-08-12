<template>
    <div id="hot-nav">
        <div id="wrapper">
            <div id="scroller">
                <ul>
                    <li>
                        <div v-for="(item, index) in homenav.item1" :key="index">
                            <img v-lazy="item.iconurl" alt="">
                            <span v-text="item.icontitle"></span>
                        </div>
                    </li>
                    <li>
                        <div v-for="(item, index) in homenav.item2" :key="index">
                            <img v-lazy="item.iconurl" alt="">
                            <span v-text="item.icontitle"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// 引入状态
import {mapState} from 'vuex'
// 引入iscroll
import IScroll from 'iscroll'

export default {
    name:'HotNav',
    computed:{
        ...mapState(['homenav'])
    },
    mounted(){
        // 初始化
        new IScroll('#wrapper',{
            scrollX: true
        });
        this.$el.addEventListener('touchmove', this.handleTouchMove);
    },
    methods:{
        handleTouchMove(e){
            // 阻止默认事件
            e.preventDefault();
            console.log('move()....');
        }
    }
}
</script>

<style scope lang="stylus" ref="stylesheet/stylus">
#hot-nav
        #wrapper 
            position relative
            width 100%
            background #fff
            padding .625rem 0
            #scroller
                width 40rem
                height 100%
                ul
                    width 100%
                    height 100% 
                    li
                        width 100%
                        height 4rem
                        div
                            width 5rem
                            height 4rem
                            float left
                            display flex
                            flex-direction column
                            justify-content center
                            align-items center
                            font-size .8125rem
                            img
                                width 2rem
                            span
                                text-align center
                                margin-top .5rem           
</style>