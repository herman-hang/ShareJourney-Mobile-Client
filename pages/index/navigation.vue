<template>
	<view class="container">
		<!-- 地图开始 -->
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
			<cover-image class="third" @click="openMap()" src="../../static/image/map/third.png"></cover-image>
		</map>
		<!-- 地图结束 -->
		<!-- 车主和旅客信息开始 -->
		<view class="card">
			<view class="time-item">
				<view class="time-item-header">
					<u--text :lines="1" text="当前:" bold></u--text>
					<u--text type="primary" :lines="1" :text="journeyData.start | siteFormat"></u--text>
					<u-icon name="arrow-right-double"></u-icon>
					<u--text type="primary" :lines="1" :text="journeyData.end | siteFormat"></u--text>
				</view>
			</view>
			<u-line></u-line>
			<view class="time-item">
				<view class="item-footer">
					<view class="time-item-text" v-if="journeyData.owner !== null">
						<u-avatar :src="journeyData.owner.photo"></u-avatar>
						<u--text :lines="1" :text="journeyData.owner.name" bold></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" :text="journeyData.owner.plate_number"></u--text>
						<u--text :lines="1" text="|" type="info"></u--text>
						<u--text :lines="1" :text="'接单' + journeyData.owner.indent_sum + '次'"></u--text>
					</view>
					<view class="time-item-text" v-else><u--text :lines="1" text="正在等待车主接单中,大约需要5-10分钟" bold></u--text></view>
					<view>
						<u-button
							:customStyle="{ marginBottom: '10rpx' }"
							size="mini"
							shape="circle"
							type="primary"
							@click="setOut"
							v-if="journeyData.type === '1' && journeyData.owner_status === '0'"
							text="开始出发"
						></u-button>
						<u-button @click="editOrder(1)" v-else :customStyle="{ marginBottom: '10rpx' }" size="mini" shape="circle" type="primary" text="确认订单"></u-button>
						<u-button @click="editOrder(0)" size="mini" shape="circle" text="取消订单"></u-button>
					</view>
				</view>
			</view>
			<u-line></u-line>
			<view class="time-item">
				<view class="item-footer">
					<view class="item-footer-avatar">
						<u--text :lines="1" text="旅客:" bold></u--text>
						<u-avatar v-if="journeyData.user !== null" v-for="(item, index) in journeyData.user" :key="item.id" randomBgColor :text="item.name"></u-avatar>
						<u--text v-if="journeyData.user == null" :lines="1" text="暂无"></u--text>
					</view>
					<view class="item-footer-tag" v-if="journeyData.owner !== null">
						<u-tag v-if="journeyData.owner_status === '0'" size="mini" text="拼车中" type="success" plain></u-tag>
						<u-tag v-if="journeyData.owner_status === '2'" size="mini" text="已满座" type="error" plain></u-tag>
						<u-tag v-if="journeyData.owner_status === '3'" size="mini" text="未满座" type="success" plain></u-tag>
						<u-tag v-if="journeyData.owner_status === '4'" size="mini" text="出发失败" type="error" plain></u-tag>
						<u-tag v-if="journeyData.owner_status === '5'" size="mini" text="已取消" type="info" plain></u-tag>
						<u-tag v-if="journeyData.owner_status === '6'" size="mini" text="已完成" type="success" plain></u-tag>
					</view>
					<view class="item-footer-tag" v-else>
						<u-tag v-if="journeyData.user_status === '0'" size="mini" text="拼车中" type="success" plain></u-tag>
						<u-tag v-if="journeyData.user_status === '1'" size="mini" text="旅途中" type="warning" plain></u-tag>
						<u-tag v-if="journeyData.user_status === '4'" size="mini" text="出发失败" type="error" plain></u-tag>
						<u-tag v-if="journeyData.user_status === '5'" size="mini" text="已取消" type="info" plain></u-tag>
						<u-tag v-if="journeyData.user_status === '6'" size="mini" text="已完成" type="success" plain></u-tag>
					</view>
				</view>
			</view>
		</view>
		<!-- 车主和旅客信息结束 -->
	</view>
</template>

