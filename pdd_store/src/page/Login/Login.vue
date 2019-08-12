<template>
    <div class="login-container">
        <!-- 登录内容部分 -->
        <div class="login-inner">
            <!-- 面板头部 -->
            <div class="login-header">
                <div class="login-logo">
                    <img src="./images/login_footer.png" width="150" alt="">
                </div>
                <!-- 面板标题 -->
                <div class="login-header-title">
                    <a @click="dealLoginMode(true)" :class="{current: loginMode}" href="javascript:;">短信登录</a>
                    <a @click="dealLoginMode(false)" :class="{current: !loginMode}" href="javascript:;">密码登录</a>
                </div>
            </div>
            <!-- 面板表单部分 -->
            <div class="login-content">
                <form>
                    <!-- 手机验证码登录部分 -->
                    <div :class="{current: loginMode}">
                        <section class="login-message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <button 
                                class="get-verification"
                                v-if="!countDown"
                                :class="{phone_right: phoneRight}"
                                @click.prevent="getVerifyCode()">获取验证码</button>
                            <button v-else 
                                disabled="disabled"
                                class="get-verification">
                                已发送({{countDown}}s)
                            </button>
                        </section>
                        <section class="login-verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login-hint">
                            温馨提示：未注册PDD帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
                        </section>
                    </div>
                    <!-- 账号登录部分 -->
                    <div :class="{current: !loginMode}">
                        <section>
                            <section class="login-message">
                                <input type="tel" v-model="user_name" maxlength="11" placeholder="用户名">
                            </section>
                            <section class="login-verification">
                                <input type="password" maxlength="20" placeholder="密码" v-if="pwdMode" v-model="pwd">
                                <input type="text" maxlength="20" placeholder="密码" v-else v-model="pwd">
                                <div class="switch-show">
                                    <img @click.prevent="dealPwdMode(false)" :class="{on: pwdMode}" src="./images/hide_pwd.png" width="20" alt="">
                                    <img @click.prevent="dealPwdMode(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" width="20" alt="">
                                </div>
                            </section>
                            <section class="login-message">
                                <input type="text" v-model="captcha" maxlength="4" placeholder="验证码">
                                <img  class="get-verification" src="http://localhost:3000/api/captcha" alt="captcha" ref="captcha" @click.prevent="getCaptcha()">
                            </section>
                        </section>
                    </div>
                    <button @click.prevent="login()" class="login-submit">登录</button>
                </form>
                <button @click="$router.back()" class="login-back">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
