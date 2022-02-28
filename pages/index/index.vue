<template>
	<view class="container">
		<!-- 导航开始 -->
		<view class="nav">
			<u-navbar title="共享旅途" fixed placeholder>
				<view class="u-nav-slot" slot="left" @click="toSelectDestination">
					<u--text v-if="site.ad_info.city" :text="site.ad_info.city" prefixIcon="map" bold></u--text>
					<u--text v-else text="定位中" prefixIcon="map"></u--text>
				</view>
			</u-navbar>
		</view>
		<!-- 导航结束 -->

		<view class="box">
			<!-- 顶部标签开始 -->
			<view class="tabs-item"><u-tabs :scrollable="false" :list="tabs" @click="onTabs" :current="startType"></u-tabs></view>
			<!-- 顶部标签结束 -->

			<!-- 地图开始 -->
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
				<cover-image class="position" @click="getLocation(1)" src="../../static/image/map/position.png"></cover-image>
				<cover-view class="indent" @click="toNavigation" v-if="isJourneyIndent">
					<cover-image class="image" src="../../static/image/map/indent.png"></cover-image>
					<u--text text="进行中"></u--text>
					<u-badge isDot></u-badge>
				</cover-view>
			</map>
			<!-- 地图结束 -->

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

			<!-- 旅客订单列表开始 -->
			<view class="card" v-if="startType === 0" v-for="(item, index) in userListData" :key="item.id">
				<view class="time-item">
					<text>状态：</text>
					<u-tag text="未满座" type="success" plain size="mini"></u-tag>
				</view>
				<u-line></u-line>

				<!-- 地点选择开始 -->
				<view class="time-item">
					<view class="item-box">
						<view class="time-item-text time-item-length">
							<u--text text="●" type="success"></u--text>
							<u--text :lines="1" :text="item.start | stateFormat"></u--text>
							<u--text type="info" :lines="1" size="12" text="100m"></u--text>
						</view>
						<view class="time-item-text time-item-length">
							<u--text text="●" type="primary"></u--text>
							<u--text :lines="1" :text="item.end | stateFormat"></u--text>
							<u--text type="info" :lines="1" size="12" text="1km"></u--text>
						</view>
					</view>
					<view class="item-box"><u-icon name="arrow-right" size="12" bold @click="getPathLineData(item.id)"></u-icon></view>
					<view class="item-box relation">
						<u-icon name="chat" color="#409eff" size="28"></u-icon>
						<u-icon name="phone" color="#409eff" size="28" @click="rindUp(item.mobile)"></u-icon>
					</view>
				</view>
				<!-- 地点选择结束 -->
				<u-line></u-line>
				<!-- 司机信息开始 -->
				<view class="time-item">
					<view class="item-footer">
						<view class="time-item-text">
							<u-avatar :src="item.photo"></u-avatar>
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
			<!-- 旅客订单列表结束 -->

			<!-- 旅客列表底部分割线开始 -->
			<u-divider v-if="startType === 0 && isDataShowUser === true" text="已经到底啦~"></u-divider>
			<!-- 旅客列表底部分割线结束 -->

			<!-- 旅途轨迹线开始 -->
			<u-popup mode="center" :round="10" :show="isPathLine" @close="isPathLine = false">
				<view class="step">
					<u-steps :current="stepsSort" direction="column" :list="stepsData">
						<u-steps-item
							v-for="(item, index) in stepsData"
							:key="index"
							:title="item.title | stateFormat"
							:desc="item.status === null ? '出发地' : item.status === '0' ? '未达到' : '已达到' + '　' + item.arrival_time"
						></u-steps-item>
					</u-steps>
				</view>
			</u-popup>
			<!-- 旅途轨迹线结束 -->

			<!-- 车主订单列表开始 -->
			<view class="card" v-if="startType === 1" v-for="(item, index) in ownerListData" :key="index">
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
							<u--text type="info" :lines="1" size="12" text="100m"></u--text>
						</view>
						<view class="time-item-text time-item-length">
							<u--text text="●" type="primary"></u--text>
							<u--text :lines="1" :text="item.end | stateFormat"></u--text>
							<u--text type="info" :lines="1" size="12" text="1km"></u--text>
						</view>
					</view>
					<view class="item-box"><u-icon name="arrow-right" size="12" bold @click="getPathLineData(item.id)"></u-icon></view>
					<view class="item-box relation">
						<u-icon name="chat" color="#409eff" size="28"></u-icon>
						<u-icon name="phone" color="#409eff" size="28" @click="rindUp(item.mobile)"></u-icon>
					</view>
				</view>
				<!-- 地点选择结束 -->
				<u-line></u-line>
				<!-- 司机信息开始 -->
				<view class="time-item">
					<view class="item-footer">
						<view class="time-item-text">
							<u-avatar :src="item.photo"></u-avatar>
							<u--text :lines="1" :text="item.sex === '0' ? item.name + '女士' : item.sex === '1' ? item.name + '先生' : item.name + '旅客'" bold></u--text>
							<u--text :lines="1" text="|" type="info"></u--text>
							<u--text :lines="1" :text="'共' + item.trip + '人同行'"></u--text>
						</view>
						<view><u-button shape="circle" text="邀请旅客" @click="invitationUser(item)"></u-button></view>
					</view>
				</view>
				<!-- 司机信息结束 -->
			</view>
			<!-- 车主订单列表结束 -->

			<!-- 车主列表底部分割线开始 -->
			<u-divider v-if="startType === 1 && isDataShowOwner === true" text="已经到底啦~"></u-divider>
			<!-- 车主列表底部分割线结束 -->
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
				},
				ad_info: {
					city: ''
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
			// 当前乘车对象
			startType: 0,
			// 轨迹线弹窗
			isPathLine: false,
			// 是否存在正在进行的旅途订单
			isJourneyIndent: false,
			// 旅客分页参数
			userQueryInfo: {
				//当前页码
				current_page: 1,
				//每页显示多少条数据
				per_page: 6,
				// 总页数
				total: 0
			},
			// 旅客列表数据
			userListData: [],
			// 旅客列表数据是否加载完
			isDataShowUser: false,
			// 旅客分页参数
			ownerQueryInfo: {
				//当前页码
				current_page: 1,
				//每页显示多少条数据
				per_page: 6,
				// 总页数
				total: 0
			},
			// 车主列表数据
			ownerListData: [],
			// 车主列表数据是否加载完
			isDataShowOwner: false,
			// 步骤条数据绑定
			stepsData: [],
			// 步骤条进行到的步骤
			stepsSort: '1'
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
	onShow() {
		let vm = this;
		// 调用检测当前是否存在进行的订单
		vm.checkIndentStatus();
		// 获取列表订单
		vm.getAllIndent();
	},
	onReady() {
		let vm = this;
		vm.map = uni.createMapContext('map', this);
		// 获取定位
		vm.getLocation(1);
	},
	onReachBottom() {
		let vm = this;
		if (vm.startType === 0) {
			if (vm.userQueryInfo.current_page < vm.userQueryInfo.total) {
				vm.userQueryInfo.current_page = vm.userQueryInfo.current_page + 1;
			}
		} else {
			if (vm.ownerQueryInfo.current_page < vm.ownerQueryInfo.total) {
				vm.ownerQueryInfo.current_page = vm.ownerQueryInfo.current_page + 1;
			}
		}
		vm.getAllIndent();
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
		 * 检测当前是否存在进行的订单
		 */
		async checkIndentStatus() {
			let vm = this;
			const { data: res } = await vm.$http.get('base/check/indent/status');
			if (res.code === 403) {
				vm.isJourneyIndent = true;
			} else {
				vm.isJourneyIndent = false;
			}
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
		onTabs(e) {
			let vm = this;
			vm.startType = e.index;
			vm.getAllIndent();
			if (vm.startType === 1) {
				vm.checkUser();
			}
		},

		/**
		 * 判断是否为车主
		 */
		async checkUser() {
			let vm = this;
			const { data: res } = await vm.$http.get('base/check/user');
			if (res.code !== 200) {
				vm.startType = 0;
				return vm.$message.toast(res.msg);
			}
		},

		/**
		 * 时间回调的值
		 */
		onTimeChange(e, index) {
			let vm = this;
			vm.ownerListData[index].date = e;
		},

		/**
		 * 跳转到选择目的地
		 */
		async toSelectDestination() {
			let vm = this;
			if (vm.site.ad_info.city === '' || vm.site.ad_info.city === null || vm.site.ad_info.city === undefined) {
				return vm.$message.toast('定位中...');
			}
			const { data: res } = await vm.$http.get('base/check/authentication');
			if (res.code !== 200) {
				vm.$message.confirm(res.msg, function() {
					vm.$app.navTo('/pages/certification/card/step-1');
				});
			} else {
				const item = JSON.stringify({
					city: vm.site.ad_info.city,
					address: vm.site.formatted_addresses.recommend,
					longitude: vm.markers[0].longitude,
					latitude: vm.markers[0].latitude,
					type: vm.startType
				});
				vm.$app.navTo('/pages/index/destination?item=' + encodeURIComponent(item));
			}
		},

		/**
		 * 跳转到导航路线
		 */
		toNavigation() {
			let vm = this;
			vm.$app.navTo('/pages/index/navigation');
		},

		/**
		 * 获取列表订单数据
		 */
		async getAllIndent() {
			let vm = this;
			if (vm.startType === 0) {
				const { data: res } = await vm.$http.get('index/owner/indent', { params: vm.userQueryInfo });
				if (res.code !== 200) return vm.$message.toast(res.msg);
				vm.userQueryInfo.total = res.data.total;
				vm.userListData = vm.$app.getMoreListData(res.data.data, vm.userListData, vm.userQueryInfo.current_page);
				if (res.data.data.length < vm.userQueryInfo.per_page) {
					vm.isDataShowUser = true;
				}
			} else {
				const { data: res } = await vm.$http.get('index/user/indent', { params: vm.ownerQueryInfo });
				if (res.code !== 200) return vm.$message.toast(res.msg);
				vm.ownerQueryInfo.total = res.data.total;
				vm.ownerListData = vm.$app.getMoreListData(res.data.data, vm.ownerListData, vm.ownerQueryInfo.current_page);
				if (res.data.data.length < vm.ownerQueryInfo.per_page) {
					vm.isDataShowOwner = true;
				}
			}
		},

		/**
		 * 拨打车主电话
		 * @param {Object} mobile
		 */
		rindUp(mobile) {
			uni.makePhoneCall({
				phoneNumber: mobile
			});
		},

		/**
		 * 根据旅途信息ID获取轨迹线
		 * @param {Object} id
		 */
		async getPathLineData(id) {
			let vm = this;
			const { data: res } = await vm.$http.get('index/path/line', { params: { id: id } });
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.stepsSort = res.data.sort;
			vm.stepsData = res.data.data;
			vm.isPathLine = true;
		},

		/**
		 * 邀请旅客
		 * @param {Object} item 旅客的相关信息
		 */
		invitationUser(item) {
			let vm = this;
			vm.$message.confirm('确认要邀请该旅客吗？', async function() {
				const { data: res } = await vm.$http.post('owner/invitation/user', { id: item.id, user_id: item.user_id, trip: item.trip });
				if (res.code !== 200) return vm.$message.toast(res.msg);
				vm.$app.navTo('/pages/index/navigation');
			});
		},

		/**
		 * 呼叫车主
		 * @param {Object} item 车主旅途的相关信息
		 */
		callOwner(item) {
			let vm = this;
			vm.$message.confirm('确认要呼叫该车主吗？', function() {
				if (vm.isJourneyIndent) {
					return vm.$message.modal('您当前正在进行一个订单！');
				} else {
					vm.$app.navTo('/pages/index/call?item=' + encodeURIComponent(JSON.stringify(item)));
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
cover-image {
	display: inline-block;
	padding: 10rpx;
	background-color: #ffffff;
}
cover-view {
	background-color: #ffffff;
}
cover-view {
	top: 95%;
}
.position {
	position: absolute;
	border-radius: 25%;
	width: 32rpx;
	height: 32rpx;
	right: 15rpx;
	top: 90%;
	box-shadow: 0px 0px 5px 1px #f6f6f6;
}
.indent {
	display: flex;
	position: absolute;
	border-radius: 15rpx 1rpx 15rpx 15rpx;
	left: 15rpx;
	top: 90%;
	box-shadow: 0px 0px 5px 1px #f6f6f6;
	.image {
		width: 32rpx;
		height: 32rpx;
	}
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
	margin-top: -30rpx;
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
