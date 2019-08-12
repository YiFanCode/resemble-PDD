<template>
  <div class="chat" v-if="userInfo._id">
    <!--头部区域-->
    <div class="header">
      <a href class="icon_back"></a>
      <h3>购物车</h3>
      <a href class="icon_menu"></a>
    </div>
    <!--安全提示-->
    <div class="jd_safe_tip">
      <p class="tip_word">您正在安全购物环境中，请放心购物</p>
    </div>
    <!--中间的列表-->
    <main class="jd_shopCart_list">
      <section>
        <div class="shopCart_list_con" v-for="(goods, index) in cartGoods" :key="index">
          <div class="list_con_left">
            <a href="javascript:;" class="cart_check_box" :checked="goods.checked" @click="singerGoodsSelected(goods)"></a>
          </div>
          <div class="list_con_right">
            <div class="shop_img">
              <img :src="goods.thumb_url" alt="">
            </div>
            <div class="shop_con">
              <a href>{{goods.goods_name}}</a>
              <p class="shop_price">{{goods.price / 100 | moneyForamt}}</p>
              <div class="shop_deal">
                <div class="shop_deal_left">
                  <span @click="updateGoodsCount(goods, false)">-</span>
                  <input disabled="disabled" v-model="goods.buy_count" type="tel" value="1">
                  <span @click="updateGoodsCount(goods, true)">+</span>
                </div>
                <div class="shop_deal_right" @click="clickTrash(goods)">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <!--底部通栏-->
    <div id="tab_bar">
      <div class="tab-bar-left">
        <a href="javascript:;" class="cart_check_box" :checked="isSelectedAll" @click.stop="selectedAll(isSelectedAll)"></a>
        <span style="font-size: 16px;">全选</span>
        <div class="select-all">合计：
          <span class="total-price">{{totalPrice | moneyForamt}}</span>
        </div>
      </div>
      <div class="tab-bar-right">
        <a href="#" class="pay">去结算</a>
      </div>
    </div>
  </div>
  <select-login v-else />
</template>

<script>
import {mapState} from 'vuex';
import SelectLogin from '@/page/Login/SelectLogin'
import {MessageBox} from 'mint-ui';

export default {
  name: "Cart",
  data(){
    return {
      isSelectedAll: false, // 是否选中所有商品
      totalPrice: 0, // 商品的总价格
      currentDelGoods: {} // 删除的商品
    }
  },
  components: {
    SelectLogin
  },
  computed: {
    ...mapState(['userInfo','cartGoods'])
  },
  methods:{
    // 单个商品的增加和减少
    updateGoodsCount(goods,isAdd){
      this.$store.dispatch('updateGoodsCount',{goods, isAdd});
      //计算商品的总价格
      this.getAllGoodsPrice();
    },
    // 单个商品的选中和取消选中
    singerGoodsSelected(goods){
      this.$store.dispatch('singerGoodsSelected', {goods});
      // 判断是否全选
      this.hasSelectedAll();
      // 计算商品的总价
      this.getAllGoodsPrice();
    },
    // 是否全选
    selectedAll(isSelected){
      // 总体控制
      this.isSelectedAll = !isSelected;
      this.$store.dispatch('selectedAll',{isSelected});
      // 计算商品的总价格
      this.getAllGoodsPrice();
    },
    // 判断是否全选
    hasSelectedAll(){
      let flag = true;
      // 遍历购物车的数据
      this.cartGoods.forEach((goods, index)=>{
        if(!goods.checked){
          flag = false;
        }
        console.log(this.cartGoods.length);
        // 赋值
        this.isSelectedAll = flag;
      })
    },
    // 计算商品的总价格
    getAllGoodsPrice(){
      let totalPrice = 0;
      // 遍历
      this.cartGoods.forEach((goods, index)=>{
        if(goods.checked){
          totalPrice += goods.price / 100 * goods.buy_count;
        }
      });
      // 赋值
      this.totalPrice = totalPrice;
    },
    // 点击垃圾篓
    clickTrash(goods){
      MessageBox.confirm('您确定删除该商品吗？').then((action)=>{
        if(action === 'confirm'){
          this.currentDelGoods = goods;
          this.$store.dispatch('delGoodsSinger', {goods});
          if(this.cartGoods.length === 0){
            this.isSelectedAll = false;
          } 
          // 计算商品的价格
          this.getAllGoodsPrice();
        }
      })
    }
  },
  filters:{
    moneyForamt(money){
      return '￥'+money.toFixed(2);
    }
  }
};
</script>