import {getPhoneCode, phoneCodeLogin, pwdLogin} from './../../api/index'
import { Toast } from 'mint-ui';
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    data(){
        return{
            loginMode: true, //登录方式， true手机验证码登录， false账号登录 
            phone:'', // 手机号码
            countDown: 0, // 倒计时
            code: '', // 验证码
            user_name: '', // 用户名
            pwd: '', // 密码
            pwdMode: true, // 密码的显示方法， turue密文， false明文
            captcha: '', // 图形验证码
            userInfo: {}
        }
    },
    computed: {
        phoneRight(){
            return /^1[34578]\d{9}$/.test(this.phone);
        }
    },
    methods: {
        ...mapActions(['syncUserInfo']),
        // 处理登录的方式
        dealLoginMode(flag){
            this.loginMode = flag
        },
        // 获取短信验证码
        async getVerifyCode(){
            // 开启倒计时
            if(this.phoneRight){
                this.countDown = 60;
                // 设置定时器
                this.intervaalId = setInterval(()=>{
                    this.countDown--;
                    if(this.countDown === 0){
                        clearInterval(this.intervaalId);
                    }
                },1000);

                // 获取短信验证码
                const result = await getPhoneCode(this.phone);
                console.log(result)

                // 获取验证码失败
                if(result.error_code === 0){
                    Toast({
                        message : result.message,
                        position: 'center',
                        duration: 3000
                    })
                    // 后续处理
                    setTimeout(()=>{
                        clearInterval(this.intervaalId);
                        this.countDown = 0
                    }, 3000)
                }
            }
        },

        // 密码的显示方式
        dealPwdMode(flag){
            this.pwdMode = flag
        },

        // 获取图形验证码
        getCaptcha(){
            this.$refs.captcha.src = 'http://127.0.0.1:3000/api/captcha?time=' + new Date();
        },

        // 登录
        async login(){
            // 登录模式
            if(this.loginMode){ //验证码登录
                if(!this.phone){
                    Toast('请输入手机号码');
                    return;
                }else if(!this.phoneRight){
                    Toast('请输入正确的手机号码');
                    return;
                }

                if(!this.code){
                    Toast('请输入验证码')
                    return;
                }else if(!(/^\d{6}$/gi.test(this.code))){
                    Toast('请输入正确的验证码')
                    return;
                }

                // 手机验证码登录
                const result = await phoneCodeLogin(this.phone, this.code);
                console.log(result);
                if(result.success_code === 200){
                    this.userInfo = result.data;
                }else{
                    this.userInfo = {
                        message: '登录失败，手机号码或验证码不正确'
                    }
                }
            }else{ // 账号和密码的登录
                if(!this.user_name){
                    Toast('请输入用户名');
                    return;
                }else if(!this.pwd){
                    Toast('请输入密码');
                    return;
                }else if(!this.captcha){
                    Toast('请输入验证码');
                    return;
                }

                // 发起请求
                const result = await pwdLogin(this.user_name, this.pwd, this.captcha);
                console.log(result);
                if(result.success_code === 200){
                    this.userInfo = result.data;
                }else{
                    this.userInfo = {
                        message: '登录失败， 用户名和密码不正确'
                    }
                }
            }

            // 后续处理
            // console.log(this.userInfo);
            if(!this.userInfo._id){
                Toast(this.userInfo.message);
            }else {
                // 6.1 同步用户的信息
                this.syncUserInfo(this.userInfo);
                // 6.2 回到主界面
                this.$router.back();
            }
        }

    }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.login-container
    width 100%
    height 100%
    background #ffffff
    .login-inner
        padding-top 3.75rem
        width 80%
        margin 0 auto 
        .login-header
            .login-logo 
                font-size 2.5rem
                font-weight bold
                color #e02e24
                text-align center
            .login-header-title
                padding-top 2.5rem
                padding-bottom 0.625rem
                text-align center
                > a
                    color #333
                    font-size 0.875rem
                    padding-bottom 0.25rem
                    &:first-child
                        margin-right 2.5rem
                    &.current
                        color #e02e24
                        font-weight 700
                        border-bottom 0.125rem solid #e02e24
        .login-content
            > form 
                > div
                    display none 
                    &.current
                        display block
                    input 
                        width 100%
                        height 100%
                        padding-left 0.5rem
                        box-sizing border-box
                        border: 1px solid #ddd
                        border-radius 0.25rem
                        outline 0
                        font 400 14px Arial 
                        &:focus
                            border 1px solid #e02e24
                    .login-message
                        position relative
                        margin-top 1rem
                        height 3rem
                        font-size 0.875rem
                        background #ffffff
                        .get-verification
                            position absolute 
                            top 50%
                            right 10px
                            transform translateY(-50%)
                            border 0
                            color #cccccc
                            font-size 0.875rem
                            background transparent
                            &.phone_right
                                color #e02e24
                    .login-verification
                        position relative
                        margin-top 1rem
                        height 3rem
                        font-size 0.875rem
                        background #fff
                        .switch-show
                            position absolute 
                            right 0.625rem
                            top 0.75rem
                            img
                                display none 
                            img.on
                                display block
                    .login-hint
                        margin-top 0.75rem
                        color #999
                        font-size 0.75rem
                        line-height 1.25rem
                        > a
                            color #e02e24
                .login-submit
                    display block
                    width 100%
                    height 2.625rem
                    margin-top 1.875rem
                    border-radius 0.25rem
                    background #e02e24
                    color #ffffff
                    text-align center
                    font-size 1rem
                    line-height 2.625rem
                    border 0
        .login-back
            display block
            width 100%
            height 2.625rem
            margin-top 0.937rem
            border-radius 0.25rem
            background transparent
            border 1px solid #e02e24
            color #e02e24
            text-align center
            font-size 1rem
            line-height 2.625rem
</style>
