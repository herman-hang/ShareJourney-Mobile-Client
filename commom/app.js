/**
 * 加载更多列表数据
 * @param {Object} resList 新列表数据
 * @param {Object} oldList 旧列表数据
 * @param {int} pageNo 当前页码
 */
export const getMoreListData = (resList, oldList, pageNo) => {
	// 如果是第一页需手动制空列表
	if (pageNo == 1) oldList.data = []
	// 合并新数据
	return oldList.data.concat(resList.data)
}

/**
 * 跳转
 */
export const navTo = (url) => {
	uni.navigateTo({
		url
	});
}
