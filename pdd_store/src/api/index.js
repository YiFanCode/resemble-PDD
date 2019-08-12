import ajax from './ajax'

// 定义基础路径
const BASE_URL = '/local_api';
// 请求方式

// 请求首页轮播图数据
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual');
// 请求首页导航数据
export const getHomeNav = () => ajax(BASE_URL + '/api/homenav');
// 请对商品列表数据
export const getHomeShopList = () => ajax(BASE_URL + '/api/homeshoplist')

//请求推荐列表数据 
const PDD_BASE_URL = '/api';
export const getRecShopList = (params) => ajax(PDD_BASE_URL, params);
// 搜索列表
export const getSearchgoods = () => ajax(BASE_URL + '/api/searchgoods');

// 获取短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', {phone});
// 手机验证码登录
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', {phone, code}, 'POST');
// 用户名和密码登录
export const pwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', {name, pwd, captcha}, 'POST');
// 自动登录
export const getUserInfo = () => ajax(BASE_URL + '/api/userinfo');
// 退出登录
export const getLogOut = () => ajax(BASE_URL + '/api/logout');