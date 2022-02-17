<template>
	<view class="container">
		<map
			id="map"
			class="mapView"
			:style="{ width: screenWidth + 'px', height: screenHeight + 'px' }"
			:markers="markers"
			:polyline="polyline"
			:enable-traffic="true"
			:show-location="true"
		>
			<view class="arrow" @click="toIndex"><u-icon bold name="arrow-left"></u-icon></view>
			<cover-image class="img" @click="moveToLocation()" src="../../static/image/map/position.png"></cover-image>
		</map>
		<!-- 地点选择开始 -->
		<view class="card">
			<view class="item">
				<view class="item-icon"><u--text text="●" type="success"></u--text></view>
				<u--text :lines="1" text="您将从"></u--text>
				<u--text :lines="1" type="primary" :text="site.start.address | stateFormat"></u--text>
				<u--text :lines="1" text="上车"></u--text>
				<u-icon name="arrow-right" size="16"></u-icon>
			</view>
			<view class="item site-end" @click="toSelectDestination">
				<view class="item-icon"><u--text text="●" type="primary"></u--text></view>
				<u--text :lines="1" text="我要再选择一个地点~" size="16"></u--text>
			</view>
		</view>
		<!-- 地点选择结束 -->

		<!-- 拼车价格信息开始 -->
		<view class="card">
			<view class="item">
				<view class="item-text">
					<u--text :lines="1" text="拼成价"></u--text>
					<u--text :lines="1" size="24" bold mode="price" text="58.5"></u--text>
					<u--text :lines="1" text="起"></u--text>
				</view>
			</view>
			<view class="hint">
				<view class="item-text"><u--text type="info" :lines="1" size="11" text="具体乘车优惠请与司机商量"></u--text></view>
			</view>
			<view class="item">
				<view class="item-text select">
					<u--text @click="showTimeSelect = true" site="12" :lines="1" text="选择出发时间"></u--text>
					<u--text type="info" margin="20rpx" site="12" :lines="1" text="|"></u--text>
					<u--text @click="showSelectPeople = true" site="12" :lines="1" text="选择出行人数"></u--text>
				</view>
			</view>
			<view class="item"><u-button type="primary" text="出发旅途"></u-button></view>
		</view>
		<!-- 拼车价格信息结束 -->
		<!-- 选择出发时间开始 -->
		<u-datetime-picker
			:minDate="1587524800000"
			:maxDate="1786778555000"
			:closeOnClickOverlay="true"
			title="最晚出发时间"
			:show="showTimeSelect"
			v-model="formData.deadline"
			mode="datetime"
			@close="closeSelectTime"
			@cancel="closeSelectTime"
			@confirm="confirmSelectTime"
		></u-datetime-picker>
		<!-- 选择出发时间结束 -->

		<!-- 选择出行人数开始 -->
		<u-popup :show="showSelectPeople" mode="bottom" :round="10" @close="closeSelectPeople" closeable>
			<view><text>出淤泥而不染，濯清涟而不妖</text></view>
		</u-popup>
		<!-- 选择出行人数结束 -->
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
			// 地图标记点
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
			// 路线规划
			polyline: [
				{
					points: [
						{
							latitude: 0,
							longitude: 0
						},
						{
							latitude: 0,
							longitude: 0
						}
					],
					color: '#409eff',
					width: 2
				}
			],
			// 出发地和目的地
			site: {
				start: {
					address: '正在获取当前位置...'
				},
				waypoints: ''
			},
			// 定义当前有几个地点，不能超过10个
			waypoints: 1,
			// 路线规划数据绑定
			directionData: {},
			// 选择出发时间显示与隐藏
			showTimeSelect: false,
			// 表单数据绑定
			formData: {
				deadline: '',
				money: 0.0,
				number: 0
			},
			// 选择出行人数的弹出层显示与隐藏
			showSelectPeople: false
		};
	},
	onLoad(option) {
		var vm = this;
		vm.init(option);
	},
	methods: {
		/**
		 * 初始化
		 */
		init(option) {
			var vm = this;
			vm.site = JSON.parse(decodeURIComponent(decodeURIComponent(option.item)));
			// 获取设备信息
			uni.getSystemInfo({
				success: function(e) {
					vm.screenWidth = e.screenWidth;
					vm.screenHeight = e.screenHeight * 0.6;
				}
			});
			vm.map = uni.createMapContext('map', this);
			// 实例化腾讯地图API
			vm.qqmapsdk = new QQMapWX({
				key: qqMapKey
			});
			// 定位回到当前位置
			vm.map.moveToLocation({
				longitude: vm.site.start.longitude,
				latitude: vm.site.start.latitude
			});
			vm.polyline = [
				{
					points: [],
					color: '#409eff',
					width: 5,
					arrowLine: true
				}
			];
			// 显示坐标图标
			vm.addPosition(vm.site.start.longitude, vm.site.start.latitude, vm.site.start.address, 0);
			vm.addPosition(vm.site.end.longitude, vm.site.end.latitude, vm.site.end.address, 12);
			// 路线规划
			vm.directions();
			// 获取最晚出发时间
			vm.getCurrentTime(2);
		},

		/**
		 * 回到原点
		 */
		moveToLocation() {
			let vm = this;
			// 回到当前位置
			vm.map.moveToLocation({
				longitude: vm.site.start.longitude,
				latitude: vm.site.start.latitude
			});
		},

		/**
		 * 回到首页
		 */
		toIndex() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},

		/**
		 * 添加定位点
		 */
		addPosition(longitude, latitude, site, id) {
			let vm = this,
				iconPath;
			if (id === 0) {
				iconPath = '/static/image/map/start.png';
			} else if (id === 12) {
				iconPath = '/static/image/map/end.png';
			} else {
				iconPath = '/static/image/map/location.png';
			}
			const markers = [
				{
					id: id,
					longitude: longitude,
					latitude: latitude,
					iconPath: iconPath,
					width: 32,
					height: 32,
					callout: {
						content: site, // 气泡上的地址文本
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
			vm.markers = vm.markers.concat(markers);
		},

		/**
		 * 再选择一个地点
		 */
		toSelectDestination() {
			let vm = this;
			if (vm.waypoints > 10) {
				return vm.$message.toast('地点不能超过10个');
			}
			uni.chooseLocation({
				success(res) {
					if (res.name === '' || res.name === null || res.name === undefined) {
						vm.$message.toast('请选择地点再确定');
						setTimeout(function() {
							vm.selectSite();
						}, 2000);
						return false;
					}
					if (vm.site.waypoints === '' || vm.site.waypoints === undefined || vm.site.waypoints === null) {
						vm.site.waypoints = res.latitude + ',' + res.longitude;
					} else {
						vm.site.waypoints = vm.site.waypoints + ';' + res.latitude + ',' + res.longitude;
					}
					// 追加坐标图标
					vm.addPosition(res.longitude, res.latitude, res.name, vm.waypoints);
					// 路线规划
					vm.directions(1);
				}
			});
		},

		/**
		 * 路线规划
		 */
		directions(type = 0) {
			let vm = this;
			if (type === 0) {
				vm.qqmapsdk.direction({
					mode: 'driving',
					from: {
						latitude: vm.site.start.latitude,
						longitude: vm.site.start.longitude
					},
					to: {
						latitude: vm.site.end.latitude,
						longitude: vm.site.end.longitude
					},
					sig: qqMapSig,
					success(res) {
						if (res.status === 0) {
							vm.directionData = res.result;
							vm.setPolyline(res.result.routes[0].polyline);
						}
					}
				});
			} else {
				vm.qqmapsdk.direction({
					mode: 'driving',
					from: {
						latitude: vm.site.start.latitude,
						longitude: vm.site.start.longitude
					},
					to: {
						latitude: vm.site.end.latitude,
						longitude: vm.site.end.longitude
					},
					sig: qqMapSig,
					waypoints: vm.site.waypoints,
					success(res) {
						if (res.status === 0) {
							vm.directionData = res.result;
							vm.setPolyline(res.result.routes[0].polyline);
							vm.waypoints++;
						}
					}
				});
			}
		},

		/**
		 * polyline 坐标解压并赋值
		 * @param {Object} coors 方案路线坐标点串
		 */
		setPolyline(coors) {
			let vm = this,
				tempArr = [];
			vm.polyline[0].points = [];
			//坐标解压（返回的点串坐标，通过前向差分进行压缩）
			for (let i = 2; i < coors.length; i++) {
				coors[i] = coors[i - 2] + coors[i] / 1000000;
			}
			//将解压后的坐标放入点串数组polyline中
			for (let i = 0; i < coors.length; i += 2) {
				tempArr.push({ latitude: coors[i], longitude: coors[i + 1] });
			}
			vm.polyline[0].points = tempArr;
			vm.includePoints();
		},

		/**
		 * 地图自动缩放
		 */
		includePoints() {
			let vm = this;
			vm.map.includePoints({
				padding: [70, 70, 70, 70],
				points: vm.polyline[0].points
			});
		},

		/**
		 * 获取当前时间的后二天
		 */
		getCurrentTime(day) {
			//获取当前时间并打印
			var vm = this;
			let yy = new Date().getFullYear();
			let mm = new Date().getMonth() + 1;
			let dd = new Date().getDate() + day;
			let hh = new Date().getHours();
			let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
			vm.formData.deadline = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
		},

		/**
		 * 关闭选择最晚出发时间
		 */
		closeSelectTime() {
			let vm = this;
			vm.showTimeSelect = false;
		},

		/**
		 * 选择最晚出发时间确定按钮
		 * @param {Object} time
		 */
		confirmSelectTime(e) {
			let vm = this;
			vm.formData.deadline = vm.$options.filters.timestamp(e.value);
			vm.showTimeSelect = false;
		},

		/**
		 * 关闭选择出行人数弹出层
		 */
		closeSelectPeople() {
			let vm = this;
			vm.showSelectPeople = false;
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
.arrow {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ffffff;
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	margin: 100rpx 0 0 30rpx;
	box-shadow: 0px 0px 5px 1px #f6f6f6;
}
.img {
	position: absolute;
	width: 32rpx;
	height: 32rpx;
	right: 15rpx;
	top: 93%;
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
.item-text {
	display: flex;
	width: 100%;
	justify-content: center;
	/deep/ .u-text {
		flex: 0;
		padding-right: 10rpx;
	}
}
.hint {
	margin: -25rpx 20rpx 20rpx 20rpx;
	display: flex;
	/deep/ .u-text {
		flex: 0;
	}
}
.select {
	margin-top: 30rpx;
}
</style>
