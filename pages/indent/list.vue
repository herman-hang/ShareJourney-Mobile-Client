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
				<view class="box-item box-bottom">
					<view class="box-item-text">
						<u--text v-if="item.status === '1'" :lines="1" mode="price" :text="item.money" type="success"></u--text>
						<u--text v-else-if="item.status === '0'" :lines="1" text="待付款" type="error"></u--text>
						<u--text v-else-if="item.status === '2'" :lines="1" text="已取消" type="info"></u--text>
						<u--text v-else :lines="1" text="出发失败" type="error"></u--text>
					</view>
					<view class="box-item-text"><u-button shape="circle" size="mini" :plain="true" text="订单详情" @click="particulars(item)"></u-button></view>
				</view>
			</view>
		</view>

		<!-- 弹出层 -->
		<u-popup mode="center" :round="10" :show="isPathLine" @close="isPathLine = false">
			<view class="content">
				<u--text :lines="1" text="订单号" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" :text="indentData.indent"></u--text>
				<u--text :lines="1" text="出发地" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" :text="indentData.start"></u--text>
				<u--text :lines="1" text="目的地" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" :text="indentData.end"></u--text>
				<u--text :lines="1" text="公里数" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" :text="indentData.km"></u--text>
				<u--text :lines="1" text="出行费用" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" mode="price" :text="indentData.money"></u--text>
				<u--text :lines="1" text="支付类型" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" v-if="indentData.pay_type === '0'" text="微信"></u--text>
				<u--text :lines="1" lineHeight="30" v-else-if="indentData.pay_type === '1'" text="QQ"></u--text>
				<u--text :lines="1" lineHeight="30" v-else text="支付宝"></u--text>
				<u--text :lines="1" text="订单说明" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" :text="indentData.introduction"></u--text>
				<u--text :lines="1" text="创建时间" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" :text="indentData.create_time | date"></u--text>
				<u--text :lines="1" text="状态" type="info"></u--text>
				<u--text :lines="1" lineHeight="30" v-if="indentData.status === '0'" text="待付款"></u--text>
				<u--text :lines="1" lineHeight="30" v-else-if="indentData.status === '1'" text="已付款"></u--text>
				<u--text :lines="1" lineHeight="30" v-else-if="indentData.status === '2'" text="已取消"></u--text>
				<u--text :lines="1" lineHeight="30" v-else text="出行失败"></u--text>
			</view>
		</u-popup>

		<!-- 分割线 -->
		<u-divider v-if="isDataShow === true" text="已经到底啦~"></u-divider>
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
			},
			// 顶部的无数据分割线
			isDataShow: false,
			// 弹出层初始化
			isPathLine: false,
			// 订单是数据
			indentData: {
				money:"0.00"
			}
		};
	},
	onLoad() {
		this.getlistData();
	},
	onReachBottom() {
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
			if (res.data.data.length < this.queryInfo.per_page) {
				this.isDataShow = true;
			}
		},

		/**
		 * 订单详情
		 * @param {Object} item
		 */
		particulars(item) {
			this.indentData = item;
			this.isPathLine = true;
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
