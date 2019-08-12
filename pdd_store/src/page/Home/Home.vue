<template>
    <div id="home">
        <ly-tab 
            class="fix"
            v-model="selectedId" 
            :items="items" 
            :options="options"
            @change="handleChange">
        </ly-tab>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data(){
        return{
            selectedId: 0,
            items:[
                {label: '热门'},
                {label: '服饰'},
                {label: '鞋包'},
                {label: '母婴'},
                {label: '百货'},
                {label: '食品'},
                {label: '内衣'},
                {label: '男装'},
                {label: '电器'}
            ],
            options:{
                lineWidth: 2,
                activeColor: '#e9232c'
            },
            // 二级路由路径
            subRouteUrl: ['/home/hot', '/home/dress', '/home/box','/home/mbaby','/home/general','/home/food','/home/shirt','/home/man', '/home/ele']
        }
    },
    methods:{
        handleChange(item, index){
           this.$router.replace(this.subRouteUrl[index]);
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
#home
    width 100%
    height 100%
    .ly-tabbar{
        box-shadow: none;
    }
    .ly-tab-list
        padding .75rem .625rem
    .ly-tab-item
        font-size .8125rem
    .fix
      position fixed
      left 0
      top 0
      width 100%
      z-index 999
</style>