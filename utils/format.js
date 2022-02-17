import Vue from 'vue'
Vue.filter('stateFormat', function(cellValue) {
	if (!cellValue) return '';
	if (cellValue.length > 13) {
		//最长固定显示9个字符
		return cellValue.slice(0, 5) + '...' + cellValue.slice(cellValue.length - 8, cellValue.length);
	}
	return cellValue;
})
