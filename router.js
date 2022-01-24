import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log('当前路由:' + to.path);
	// 不需要检测登录的路由
	const noNeedLogin = [
		'/pages/login/login', // 登录
		'/pages/login/index', // 授权登录
		'/pages/index/index', // 首页
		'/pages/message/list', // 消息列表
		'/pages/journey/list', // 旅途列表
		'/pages/mine/index', // 我的
		'/pages/register/register', // 注册页面
		'/pages/password/password', // 找回密码
		'/pages/login/agreement', // 用户服务协议
		'/pages/login/policy', // 隐私政策
		'/pages/login/bind', // 绑定手机
	];
	const token = uni.getStorageSync('token')
	if (to.path === '/pages/login/login' || to.path === '/pages/register/register' || to.path ===
		'/pages/password/password' || to.path === '/pages/login/index' || to.path === '/pages/login/bind') {
		// 存在token直接跳转到首页
		if (token) {
			return next('/pages/index/index')
		}
	}
	if (!token) {
		if (noNeedLogin.indexOf(to.path) === -1) {
			return next('/pages/login/index');
		}
	}
	next();
});
// 全局路由后置守卫
// router.afterEach((to, from) => {
// 	console.log('跳转结束')
// })

export {
	router,
	RouterMount
}
