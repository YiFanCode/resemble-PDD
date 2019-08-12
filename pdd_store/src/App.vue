<template>
  <div id="app">
    <!-- 路由组件 -->
    <router-view></router-view>
    <!-- 底部选项卡 -->
    <TabBar v-show="$route.meta.showBottomTabBar"></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar/TabBar'
export default {
  name: 'App',
  components:{
    TabBar
  },
  mounted () {
    this.$store.dispatch('reqUserInfo');
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
#app {
  width 100%
  height 100%
  background  #f5f5f5
}
</style>
