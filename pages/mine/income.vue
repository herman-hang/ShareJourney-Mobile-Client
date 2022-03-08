<template>
	<view class="container">
		<view class="card">
			<view class="box" v-for="(item, index) in listData" :key="index">
				<view class="avatar">
					<u-avatar v-if="item.owner_id !== null" bg-color="#4cd964" text="收入" fontSize="15"></u-avatar>
					<u-avatar v-else bg-color="#dd524d" text="支出" fontSize="15"></u-avatar>
				</view>
				<view class="box-item">
					<view>
						<u--text v-if="item.owner_id !== null" :lines="1" :text="'用户ID:' + item.user_id + '支付出行车费给您'"></u--text>
						<u--text v-else :lines="1" :text="'您支付了一笔出行车费给车主'"></u--text>
						<u--text :lines="1" lineHeight="20" size="12" type="info" :text="item.create_time"></u--text>
					</view>
					<view>
						<u--text :type="item.owner_id !== null ? 'warning' : ''" :text="item.owner_id !== null ? '+' + item.collection_money : '-' + item.money" bold></u--text>
					</view>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<u-divider v-if="isDataShowLine === true" text="已经到底啦~"></u-divider>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 底部分割线初始化
			isDataShowLine: false,
			// 分页参数
			queryInfo: {
				//当前页码
				current_page: 1,
				//每页显示多少条数据
				per_page: 25,
				// 总页数
				total: 0
			},
			// 列表数据绑定
			listData: []
		};
	},
	onLoad() {
		let vm = this;
		vm.getListData();
	},
	methods: {
		/**
		 * 获取列表数据
		 */
		async getListData() {
			let vm = this;
			const { data: res } = await vm.$http.get('mine/bill/income', { params: vm.queryInfo });
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.queryInfo.total = res.data.total;
			vm.listData = vm.$app.getMoreListData(res.data.data, vm.listData, vm.queryInfo.current_page);
			if (res.data.data.length < vm.queryInfo.per_page) {
				vm.isDataShowLine = true;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.box {
	display: flex;
	align-items: center;
	margin: 10rpx 0;
	border-bottom: 1px solid #dcdfe6;
}
.avatar {
	margin: 0 10rpx 10rpx 0;
}
.box-item {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
}
</style>