<style scoped lang="stylus" ref="stylesheet/stylus">
.chat {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;

  .header {
    width: 100%;
    height: 2.75rem;
    background: #ececec;
    -webkit-background-size: 1px 44px;
    background-size: 1px 44px;
    border-bottom: 1px solid #e0e0e0;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bolder;
    color: #E9232C;
    z-index: 999;
  }

  .jd_safe_tip {
    margin-top: 2.75rem;
    height: 2.25rem;
    line-height: 2.25rem;
    border-bottom: 1px solid #e0e0e0;
    background-color: #fff;
    text-align: center;

    .tip_word {
      display: inline-block;
      font-size: 0.75rem;
      padding-left: 1.25rem;
      position: relative;

      &:before {
        content: '';
        width: 18px;
        height: 18px;
        background: url('./images/safe_icon.png') no-repeat;
        -webkit-background-size: 18px 18px;
        background-size: 18px 18px;
        position: absolute;
        top: 0.562rem;
        left: 0;
      }
    }
  }

  .jd_shopCart_list {
    margin-bottom: 4rem;
    background-color: #e0e0e0;

    section {
      margin-top: 0.9375rem;
      border-top: 1px solid #e0e0e0;
      background-color: #fff;

      .shopCart_list_con {
        padding: 0.625rem 0;
        border-bottom: 1px solid #e0e0e0;

        .list_con_left {
          .cart_check_box {
            float: left;
            background: url('./images/shop-icon.png') no-repeat;
            -webkit-background-size: 50px 100px;
            background-size: 50px 100px;
            width: 20px;
            height: 20px;
            margin-top: 17px;
            margin-left: 7px;
          }

          .cart_check_box[checked] {
            background-position: -25px 0;
          }
        }

        .list_con_right {
          overflow: hidden;
          padding: 0 0.43rem;

          .shop_img {
            float: left;

            img {
              width: 5rem;
              height: 5rem;
              display: block;
            }
          }

          .shop_con {
            overflow: hidden;
            padding-left: 0.437rem;

            & > a {
              font-size: 0.812rem;
              color: #666;
              line-height: 1.25rem;
              height: 2.5rem;
              overflow: hidden;
              display: block;
              text-decoration: none;
            }

            .shop_price {
              color: #E9232C;
              margin-top: 0.312rem;
            }

            .shop_deal {
              margin-top: 0.312rem;

              .shop_deal_left {
                float: left;

                & > span {
                  border: 1px solid #e0e0e0;
                  display: inline-block;
                  width: 1.875rem;
                  height: 1.562rem;
                  line-height: 1.562rem;
                  text-align: center;
                  float: left;

                  &:first-child {
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                  }

                  &:last-child {
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                  }
                }

                input {
                  border: none;
                  border-top: 1px solid #e0e0e0;
                  border-bottom: 1px solid #e0e0e0;
                  float: left;
                  width: 3.125rem;
                  height: 1.562rem;
                  text-align: center;
                }
              }

              .shop_deal_right {
                float: right;

                & > span:first-child {
                  background: url('./images/delete_up.png') no-repeat;
                  background-size: 18px 4px;
                  width: 18px;
                  height: 4px;
                  display: block;
                }

                & > span:last-child {
                  background: url('./images/delete_down.png') no-repeat;
                  background-size: 17px 17px;
                  width: 17px;
                  height: 17px;
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }

  #tab_bar {
    position: fixed;
    left: 0;
    bottom: 3.125rem;
    width: 100%;
    height: 2.75rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -5px 5px #e0e0e0;
    border-bottom: 1px solid #e0e0e0;

    .tab-bar-left {
      display: flex;
      align-items: center;
      margin-left: 0.437rem;

      .cart_check_box {
        float: left;
        background: url('./images/shop-icon.png') no-repeat;
        -webkit-background-size: 50px 100px;
        background-size: 50px 100px;
        width: 1.25rem;
        height: 1.25rem;
        margin-top: 0.25rem;
        margin-left: 0.25rem;
      }

      .cart_check_box[checked] {
        background-position: -25px 0;
      }

      .select-all {
        margin-left: 0.5rem;
        font-size: 0.937rem;
      }
    }

    .tab-bar-right {
      .pay {
        width: 5.625rem;
        height: 2.75rem;
        background-color: #E9232C;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.937rem;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>