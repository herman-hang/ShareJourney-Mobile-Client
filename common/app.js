import {
	baseUrl
} from '@/config.js';
import * as db from '../utils/db.js'
/**
 * @desc 加载更多列表数据
 * @param {Object} resList 新列表数据
 * @param {Object} oldList 旧列表数据
 * @param {int} pageNo 当前页码
 */
export const getMoreListData = (resList, oldList, pageNo) => {
	// 如果是第一页需手动制空列表
	if (pageNo == 1) oldList = []
	// 合并新数据
	return oldList.concat(resList)
}

/**
 * @desc 跳转
 */
export const navTo = (url) => {
	uni.navigateTo({
		url
	});
}

/**
 * @desc 上传文件
 * @type file:文件 image:图片
 */
export const uploadFilePromise = (url, type, suffix = 'base/upload', form = {}) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + suffix, // 仅为示例，非真实的接口地址
			filePath: url,
			name: type,
			header: {
				Authorization: uni.getStorageSync('token'),
				// #ifndef H5 || APP-PLUS
				'content-type': 'multipart/form-data',
				// #endif
			},
			formData: form,
			success: (res) => {
				setTimeout(() => {
					resolve(JSON.parse(res.data));
				}, 1000);
			}
		});
	});
}

/**
 * @desc 函数防抖
 * @param fn 函数
 * @param timerDelay 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (fn, timerDelay = 300, immediate = true) => {
	let timer;
	return function() {
		let that = this;
		let args = arguments;

		if (timer) clearTimeout(timer);
		if (immediate) {
			var callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, timerDelay)
			if (callNow) fn.apply(that, args)
		} else {
			timer = setTimeout(function() {
				fn.apply(that, args)
			}, timerDelay);
		}
	}
}

/**
 * @desc 检测是否登录
 */
export const checkToken = () => {
	if (!uni.getStorageSync('token')) {
		uni.navigateTo({
			url: '/pages/login/index'
		});
	}
}

/**
 * @desc 获取微信登录凭证code
 */
export const wechatLogin = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: res => {
				resolve(res.code);
			},
			fail: reject
		});
	});
}

/**
 * @desc 获取所有出发地点
 * siteArr 未过滤的所有地点数组
 */
export const getSite = (siteArr) => {
	let tempArr = [];
	for (let i = 0; i < siteArr.length; i++) {
		tempArr[i] = {
			id: siteArr[i].id,
			destination: siteArr[i].callout.content
		};
	}
	return tempArr;
}
