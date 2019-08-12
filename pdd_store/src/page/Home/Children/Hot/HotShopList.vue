<template>
    <div class="shop-container">
        <ul class="shop-list">
            <li class="shop-list-item" v-for="(shop,index) in homeshoplist.goods_list" :key="index">
                <img v-lazy="shop.image_url" width="100%" alt="">
                <h4 class="list-item-title">{{shop.goods_name}}</h4>
                <div class="list-item-bottom">
                    <div class="list-item-group-price">
                        <span class="list-item-price">{{shop.normal_price | priceFormat}}</span>
                        <span class="list-item-tip">{{shop.sales_tip}}</span>
                    </div>
                    <div class="list-item-gobuy">
                        <span class="item-user">
                            <img :src="user.avatar" alt="" v-for="(user, index) in shop.bubble" :key="index">
                        </span>
                        <button>去拼单</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'HotShopList',
    computed: {
        ...mapState(['homeshoplist'])
    },
    filters: {
        priceFormat(value){
            if (!value) return ''
            return '￥' + (value / 100) ;
        }
    }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
.shop-container
    background #f5f5f5
    margin-bottom 3.75rem
    .shop-list
        .shop-list-item
            margin-top .625rem
            background #ffffff
            display flex
            flex-direction column
            .list-item-title
                font-size .875rem
                padding .625rem
                line-height 1.2rem
            .list-item-bottom
                padding .625rem
                display flex
                flex-direction row
                justify-content space-between
                align-items center
                .list-item-group-price
                    display flex
                    justify-content space-between
                    align-items center
                    .list-item-price
                        font-size 1rem
                        font-weight bold
                        color #e9232c
                        margin-right .625rem
                    .list-item-tip
                        font-size: .625rem
                .list-item-gobuy
                    display flex
                    justify-content center
                    align-items center
                    .item-user
                        img 
                            width 1.25rem
                            border-radius 50%
                            vertical-align middle
                    button
                        width 4rem
                        height 1.4rem
                        background #e02e24
                        border-radius .25rem
                        margin-left .625rem
                        color #ffffff
                        font-size .75rem

</style>