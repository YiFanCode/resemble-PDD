<template>
    <div class="select-login">
        <div class="bottom">
            <img src="./images/login_footer.png" width="160" alt="">
        </div>
        <h4>选择登录方式</h4>
        <router-link tag="button" to="/login">手机登录</router-link>
    </div>
</template>

<script>
export default {
    name:'SelectLogin'
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.select-login
    width 100%
    height 100%
    background #f5f5f5
    position fixed
    top 0
    left 0
    z-index 1000
    display flex
    flex-direction column
    justify-content center
    align-items center
    .buttom
        position fixed
        top 130px
        left 50%
        margin-left -100px
	button 
        width 80%
        height 38px
        background #e02e24 
        border none 
        border-radius 20px
        color #ffffff
        margin-top 30px
</style>