<script>
import QQMapWX from '../../static/js/qqmap/qqmap-wx-jssdk.min.js';
import { qqMapKey, qqMapSig } from '@/config.js';
import Map from '../../common/ms-openMap/openMap.js';
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
					width: 5
				}
			],
			// 旅途的数据绑定
			journeyData: {}
		};
	},
	onLoad(option) {
		let vm = this;
		vm.init(option);
	},
	onReady() {
		let vm = this;
		vm.map = uni.createMapContext('map', this);
		// 定位到当前位置
		vm.moveToLocation();
	},
	methods: {
		/**
		 * 初始化
		 */
		async init(option) {
			let vm = this,
				encodeItem;
			if (option.item === null || option.item === undefined || option.item === '') {
				encodeItem = await vm.getLine();
			} else {
				encodeItem = option.item;
			}
			const item = JSON.parse(decodeURIComponent(decodeURIComponent(encodeItem)));
			// 获取设备信息
			uni.getSystemInfo({
				success: function(e) {
					vm.screenWidth = e.screenWidth;
					vm.screenHeight = e.screenHeight * 0.75;
				}
			});
			vm.polyline = item.polyline;
			vm.markers = item.markers;
			vm.getJourney();
		},

		/**
		 * 获取旅途数据信息
		 */
		async getJourney() {
			let vm = this;
			const { data: res } = await vm.$http.get('index/navigation/journey');
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.journeyData = res.data;
		},

		/**
		 * 获取轨迹线
		 */
		async getLine() {
			let vm = this;
			const { data: res } = await vm.$http.get('index/user/line');
			if (res.code !== 200) return vm.$message.toast(res.msg);
			return res.data.line;
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
		 * 回到原点
		 */
		moveToLocation() {
			let vm = this;
			// 获取当前的地理位置、速度。
			uni.getLocation({
				type: 'gcj02',
				isHighAccuracy: true,
				success: function(e) {
					// 回到当前位置
					vm.map.moveToLocation({
						longitude: e.longitude,
						latitude: e.latitude
					});
				}
			});
		},

		/**
		 * 打开内置地图
		 */
		openMap() {
			let vm = this;
			let num = vm.polyline[0].points.length;
			Map.openMap(vm.polyline[0].points[num - 1].latitude, vm.polyline[0].points[num - 1].longitude);
		},

		/**
		 * 确认订单/取消订单
		 */
		editOrder(type) {
			let vm = this;
			if (type === 1) {
				// 确认订单
				vm.$message.confirm('是否要确认订单？', async function() {
					const { data: res } = await vm.$http.post('index/edit/order', { id: vm.journeyData.id, status: '6' });
					if (res.code !== 200) return vm.$message.toast(res.msg);
					vm.$message.toast(res.msg);
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 2000);
				});
			} else if (type) {
				// 取消订单
				vm.$message.confirm('是否要取消订单？', async function() {
					const { data: res } = await vm.$http.post('index/edit/order', { id: vm.journeyData.id, status: '5' });
					if (res.code !== 200) return vm.$message.toast(res.msg);
					vm.$message.toast(res.msg);
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}, 2000);
				});
			}
		},

		/**
		 * 开始出发
		 */
		setOut() {
			let vm = this;
			vm.$message.confirm('确认要开始出发？', async function() {
				const { data: res } = await vm.$http.post('index/indent/start', { owner_id: vm.journeyData.owner.owner_id });
				if (res.code !== 200) return vm.$message.toast(res.msg);
				vm.getJourney();
				return vm.$message.modal(res.msg);
			});
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
	top: 95%;
	box-shadow: 0px 0px 5px 1px #f6f6f6;
}
.third {
	position: absolute;
	width: 32rpx;
	height: 32rpx;
	left: 15rpx;
	top: 95%;
	box-shadow: 0px 0px 5px 1px #f6f6f6;
}
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
	.item-footer {
		display: flex;
		width: 100%;
		justify-content: space-between;
		.item-footer-avatar {
			display: flex;
		}
		.item-footer-tag {
			display: flex;
			align-items: center;
		}
	}
	.item-img {
		display: flex;
		margin: 10rpx;
	}
	.time-item-header {
		display: flex;
	}
}
</style>
