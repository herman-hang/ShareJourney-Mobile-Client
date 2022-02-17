<template>
	<view class="container">
		<!-- 导航开始 -->
		<view class="nav">
			<u-navbar title="共享旅途">
				<view class="u-nav-slot" slot="left" @click="toSelectDestination">
					<u--text v-if="site.ad_info.city" :text="site.ad_info.city" prefixIcon="map" bold></u--text>
					<u--text v-else text="定位中" prefixIcon="map"></u--text>
				</view>
			</u-navbar>
		</view>
		<!-- 导航结束 -->
		<view class="box">
			<view class="tabs-item"><u-tabs :scrollable="false" :list="tabs" @click="onTabs"></u-tabs></view>
			<map
				id="map"
				class="mapView"
				:style="{ width: screenWidth + 'px', height: screenHeight + 'px' }"
				:longitude="center[0]"
				:latitude="center[1]"
				:markers="markers"
				:enable-traffic="true"
				:show-location="true"
				@callouttap="toSelectDestination"
				@tap="tap"
			>
				<cover-image class="img" @click="getLocation(1)" src="../../static/image/map/position.png"></cover-image>
			</map>
			<!-- 地点选择开始 -->
			<view class="card">
				<view class="item" v-if="site.formatted_addresses.recommend">
					<view class="item-icon"><u--text text="●" type="success"></u--text></view>
					<u--text :lines="1" text="您将从"></u--text>
					<u--text :lines="1" type="primary" :text="site.formatted_addresses.recommend | stateFormat"></u--text>
					<u--text :lines="1" text="上车"></u--text>
					<u-icon name="arrow-right" size="16"></u-icon>
				</view>
				<view class="item" v-else>
					<view class="item-icon"><u--text text="●" type="success"></u--text></view>
					<u--text :lines="1" text="请选择上车地点"></u--text>
					<u-icon name="arrow-right" size="16"></u-icon>
				</view>
				<view class="item site-end" @click="toSelectDestination">
					<view class="item-icon"><u--text text="●" type="primary"></u--text></view>
					<u--text :lines="1" text="嗨~旅行去哪儿？" size="16"></u--text>
				</view>
			</view>
			<!-- 地点选择结束 -->
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
					<view class="item-box"><u-icon name="arrow-down-fill" size="10"></u-icon></view>
					<view class="item-box relation">
						<u-icon name="chat" color="#409eff" size="28"></u-icon>
						<u-icon name="phone" color="#409eff" size="28"></u-icon>
					</view>
				</view>
				<u-line></u-line>
				<view class="time-item">
					<view class="item-footer">
						<view class="time-item-text">
							<u-avatar src="/static/image/sex/man.png"></u-avatar>
							<u--text :lines="1" text="谢先生" bold></u--text>
							<u--text :lines="1" text="|" type="info"></u--text>
							<u--text :lines="1" text="接单99次"></u--text>
						</view>
						<view><u-button shape="circle" text="邀请车主"></u-button></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import QQMapWX from '../../static/js/qqmap/qqmap-wx-jssdk.min.js';
