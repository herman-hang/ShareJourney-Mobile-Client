<template>
	<view class="container">
		<view class="card" v-for="(item, index) in listData" :key="index">
			<view class="box box-bottom">
				<view>
					<view class="box-item">
						<view class="box-item-text">
							<u--text text="●" type="primary"></u--text>
							<u--text :lines="1" :text="item.start | siteFormat"></u--text>
							<u--text type="info" :lines="1" text="(出发地)"></u--text>
						</view>
					</view>
					<view class="box-item" v-for="(passItem, key) in item.pass" :key="key" v-if="isPass === index">
						<view class="box-item-text">
							<u--text text="●" :type="passItem.end_id === 11 ? 'success' : 'warning'"></u--text>
							<u--text :lines="1" :text="passItem.end | siteFormat"></u--text>
							<u--text type="info" :lines="1" :text="passItem.arrival_time"></u--text>
						</view>
					</view>
					<view class="box-item" v-if="isPass !== index">
						<view class="box-item-text">
							<u--text text="●" type="success"></u--text>
							<u--text :lines="1" :text="item.end | siteFormat"></u--text>
							<u--text type="info" :lines="1" text="(目的地)"></u--text>
						</view>
					</view>
				</view>
				<view>
					<view class="box-item">
						<view class="box-item-text"><u-icon :name="isPass === index ? 'arrow-up' : 'arrow-down'" @click="spread(index)"></u-icon></view>
					</view>
				</view>
				<view>
					<view class="box-item">
						<view class="box-item-text">
							<u-tag text="拼车中" plain size="mini" type="success" v-if="item.status === '0'"></u-tag>
							<u-tag text="旅途中" plain size="mini" type="warning" v-else-if="item.status === '1'"></u-tag>
							<u-tag text="已满座" plain size="mini" type="error" v-else-if="item.status === '2'"></u-tag>
							<u-tag text="未满座" plain size="mini" type="success" v-else-if="item.status === '3'"></u-tag>
							<u-tag text="出发失败" plain size="mini" type="error" v-else-if="item.status === '4'"></u-tag>
							<u-tag text="已取消" plain size="mini" type="info" v-else-if="item.status === '5'"></u-tag>
							<u-tag text="已完成" plain size="mini" type="success" v-else></u-tag>
						</view>
					</view>
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
			// 底部分割线
			isDataShow: false,
			// 列表数据绑定
			listData: [],
			// 分页参数
			queryInfo: {
				//当前页码
				current_page: 1,
				//每页显示多少条数据
				per_page: 15,
				// 总页数
				total: 0
			},
			// 旅途经过地显示与隐藏
			isPass: -1
		};
	},
	onLoad() {},
	onShow() {
		let vm = this;
		vm.getlistData();
	},
	methods: {
		/**
		 * 获取列表数据
		 */
		async getlistData() {
			let vm = this;
			const { data: res } = await vm.$http.get('record/list', { params: vm.queryInfo });
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.queryInfo.total = res.data.total;
			vm.listData = vm.$app.getMoreListData(res.data.data, vm.listData, vm.queryInfo.current_page);
			if (res.data.data.length < vm.queryInfo.per_page) {
				vm.isDataShow = true;
			}
		},

		/**
		 * 经过地展开
		 */
		spread(index) {
			let vm = this;
			if (vm.isPass === index) {
				vm.isPass = -1;
			} else {
				vm.isPass = index;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
// #ifdef H5
.container {
	height: auto;
}
// #endif
.card {
	margin-bottom: 25rpx;
}
.box {
	margin: 20rpx 20rpx;
	.box-item {
		margin-bottom: 10rpx;
		.box-item-text {
			display: flex;
		}
	}
	/deep/ .u-text {
		flex: 0;
	}
}
.box-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20rpx;
}
.content {
	width: 500rpx;
	margin: 0 auto;
	height: auto;
	max-height: 500rpx;
	padding: 20rpx 20rpx;
	overflow: auto;
}
</style>
