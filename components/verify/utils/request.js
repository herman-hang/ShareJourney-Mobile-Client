import {
	baseUrl
} from '../../../config.js'
export const myRequest = (option = {}) => {
	return new Promise((reslove, reject) => {
		uni.request({
			url: baseUrl + option.url,
			data: option.data,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			method: option.method || "GET",
			success: (result) => {
				reslove(result)
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}
