import App from './App'
import Vue from 'vue'
import axios from 'axios'

import * as core from 'commom/app.js'
// 请求拦截器和响应器
import './utils/request.js'
import * as db from './utils/db.js'
// 时间过滤器
import './utils/filter.js'
import * as message from './utils/message.js'
//挂载到原型对象上
Vue.prototype.$db = db
Vue.prototype.$app = core
Vue.prototype.$http = axios
Vue.prototype.$message = message
import {
	router,
	RouterMount
} from 'router.js'
Vue.use(router)


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
