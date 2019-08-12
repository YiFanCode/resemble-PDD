<template>
    <div class="search-panel">
        <div class="search-nav">
            <div class="search-input">
                <img src="../images/search.png" alt="" width="25">
                <input type="search" placeholder="石榴水果">
            </div>
            <button @click="showSearchPanel(false)">取消</button>
        </div>
        <div class="search-content">
            <div class="title">
                <img src="../images/hot.png" alt="" width="25">
                <span>热门搜素</span>
            </div>
            <ul class="search-list">
                <li>面巾纸</li>
                <li>浴巾儿童</li>
                <li>石榴水果</li>
                <li>冰箱保鲜盒</li>
                <li>富豪卷纸</li>
                <li>毛巾浴袍</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchPanel',
    props:{
        showSearchPanel: Function
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.search-panel
    width 100%
    height 100%
    background #ffffff
    position fixed
    top 0
    left 0
    z-index 1000
    .search-nav
        width 100%
        height 3.75rem
        border-bottom 1px solid #dddddd
        padding 0 1.25rem
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        .search-input
            display flex
            flex-direction row
            align-items center
            width 85%
            height 2.375rem
            border-radius 0.3125rem
            background #ededed
            padding 0 0.625rem
            input 
                background transparent 
                width 90%
                height 90%
                padding-left 0.625rem
                color #aaaaaa
                font-size 0.937rem
                outline none 
        button 
            background transparent
            font-size 0.937rem
            color #aaa
    .search-content 
        padding 1.25rem
        .title
            display flex
            flex-direction row
            align-items center
            color #aaa
            margin-bottom .625rem
        .search-list
            display flex
            flex-direction row
            flex-wrap wrap
            li
                margin .5rem
                padding .5rem .5rem
                border-radius .625rem
                color #aaaaaa
                background #ededee
                font-size .812rem
</style>