import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import {
	error
} from 'commom/app.js'
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log('当前路由:' + to.path);
	// 不需要检测登录的路由
	const noNeedLogin = [
		'/pages/login/login',
		'/pages/index/index',
		'/pages/message/list',
		'/pages/journey/list',
		'/pages/mine/index'
	];
	const token = uni.getStorageSync('token')
	if (to.path === '/pages/login/login') {
		// 访问登录路由，存在token直接跳转到首页
		if (token) {
			return next('/pages/index/index')
		}
	}
	if (!token) {
		if (noNeedLogin.indexOf(to.path) === -1) {
			error('登录超时，请重新登录！', function() {
				return next('/pages/login/login');
			})
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
