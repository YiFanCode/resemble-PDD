import {getHomeCasual, getHomeNav, getHomeShopList, getRecShopList, getSearchgoods, getUserInfo, getLogOut} from '@/api'
import {HOME_CASUAL, HOME_NAV, HOME_SHOP_LIST, REC_SHOP_LIST, SEARCH_GOODS, USER_INFO, RESET_USER_INFO, ADD_GOODS_COUNT, REDUCE_GOODS_COUNT, SELECTED_SINGER_GOODS, SELECTED_ALL_GOODS, DEL_SINGER_GOODS} from './mutation-types'

export default {
    //获取轮播图
    async reqHomeCasual({commit},callback){
        const result = await getHomeCasual();
        if(result.success_code === 200){
            commit(HOME_CASUAL,{home_casual: result.message});
            callback && callback();
        }
    },
    // 获取导航数据
    async reqHomeNav({commit},callback){
        const result = await getHomeNav();
        if(result.success_code === 200){
            commit(HOME_NAV,{home_nav: result.message});
            callback && callback();
        }
    },
    // 获取首页商品列表数据
    async reqHomeShopList({commit}, callback){
        const result = await getHomeShopList();
        if(result.success_code === 200){
            commit(HOME_SHOP_LIST, {home_shop_list: result.message});
            callback && callback();
        }
    },

    // 请求推荐的列表数据
    async reqRecShopList({commit}, params){
        const result = await getRecShopList(params);
        setTimeout(()=>{
            let scb = params.scb;
            let ecb = params.ecb;
            if(result.success === true){ // 成功
                commit(REC_SHOP_LIST, {rec_shop_list: result.data});
                scb && scb(result.data);
            }else{
                ecb && ecb('请求数据失败！');
            }
        },2000);
    },
    // 请求搜索数据
    async reqSearchgoods({commit}, callback){
        const result = await getSearchgoods();
        if(result.success_code === 200){
            commit(SEARCH_GOODS, {search_goods: result.message.data});
            callback && callback();
        }
    },
    //同步用户的信息
    syncUserInfo({commit}, userInfo){
        commit(USER_INFO, {userInfo});
    },
    // 获取用户信息
    async reqUserInfo({commit}, callback){
        const result =  await getUserInfo();
        if(result.success_code === 200){
            commit(USER_INFO,{userInfo: result.data})
        }
    },
    // 退出登录
    async logOut({commit}){
        const result = await getLogOut();
        if(result.success_code === 200){
            commit(RESET_USER_INFO);
        }
    },
    // 购物车单个商品的增加和减少
    updateGoodsCount({commit},{goods, isAdd}){
       if(isAdd){ // 增加
            commit(ADD_GOODS_COUNT, {goods});
       }else{// 减少
            commit(REDUCE_GOODS_COUNT, {goods})
       }
    },
    // 单个商品的选中和取消
    singerGoodsSelected({commit}, {goods}){
        commit(SELECTED_SINGER_GOODS, {goods});
    },
    // 全选和取消全选
    selectedAll({commit}, {isSelected}){
        commit(SELECTED_ALL_GOODS, {isSelected});
    },
    // 删除单个商品
    delGoodsSinger({commit},{goods}){
        commit(DEL_SINGER_GOODS, {goods});
    }
}