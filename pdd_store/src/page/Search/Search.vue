<template>
    <div id="search">
        <!-- 导航搜素 -->
        <search-nav :showSearchPanel="showSearchPanel"></search-nav>
        <div class="shop">
            <!-- 左边 -->
            <div class="menu-wrapper">
                <ul>
                    <li class="menu-item" 
                    v-for="(goods,index) in searchgoods" 
                    :key="index" 
                    @click="clickLeftLi(index)" 
                    ref="menuList"
                    :class="{current: currentIndex === index}">
                        <span>{{goods.name}}</span>
                    </li>
                </ul>
            </div>
            <!-- 右边 -->
            <div class="shop-wrapper">
                <ul>
                    <li class="shops-li" v-for="(goods,index) in searchgoods" :key="index">
                        <!-- 头部 -->
                        <div class="shops-title">
                            <h4>{{goods.name}}</h4>
                            <a href="">查看更多></a>
                        </div>
                        <!-- 身体 -->
                        <ul class="shops-items">
                            <li v-for="(item,index) in goods.items" :key="index">
                                <img v-lazy="item.icon" alt="">
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 显示面板 -->
        <search-panel v-if="isShow" :showSearchPanel="showSearchPanel"></search-panel>
    </div>
</template>

<script>
// 引入状态
import {mapState} from 'vuex'

import SearchNav from './Children/SearchNav'
import SearchPanel from './Children/SearchPanel'

import BScroll from 'better-scroll'

export default {
    name: "Search",
    mounted(){
        this.$store.dispatch('reqSearchgoods');
    },
    data(){
        return {
            isShow: false,
            // 右侧列表滑动的Y轴坐标(实时更新)
            scrollY : 0,
            // 所有分类的头部位置
            rightLiTops: [] 
        }
    },
    computed:{
        ...mapState(['searchgoods']),
        // 用于动态决定左侧那个选项被选中
        currentIndex(){
            // 获取数据
            const {scrollY,rightLiTops} = this;
            // 取出索引
            return rightLiTops.findIndex((liTop, index)=>{
                // console.log(liTop,index);
                this._leftScroll(index);
                return scrollY >= liTop && scrollY < rightLiTops[index + 1];
            })
        }
    },
    components: {
        SearchNav,
        SearchPanel
    },
    methods: {
        // 是否显示搜索的面板
        showSearchPanel(flag){
            this.isShow = flag
        },
        // 初始化滚动的视图
        _initBScroll(){
            // 初始化左边的视图
            this.leftScroll = new BScroll('.menu-wrapper')
            // 初始化右边的视图
            this.rightScroll = new BScroll('.shop-wrapper',{
                probeType : 3
            })
            // 监听右边的滚动
            this.rightScroll.on('scroll',(pos)=>{
                // console.log(pos.y);
                this.scrollY = Math.abs(Math.round(pos.y));
            })
        },
        
        // 求出右边所有版的头部高度
        _initRightLiTops(){
            // 临时数组
            let tempArr = [];
            // 定义变量计算高度
            let top = 0;
            tempArr.push(top);

            let allLis = this.$el.getElementsByClassName('shops-li');
            Array.prototype.slice.call(allLis).forEach((li, index) => {
                if(index === allLis.length-1){
                    li.style.paddingBottom = `${(window.innerHeight - li.clientHeight - 100)}px`;
                }
                top += li.clientHeight;
                tempArr.push(top);
            });
            // 更新数据
            this.rightLiTops = tempArr;
        },

        // 点击左边
        clickLeftLi(index){
            this.scrollY = this.rightLiTops[index];
            this.rightScroll.scrollTo(0, -this.scrollY, 300);
        },
        // 左边联动
        _leftScroll(index){
            // console.log(index);
            // 取出左边所有的li标签
            let menuList = this.$refs.menuList;
            let el = menuList[index];
            // console.log(menuList);
            // 滚动到对应的元素上去
            this.leftScroll.scrollToElement(el,0, 0, -100);
        }
    },
    watch: {
        searchgoods(){
            this.$nextTick(()=>{
                // 初始化 better-scroll 插件
                this._initBScroll();
                // 求出右边所有的版块的头部高度
                this._initRightLiTops();
            })
        }
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
#search
    width 100%
    height 100%
    overflow hidden
    .shop
        display flex
        position absolute
        top 3.75rem
        bottom 3.125rem
        width 100%
        overflow hidden
        .menu-wrapper
            width 80px
            flex 0 0 80px
            .menu-item
                width 100%
                height 2.81rem
                background #fafafa
                display flex
                justify-content center
                align-items center
                font-weight lighter
                color #666
                position relative 
                font-size 0.9rem
            .current
                color #e02e24
            .current::before{
                content:''
                background #e02e24
                height 1.5rem
                width 0.25rem
                position absolute
                left 0
            }
        .shop-wrapper
            flex 1
            background #fff
            .shops-li
                padding-bottom 0.625rem
                .shops-title
                    height 2.5rem
                    padding 0 0.625rem
                    display flex
                    flex-direction row
                    align-items center
                    justify-content space-between
                    color #999
                    font-size 0.875rem
                    a
                        color #999
                        text-direction none 
                        font-weight lighter
                .shops-items
                    display flex
                    flex-wrap wrap
                    li 
                        display flex
                        flex-direction column
                        width 33.33%
                        height 5.312rem
                        justify-content center
                        align-items center
                        color #666
                        font-weight lighter
                        font-size 0.75rem;
                        img 
                            width 60%
                            height 60%
                            margin-bottom 0.25rem
                .phone-type
                    width 100%
                    display flex
                    flex-direction row
                    flex-wrap wrap
                    border: 1px solid #ccc
                    li
                        width 33.3%
                        display flex
                        justify-content center
                        align-items center
                        margin 0.25rem 0
                        img
                            width 70%
</style>