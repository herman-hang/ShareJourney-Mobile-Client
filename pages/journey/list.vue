<template>
	<view class="container">
		<!-- 搜索框开始 -->
		<view class="card">
			<u-search
				placeholder="请输入出发地、目的地关键字"
				:actionStyle="{ color: '#409eff' }"
				@clear="clear"
				@blur="getAllIndent"
				@search="getAllIndent"
				@custom="getAllIndent"
				v-model="queryInfo.keywords"
				@change="getAllIndent"
			></u-search>
		</view>
		<!-- 搜索框结束 -->

		<!-- 列表开始 -->
		<view class="card" v-for="(item, index) in ownerListData" :key="index">
			<!-- 顶部倒计时开始 -->
			<view>
				<u-count-down :time="item.deadline * 1000" format="DD:HH:mm:ss" autoStart millisecond @finish="getAllIndent" @change="onTimeChange($event, index)">
					<view class="time">
						<view><text>距离结束：</text></view>
						<view class="time__custom">
							<text class="time__custom__item">{{ item.date.days }}天</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ item.date.hours > 10 ? item.date.hours : '0' + item.date.hours }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ item.date.minutes }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ item.date.seconds }}</text>
						</view>
					</view>
				</u-count-down>
			</view>
			<u-line></u-line>
			<!-- 顶部倒计时结束 -->

			<!-- 地点选择开始 -->
			<view class="time-item">
				<view class="item-box">
					<view class="time-item-text time-item-length">
						<u--text text="●" type="success"></u--text>
						<u--text :lines="1" :text="item.start | stateFormat"></u--text>
						<!-- <u--text type="info" :lines="1" size="12" text="100m"></u--text> -->
					</view>
					<view class="time-item-text time-item-length">
						<u--text text="●" type="primary"></u--text>
						<u--text :lines="1" :text="item.end | stateFormat"></u--text>
						<!-- <u--text type="info" :lines="1" size="12" text="1km"></u--text> -->
					</view>
				</view>
				<view class="item-box"><u-icon name="arrow-right" size="12" bold @click="getPathLineData(item.id)"></u-icon></view>
				<view class="item-box relation">
					<u-icon name="chat" color="#409eff" size="28" @click="navigateToChat"></u-icon>
					<u-icon name="phone" color="#409eff" size="28" @click="rindUp(item.mobile)"></u-icon>
				</view>
			</view>
			<!-- 地点选择结束 -->
			<u-line></u-line>
			<!-- 司机信息开始 -->
			<view class="time-item">
				<view class="item-footer">
					<view class="time-item-text">
						<u-avatar v-if="item.photo !== null" :src="item.photo"></u-avatar>
						<u-avatar v-else :text="item.name" randomBgColor></u-avatar>
						<u--text :lines="1" :text="item.name + '司机'" bold></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" :text="'接单' + item.indent_sum + '次'"></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" :text="'空' + item.number + '人'"></u--text>
					</view>
					<view><u-button shape="circle" text="呼叫车主" @click="callOwner(item)"></u-button></view>
				</view>
			</view>
			<!-- 司机信息结束 -->
		</view>
		<!-- 列表结束 -->

		<!-- 旅途轨迹线开始 -->
		<u-popup mode="center" :round="10" :show="isPathLine" @close="isPathLine = false">
			<view class="step">
				<u-steps :current="stepsSort" direction="column" :list="stepsData">
					<u-steps-item
						v-for="(item, index) in stepsData"
						:key="index"
						:title="item.title"
						:desc="item.status === null ? '出发地' : item.status === '0' ? '未达到' : '已达到' + '　' + item.arrival_time"
					></u-steps-item>
				</u-steps>
			</view>
		</u-popup>
		<!-- 旅途轨迹线结束 -->

		<!-- 车主列表底部分割线开始 -->
		<u-divider v-if="isDataShowOwner === true" text="已经到底啦~"></u-divider>
		<!-- 车主列表底部分割线结束 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 分页参数
			queryInfo: {
				//搜索关键字
				keywords: '',
				//当前页码
				current_page: 1,
				//每页显示多少条数据
				per_page: 10,
				// 总页数
				total: 0
			},
			// 车主列表数据
			ownerListData: [],
			// 车主列表数据是否加载完
			isDataShowOwner: false,
			// 轨迹线弹窗
			isPathLine: false,
			// 步骤条进行到的步骤
			stepsSort: '1',
			// 步骤条数据绑定
			stepsData: [],
			// 是否存在正在进行的旅途订单
			isJourneyIndent: false
		};
	},
	onLoad() {},
	onShow() {
		let vm = this;
		vm.checkIndentStatus();
		vm.getAllIndent();
	},
	onPullDownRefresh() {
		let vm = this;
		vm.getAllIndent();
	},
	onReachBottom() {
		let vm = this;
		if (vm.queryInfo.current_page < vm.queryInfo.total) {
			vm.queryInfo.current_page = vm.queryInfo.current_page + 1;
		}
		vm.getAllIndent();
	},
	methods: {
		/**
		 * 获取列表数据
		 */
		async getAllIndent() {
			let vm = this;
			const { data: res } = await vm.$http.get('journey/owner/indent/list', { params: vm.queryInfo });
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.queryInfo.total = res.data.total;
			vm.ownerListData = vm.$app.getMoreListData(res.data.data, vm.ownerListData, vm.queryInfo.current_page);
			if (res.data.data.length < vm.queryInfo.per_page) {
				vm.isDataShowOwner = true;
			}
		},

		/**
		 * 根据旅途信息ID获取轨迹线
		 * @param {Object} id
		 */
		async getPathLineData(id) {
			let vm = this;
			const token = uni.getStorageSync('token');
			if (token === '' || token === undefined || token === null) {
				return vm.$app.navTo('/pages/login/index');
			}
			const { data: res } = await vm.$http.get('index/path/line', { params: { id: id } });
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.stepsSort = res.data.sort;
			vm.stepsData = res.data.data;
			vm.isPathLine = true;
		},

		/**
		 * 拨打车主电话
		 * @param {Object} mobile
		 */
		rindUp(mobile) {
			let vm = this;
			const token = uni.getStorageSync('token');
			if (token === '' || token === undefined || token === null) {
				return vm.$app.navTo('/pages/login/index');
			}
			uni.makePhoneCall({
				phoneNumber: mobile
			});
		},

		/**
		 * 清空文本触发
		 */
		clear() {
			let vm = this;
			vm.queryInfo.keywords = '';
			vm.getAllIndent();
		},

		/**
		 * 时间回调的值
		 */
		onTimeChange(e, index) {
			let vm = this;
			vm.ownerListData[index].date = e;
		},

		/**
		 * 检测当前是否存在进行的订单
		 */
		async checkIndentStatus() {
			let vm = this;
			const token = uni.getStorageSync('token');
			if (token !== '' && token !== undefined && token !== null) {
				const { data: res } = await vm.$http.get('base/check/indent/status');
				if (res.code === 403) {
					vm.isJourneyIndent = true;
				} else {
					vm.isJourneyIndent = false;
				}
			}
		},

		/**
		 * 呼叫车主
		 * @param {Object} item 车主旅途的相关信息
		 */
		callOwner(item) {
			let vm = this;
			const token = uni.getStorageSync('token');
			if (token === '' || token === undefined || token === null) {
				return vm.$app.navTo('/pages/login/index');
			}
			vm.$message.confirm('确认要呼叫该车主吗？', function() {
				if (vm.isJourneyIndent) {
					return vm.$message.modal('您当前正在进行一个订单！');
				} else {
					vm.$app.navTo('/pages/index/call?item=' + encodeURIComponent(JSON.stringify(item)));
				}
			});
		},

		/**
		 * 跳转到聊天窗口
		 */
		navigateToChat() {
			this.$app.navTo('/pages/chat/private/chat');
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	margin: 20rpx;
	display: flex;
	/deep/ .u-text {
		flex: 0;
	}
}
.time-item {
	padding: 20rpx 0;
	display: flex;
	align-items: center;
	.time-item-text {
		display: flex;
		/deep/ .u-text {
			flex: 0;
		}
	}
	.time-item-length {
		width: 535rpx;
	}
	.relation {
		display: flex;
		margin-left: 20rpx;
	}
	.item-footer {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
}
.time {
	@include flex;
	align-items: center;
	padding: 10rpx 0;
	&__custom {
		margin-top: 4px;
		width: 22px;
		height: 22px;
		background-color: $uni-theme-color;
		border-radius: 4px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;

		&__item {
			color: #fff;
			font-size: 12px;
			text-align: center;
		}
	}

	&__doc {
		color: $uni-theme-color;
		padding: 0px 4px;
	}

	&__item {
		color: #606266;
		font-size: 15px;
		margin-right: 4px;
	}
}
.step {
	display: flex;
	justify-content: center;
	width: auto;
	margin: 0 auto;
	height: auto;
	max-height: 500rpx;
	padding: 20rpx 20rpx;
	overflow: auto;
}
</style>
