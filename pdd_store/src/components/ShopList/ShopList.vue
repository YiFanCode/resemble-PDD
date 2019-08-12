<template>
    <a class="recommend-item">
        <img v-lazy="item.image_url" width="100%" alt="">
        <h4 class="item-title">{{item.short_name}}</h4>
        <div class="item-bottom">
            <span class="item-price">{{item.price | priceFormat}}</span>
            <span class="item-sales">{{item.sales_tip}}</span>
            <button class="item-btn" @click="clickCellBtn(item.goods_id)">发现</button>
        </div>
    </a>
</template>

<script>
export default {
    name: "ShopList",
    props:{
        item: Object,
        clickCellBtn: {
            type: Function,
            default: ()=>{}
        }
    },
    filters: {
        priceFormat(value){
            if(!value) return ''
            return '￥'+ (value / 100);
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
.recommend-item:nth-child(2n-1)
    margin-right 1%
.recommend-item
    background-color #fff
    width 49%
    padding .75rem 0
    margin-bottom .625rem
    border-radius .18rem
    box-shadow 0 0.1rem 0.4rem rgba(0,0,0,.06)
    .item-title
        height 1.5rem
        line-height 1.5rem
        font-size .8125rem
        font-weight lighter 
        overflow hidden
        margin .5rem 0
        padding 0 .3125rem
    .item-bottom
        display flex
        flex-direction row
        align-items center
        padding 0 .3125rem
        .item-price
            flex 2
            color #e9232c
            font-weight bolder
            font-size .875rem
        .item-sales
            flex 4
            padding-left .3rem 
            color #666
            font-size .625rem
        .item-btn
            flex 2
            border 1px solid orangered
            height 1.4rem
            border-radius .4rem
            font-size .75rem
            background-color transparent 
            color #e9232c 
</style>