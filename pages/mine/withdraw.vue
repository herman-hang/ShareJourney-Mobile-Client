<template>
	<view class="container">
		<view class="card">
			<view class="box" v-for="(item, index) in listData" :key="index">
				<view class="avatar">
					<u-avatar v-if="item.status === '1'" bg-color="#4cd964" text="通过" fontSize="15"></u-avatar>
					<u-avatar v-else-if="item.status === '0'" text="审核" fontSize="15"></u-avatar>
					<u-avatar @click="resubmit(item)" v-else bg-color="#dd524d" text="驳回" fontSize="15"></u-avatar>
				</view>
				<view class="box-item">
					<view>
						<u--text v-if="item.status === '1'" :lines="1" text="您有一笔提现金额审核已经通过"></u--text>
						<u--text v-else-if="item.status === '0'" :lines="1" text="您有一笔提现金额正在审核"></u--text>
						<u--text v-else :lines="1" text="您有一笔提现金额已经被驳回"></u--text>
						<u--text v-if="item.status !== '2'" :lines="1" lineHeight="20" size="12" type="info" :text="item.create_time"></u--text>
						<u--text v-else :lines="1" lineHeight="20" size="12" type="error" :text="'原因：' + item.cause"></u--text>
					</view>
					<view><u--text :text="'-' + item.money" bold></u--text></view>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<u-divider v-if="isDataShow === true" text="已经到底啦~"></u-divider>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 底部分割线初始化
			isDataShow: false,
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
			const { data: res } = await vm.$http.get('mine/withdraw/detail', { params: vm.queryInfo });
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.queryInfo.total = res.data.total;
			vm.listData = vm.$app.getMoreListData(res.data.data, vm.listData, vm.queryInfo.current_page);
			if (res.data.data.length < vm.queryInfo.per_page) {
				vm.isDataShow = true;
			}
		},

		/**
		 * 重新提交审核
		 */
		resubmit(item) {
			let vm = this;
			vm.$message.confirm('您需要重新提交审核吗？', async function() {
				const { data: res } = await vm.$http.get('mine/withdraw/resubmit/audit', { params: { id: item.id } });
				if (res.code !== 200) return vm.$message.toast(res.msg);
				vm.$message.toast(res.msg);
				vm.getListData();
			});
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