import { qqMapKey, qqMapSig } from '@/config.js';
export default {
	data() {
		return {
			// 当前设备屏幕的长度
			screenWidth: 0,
			// 当前设备屏幕的高度
			screenHeight: 0,
			// 地图中心点坐标，高德系经纬度
			center: [116.39742, 39.909],
			// 当前地址记录
			site: {
				formatted_addresses: {
					recommend: '正在获取当前位置...'
				}
			},
			// 标记点用于在地图上显示标记的位置
			markers: [
				{
					id: 0,
					longitude: 116.39742,
					latitude: 39.909,
					iconPath: '/static/image/map/location.png',
					width: 32,
					height: 32,
					callout: {
						content: '正在获取当前位置...', // 气泡上的地址文本
						color: '#ffffff', //文字颜色
						fontSize: 14, //文本大小
						borderRadius: 2, //边框圆角
						bgColor: '#000', //背景颜色
						display: 'ALWAYS', // 常显
						textAlign: 'center', // 文字中心对齐
						padding: 8, // 边缘距离
						borderRadius: 20 // callout边框圆角
					}
				}
			],
			// 顶部标签列表
			tabs: [
				{
					name: '旅客'
				},
				{
					name: '车主'
				}
			],
			// 标签默认索引（旅客）
			tabIndex: 0,
			// 倒计时数据
			timeData: {}
		};
	},
	onLoad() {
		var vm = this;
		// 获取设备信息
		uni.getSystemInfo({
			success: function(e) {
				vm.screenWidth = e.screenWidth;
				vm.screenHeight = e.screenHeight * 0.4;
			}
		});
		// 实例化腾讯地图API
		vm.qqmapsdk = new QQMapWX({
			key: qqMapKey
		});
	},
	onReady() {
		let vm = this;
		vm.map = uni.createMapContext('map', this);
		vm.getLocation(1);
	},
	methods: {
		/**
		 * 获取定位
		 */
		getLocation(type = 1) {
			let vm = this;
			vm.site.formatted_addresses.recommend = '正在获取当前位置...';
			// 获取当前的地理位置、速度。
			uni.getLocation({
				type: 'gcj02',
				isHighAccuracy: true,
				success: function(e) {
					vm.center = [e.longitude, e.latitude];
					vm.getSite(e.longitude, e.latitude);
					if (type === 0) {
						vm.addPosition(e.longitude, e.latitude);
					} else if (type === 1) {
						// 回到当前位置
						vm.map.moveToLocation({
							longitude: e.longitude,
							latitude: e.latitude
						});
						vm.addPosition(e.longitude, e.latitude);
					}
				}
			});
		},

		/**
		 * 添加定位点
		 */
		addPosition(longitude, latitude) {
			let vm = this;
			const markers = [
				{
					id: 0,
					longitude: longitude,
					latitude: latitude,
					iconPath: '/static/image/map/location.png',
					width: 32,
					height: 32,
					callout: {
						content: vm.site.formatted_addresses.recommend, // 气泡上的地址文本
						color: '#ffffff', //文字颜色
						fontSize: 14, //文本大小
						borderRadius: 2, //边框圆角
						bgColor: '#000', //背景颜色
						display: 'ALWAYS', // 常显
						textAlign: 'center', // 文字中心对齐
						padding: 8, // 边缘距离
						borderRadius: 20 // callout边框圆角
					}
				}
			];
			vm.markers = markers;
		},

		/**
		 * 点击地图触发
		 * @param {Object} e
		 */
		tap(e) {
			let vm = this;
			vm.center = [e.detail.longitude, e.detail.latitude];
			vm.getSite(e.detail.longitude, e.detail.latitude);
		},

		/**
		 * 获取城市地址
		 */
		getSite(longitude, latitude) {
			let vm = this;
			vm.qqmapsdk.reverseGeocoder({
				location: {
					longitude: longitude,
					latitude: latitude
				},
				sig: qqMapSig,
				success(res) {
					if (res.status === 0) {
						vm.site = res.result;
						vm.addPosition(longitude, latitude);
					}
				}
			});
		},

		/**
		 * 点击顶部标签栏
		 * @param {Object} index 索引:0为旅客 1为车主
		 */
		onTabs(index) {
			console.log(index);
		},

		/**
		 * 时间回调的值
		 * @param {Object} e
		 */
		onTimeChange(e) {
			let vm = this;
			vm.timeData = e;
		},

		/**
		 * 跳转到选择目的地
		 */
		toSelectDestination() {
			let vm = this;
			if (vm.site.ad_info.city === '' || vm.site.ad_info.city === null || vm.site.ad_info.city === undefined) {
				return vm.$app.toast('定位中...');
			}
			const item = JSON.stringify({
				city: vm.site.ad_info.city,
				address: vm.site.formatted_addresses.recommend,
				longitude: vm.markers[0].longitude,
				latitude: vm.markers[0].latitude
			});
			vm.$app.navTo('pages/index/destination?item=' + encodeURIComponent(item));
		}
	}
};
</script>

<style lang="scss" scoped>
cover-image {
	display: inline-block;
	border-radius: 25%;
	padding: 10rpx;
	background-color: #ffffff;
}
cover-view {
	top: 95%;
}
.img {
	position: absolute;
	width: 32rpx;
	height: 32rpx;
	right: 15rpx;
	top: 90%;
	box-shadow: 0px 0px 5px 1px #f6f6f6;
}
.item {
	margin: 20rpx;
	display: flex;
	/deep/ .u-text {
		flex: 0;
	}
}
.item-icon {
	margin: 10rpx;
}
.site-end {
	background-color: #f3f5f3;
	border-radius: 15rpx;
	padding: 20rpx 0;
}
.tabs-item {
	background-color: #ffffff;
}
.box {
	// #ifdef MP-WEIXIN
	margin-top: 150rpx;
	// #endif
	// #ifdef H5
	margin-top: 88rpx;
	// #endif
}
.u-nav-slot {
	display: flex;
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
</style>
