<template>
	<view class="container">
		<view v-if="listData.length !== 0" class="card" v-for="(item, index) in listData" :key="index">
			<view class="box">
				<view class="box-item"><u--text type="info" :lines="1" :text="item.create_time | date"></u--text></view>
				<view class="box-item">
					<view class="box-item-text">
						<u--text text="●" type="primary"></u--text>
						<u--text :lines="1" :text="item.start"></u--text>
					</view>
				</view>
				<view class="box-item">
					<view class="box-item-text">
						<u--text text="●" type="success"></u--text>
						<u--text :lines="1" :text="item.end"></u--text>
					</view>
				</view>
				<u-line></u-line>
				<view class="box-item">
					<view class="box-item-text box-item-bottom">
						<u--text v-if="item.status === '1'" :lines="1" mode="price" :text="item.money" type="success"></u--text>
						<u--text v-else :lines="1" text="未付款" type="error"></u--text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="listData.length === 0" class="card"><u-divider text="无数据" :hairline="true"></u-divider></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 列表数据绑定
			listData: [],
			// 分页参数
			queryInfo: {
				//当前页码
				current_page: 1,
				//每页显示多少条数据
				per_page: 6,
				// 总页数
				total: 0
			}
		};
	},
	onLoad() {
		this.getlistData();
	},
	onReachBottom() {
		const oldList = this.listData;
		if (this.queryInfo.current_page < this.queryInfo.total) {
			this.queryInfo.current_page = this.queryInfo.current_page + 1;
			this.getlistData();
		}
	},
	methods: {
		/**
		 * 获取列表数据
		 */
		async getlistData() {
			const { data: res } = await this.$http.get('mine/indent/list', { params: this.queryInfo });
			if (res.code !== 200) return this.$message.toast(res.msg);
			this.queryInfo.total = res.data.total;
			this.listData = this.$app.getMoreListData(res.data.data, this.listData, this.queryInfo.current_page);
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
		.box-item-bottom {
			margin-top: 20rpx;
		}
	}
	/deep/ .u-text {
		flex: 0;
	}
}
</style>
