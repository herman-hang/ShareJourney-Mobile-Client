import Vue from 'vue'
import axios from 'axios'
import * as db from './db.js'
import {
	baseUrl
} from '../config.js'
//配置请求的根路径
axios.defaults.baseURL = baseUrl
// request拦截器,在请求之前做一些处理
axios.interceptors.request.use(config => {
		config.headers.Authorization = db.get('token')
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// response拦截器,在请求之后做一些处理
axios.interceptors.response.use(res => {
	if (res.data.code === 0) {
		// 删除token
		db.del('token')
		uni.showModal({
			title: '温馨提示',
			content: res.data.msg,
			showCancel: false,
			success() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			}
		})
	}
	if (res.data.code === 401) {
		return uni.showModal({
			title: '温馨提示',
			content: res.data.msg,
			showCancel: false,
			success() {
				uni.navigateTo({
					url: '/pages/certification/card/step-1'
				})
			}
		})
	}
	// 响应存在Authorization则更新token
	if (res.header.Authorization !== '' && res.header.Authorization !== null && res.header.Authorization !==
		undefined) {
		db.set('token', res.header.Authorization)
	}
	return res;
}, error => {
	return Promise.reject(error)
})

// 自己定义个适配器，用来适配uniapp的语法
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}
