<template>
    <div id="me" v-if="userInfo._id">
        <router-link tag="div" class="user" to="/detail">
            <img src="./images/me_icon.png" alt="">
            <p v-if="userInfo.phone">{{userInfo.phone | phoneFormat}}</p>
            <p>{{userInfo.name}}</p>
            <i class="itlike-3"></i>
        </router-link>
        <div class="my-older">
            <div class="older-top">
                <h3>我的订单</h3>
                <span>查看全部> </span>
            </div>
            <div class="older-bottom">
                <div class="bottom-item">
                    <i class="itlike-1"></i>
                    <span>代付款</span>
                </div>
                <div class="bottom-item">
                    <i class="itlike-2"></i>
                    <span>待分享</span>
                </div>
                <div class="bottom-item">
                    <i class="itlike-3"></i>
                    <span>待发货</span>
                </div>
                <div class="bottom-item">
                    <i class="itlike-4"></i>
                    <span>待收货</span>
                </div>
                <div class="bottom-item">
                    <i class="itlike-5"></i>
                    <span>待评价</span>
                </div>
            </div>
        </div>
        <div class="setting">
            <div class="setting-item">
                <i class="itlike-1"></i>
                <span>新人红包</span>
            </div>
            <div class="setting-item">
                <i class="itlike-2"></i>
                <span>多多果园</span>
            </div>
            <div class="setting-item">
                <i class="itlike-3"></i>
                <span>砍价免费拿</span>
            </div>
            <div class="setting-item">
                <i class="itlike-4"></i>
                <span>边逛边赚</span>
            </div>
            <div class="setting-item">
                <i class="itlike-5"></i>
                <span>天天领红包</span>
            </div>
            <div class="setting-item">
                <i class="itlike-uniE902"></i>
                <span>收货地址</span>
            </div>
            <div class="setting-item">
                <i class="itlike-1"></i>
                <span>我的评价</span>
            </div>
            <div class="setting-item">
                <i class="itlike-3"></i>
                <span>官方客服</span>
            </div>
            <div class="setting-item" @click.prevent="dealLogout()">
                <i class="itlike-4"></i>
                <span>退出</span>
            </div>
        </div>
    </div>
    <select-login v-else />
</template>

<script>
import { MessageBox } from 'mint-ui'
import {mapState, mapActions} from 'vuex';
import SelectLogin from './../Login/SelectLogin';

export default {
    name: 'Me',
    computed:{
        ...mapState(['userInfo'])
    },
    components:{
        SelectLogin
    },
    filters:{
        phoneFormat(phone){
            // 字符串转成数组
            let phoneArr = [...phone];
            console.log(phoneArr);
            // 遍历
            let str = '';
            phoneArr.forEach((item, index)=>{
                if(index === 3 || index === 4 || index === 5 || index === 6){
                    str += '*';
                }else{
                    str += item;
                }
            })
            // 返回结果
            return str 
        }
    },
    methods: {
        ...mapActions(['logOut']),
        dealLogout(){
            MessageBox.confirm('您确定要退出登录吗？').then((action)=>{
                // console.log(action);
                if(action === 'confirm'){
                    this.logOut();
                    // 返回到主界面
                    this.$router.replace('/home');
                }
            })
        }
    }

}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
#me
    width 100%
    height 100%
    .user
        display flex
        flex-direction row
        align-items center
        padding 1.25rem
        background #ffffff
        margin-bottom 0.625rem
        p
            margin  0 0.625rem
        img 
            width 3.75rem
            height 3.75rem
            border-radius 50%
        i 
            font-size 1.562rem
    .my-older
        background #ffffff
        .older-top
            display flex
            flex-direction row
            padding 0 0.625rem
            justify-content space-between
            height 44px
            line-height 44px
            font-size 0.937rem
        .older-bottom
            display  flex
            .bottom-item  
                flex 1
                height 3.75rem
                display flex
                flex-direction column
                justify-content center
                align-items center
                i
                    font-size 1.5rem
                    color #f9232c
                    margin-bottom 0.375rem
                span 
                    font-size 0.812rem
    .setting
        margin-top 0.625rem
        background #ffffff
        display flex
        justify-content space-between
        flex-wrap wrap
        .setting-item
            width 5.625rem
            height 4.375rem
            display flex
            flex-direction column
            justify-content center
            align-items center
            i 
                font-size 1.875rem
                color  orange
                margin-bottom 0.5rem
            span 
                font-size 0.8125rem
</style>