import Vue from 'vue'
//全局时间戳过滤器
Vue.filter('date', function(unixtime) {
	// 时间戳转换为日期时间 --年月日 时分秒
	var now = new Date(unixtime * 1000); // 依情况进行更改 * 1
	const y = now.getFullYear();
	const m = now.getMonth() + 1;
	const d = now.getDate();
	return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + now.toTimeString().substr(0,
		8);
})
