import Vue from 'vue'
/**
 * 通用格式化
 * @param {Object} cellValue
 */
Vue.filter('stateFormat', function(cellValue) {
	if (!cellValue) return '';
	if (cellValue.length > 13) {
		//最长固定显示9个字符
		return cellValue.slice(0, 5) + '...' + cellValue.slice(cellValue.length - 8, cellValue.length);
	}
	return cellValue;
})

/**
 * 订单进行地点格式化
 * @param {Object} cellValue
 */
Vue.filter('siteFormat', function(cellValue) {
	if (!cellValue) return '';
	if (cellValue.length > 10) {
		//最长固定显示9个字符
		return cellValue.slice(0, 5) + '...' + cellValue.slice(cellValue.length - 4, cellValue.length);
	}
	return cellValue;
})