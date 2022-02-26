<template>
	<view class="container">
		<!-- 搜索框开始 -->
		<view class="card"><u-search placeholder="请输入关键字"></u-search></view>
		<!-- 搜索框结束 -->

		<!-- 旅客订单列表开始 -->
		<view class="card">
			<!-- 顶部倒计时开始 -->
			<view>
				<u-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" autoStart millisecond @change="onTimeChange">
					<view class="time">
						<view><text>距离结束：</text></view>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.days }}天</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.minutes }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.seconds }}</text>
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
						<u--text text="●" type="primary"></u--text>
						<u--text :lines="1" :text="'北京东路1北京东路北京东路号' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="100m"></u--text>
					</view>
					<view class="time-item-text time-item-length">
						<u--text text="●" type="success"></u--text>
						<u--text :lines="1" :text="'广州市科学城创意大夏B2' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="1km"></u--text>
					</view>
				</view>
				<view class="item-box"><u-icon name="arrow-right" size="12" bold></u-icon></view>
				<view class="item-box relation">
					<u-icon name="chat" color="#409eff" size="28"></u-icon>
					<u-icon name="phone" color="#409eff" size="28"></u-icon>
				</view>
			</view>
			<!-- 地点选择结束 -->
			<u-line></u-line>
			<!-- 司机信息开始 -->
			<view class="time-item">
				<view class="item-footer">
					<view class="time-item-text">
						<u-avatar src="/static/image/sex/man.png"></u-avatar>
						<u--text :lines="1" text="谢先生" bold></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" text="接单99次"></u--text>
					</view>
					<view><u-button shape="circle" text="呼叫车主"></u-button></view>
				</view>
			</view>
			<!-- 司机信息结束 -->
		</view>
		<!-- 旅客订单列表结束 -->

		<!-- 旅客订单列表开始 -->
		<view class="card">
			<!-- 顶部倒计时开始 -->
			<view>
				<u-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" autoStart millisecond @change="onTimeChange">
					<view class="time">
						<view><text>距离结束：</text></view>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.days }}天</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.minutes }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.seconds }}</text>
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
						<u--text text="●" type="primary"></u--text>
						<u--text :lines="1" :text="'北京东路1北京东路北京东路号' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="100m"></u--text>
					</view>
					<view class="time-item-text time-item-length">
						<u--text text="●" type="success"></u--text>
						<u--text :lines="1" :text="'广州市科学城创意大夏B2' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="1km"></u--text>
					</view>
				</view>
				<view class="item-box"><u-icon name="arrow-right" size="12" bold></u-icon></view>
				<view class="item-box relation">
					<u-icon name="chat" color="#409eff" size="28"></u-icon>
					<u-icon name="phone" color="#409eff" size="28"></u-icon>
				</view>
			</view>
			<!-- 地点选择结束 -->
			<u-line></u-line>
			<!-- 司机信息开始 -->
			<view class="time-item">
				<view class="item-footer">
					<view class="time-item-text">
						<u-avatar src="/static/image/sex/man.png"></u-avatar>
						<u--text :lines="1" text="谢先生" bold></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" text="接单99次"></u--text>
					</view>
					<view><u-button shape="circle" text="呼叫车主"></u-button></view>
				</view>
			</view>
			<!-- 司机信息结束 -->
		</view>
		<!-- 旅客订单列表结束 -->

		<!-- 旅客订单列表开始 -->
		<view class="card">
			<!-- 顶部倒计时开始 -->
			<view>
				<u-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" autoStart millisecond @change="onTimeChange">
					<view class="time">
						<view><text>距离结束：</text></view>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.days }}天</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.minutes }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.seconds }}</text>
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
						<u--text text="●" type="primary"></u--text>
						<u--text :lines="1" :text="'北京东路1北京东路北京东路号' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="100m"></u--text>
					</view>
					<view class="time-item-text time-item-length">
						<u--text text="●" type="success"></u--text>
						<u--text :lines="1" :text="'广州市科学城创意大夏B2' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="1km"></u--text>
					</view>
				</view>
				<view class="item-box"><u-icon name="arrow-right" size="12" bold></u-icon></view>
				<view class="item-box relation">
					<u-icon name="chat" color="#409eff" size="28"></u-icon>
					<u-icon name="phone" color="#409eff" size="28"></u-icon>
				</view>
			</view>
			<!-- 地点选择结束 -->
			<u-line></u-line>
			<!-- 司机信息开始 -->
			<view class="time-item">
				<view class="item-footer">
					<view class="time-item-text">
						<u-avatar src="/static/image/sex/man.png"></u-avatar>
						<u--text :lines="1" text="谢先生" bold></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" text="接单99次"></u--text>
					</view>
					<view><u-button shape="circle" text="呼叫车主"></u-button></view>
				</view>
			</view>
			<!-- 司机信息结束 -->
		</view>
		<!-- 旅客订单列表结束 -->

		<!-- 旅客订单列表开始 -->
		<view class="card">
			<!-- 顶部倒计时开始 -->
			<view>
				<u-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" autoStart millisecond @change="onTimeChange">
					<view class="time">
						<view><text>距离结束：</text></view>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.days }}天</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.minutes }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.seconds }}</text>
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
						<u--text text="●" type="primary"></u--text>
						<u--text :lines="1" :text="'北京东路1北京东路北京东路号' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="100m"></u--text>
					</view>
					<view class="time-item-text time-item-length">
						<u--text text="●" type="success"></u--text>
						<u--text :lines="1" :text="'广州市科学城创意大夏B2' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="1km"></u--text>
					</view>
				</view>
				<view class="item-box"><u-icon name="arrow-right" size="12" bold></u-icon></view>
				<view class="item-box relation">
					<u-icon name="chat" color="#409eff" size="28"></u-icon>
					<u-icon name="phone" color="#409eff" size="28"></u-icon>
				</view>
			</view>
			<!-- 地点选择结束 -->
			<u-line></u-line>
			<!-- 司机信息开始 -->
			<view class="time-item">
				<view class="item-footer">
					<view class="time-item-text">
						<u-avatar src="/static/image/sex/man.png"></u-avatar>
						<u--text :lines="1" text="谢先生" bold></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" text="接单99次"></u--text>
					</view>
					<view><u-button shape="circle" text="呼叫车主"></u-button></view>
				</view>
			</view>
			<!-- 司机信息结束 -->
		</view>
		<!-- 旅客订单列表结束 -->

		<!-- 旅客订单列表开始 -->
		<view class="card">
			<!-- 顶部倒计时开始 -->
			<view>
				<u-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" autoStart millisecond @change="onTimeChange">
					<view class="time">
						<view><text>距离结束：</text></view>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.days }}天</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.minutes }}</text>
						</view>
						<text class="time__doc">:</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.seconds }}</text>
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
						<u--text text="●" type="primary"></u--text>
						<u--text :lines="1" :text="'北京东路1北京东路北京东路号' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="100m"></u--text>
					</view>
					<view class="time-item-text time-item-length">
						<u--text text="●" type="success"></u--text>
						<u--text :lines="1" :text="'广州市科学城创意大夏B2' | stateFormat"></u--text>
						<u--text type="info" :lines="1" size="12" text="1km"></u--text>
					</view>
				</view>
				<view class="item-box"><u-icon name="arrow-right" size="12" bold></u-icon></view>
				<view class="item-box relation">
					<u-icon name="chat" color="#409eff" size="28"></u-icon>
					<u-icon name="phone" color="#409eff" size="28"></u-icon>
				</view>
			</view>
			<!-- 地点选择结束 -->
			<u-line></u-line>
			<!-- 司机信息开始 -->
			<view class="time-item">
				<view class="item-footer">
					<view class="time-item-text">
						<u-avatar src="/static/image/sex/man.png"></u-avatar>
						<u--text :lines="1" text="谢先生" bold></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" text="接单99次"></u--text>
					</view>
					<view><u-button shape="circle" text="呼叫车主"></u-button></view>
				</view>
			</view>
			<!-- 司机信息结束 -->
		</view>
		<!-- 旅客订单列表结束 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 倒计时数据
			timeData: {}
		};
	},
	onLoad() {},
	methods: {
		/**
		 * 时间回调的值
		 * @param {Object} e
		 */
		onTimeChange(e) {
			let vm = this;
			vm.timeData = e;
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
			padding-right: 10rpx;
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
</style>
