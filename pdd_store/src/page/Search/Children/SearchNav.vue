<template>
    <div class="search-nav">
        <a class="search-nav-icon" @click="showSearchPanel(true)">
            <img src="../images/search.png" alt="" width="25">
            <span>iPhone X国行正品带票</span>
        </a>
    </div>
</template>

<script>
export default {
    name: 'SearchNav',
    props:{
        showSearchPanel:Function
    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.search-nav 
    width 100%
    height 3.75rem
    background #ffffff
    border-bottom 1px solid #cccccc
    position fixed
    top 0
    left 0
    z-index 998
    display flex
    justify-content center
    align-items center
    .search-nav-icon
        width 90%
        height 60%
        background #e8e8e8
        border-radius .625rem
        display flex
        justify-content center
        align-items center
        span 
            color #aaaaaa
            margin-left .375rem
            font-size 0.937rem
            font-weight lighter 
</style>