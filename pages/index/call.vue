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
		</map>
		<!-- 地图结束 -->

		<!-- 拼车价格信息开始 -->
		<view class="card">
			<view class="item">
				<view class="item-text">
					<u--text :lines="1" text="拼成价"></u--text>
					<u--text :lines="1" size="24" bold :text="'￥' + tripData.money"></u--text>
					<u--text :lines="1" text="起"></u--text>
				</view>
			</view>
			<view class="hint">
				<view class="item-text"><u--text type="info" :lines="1" size="11" text="具体乘车优惠请与司机商量"></u--text></view>
			</view>
			<view>
				<view class="item-text">
					<u--text :lines="1" text="全程共"></u--text>
					<u--text bold :lines="1" :text="tripData.km"></u--text>
					<u--text :lines="1" text="公里,预计需要"></u--text>
					<u--text bold :lines="1" :text="tripData.time"></u--text>
					<u--text :lines="1" text="小时"></u--text>
				</view>
			</view>
			<view class="item">
				<view class="item-text select">
					<u--text @click="showTimeSelect = true" site="12" :lines="1" text="选择出发时间"></u--text>
					<u--text type="info" margin="20rpx" site="12" :lines="1" text="|"></u--text>
					<u--text @click="showSelectPeople = true" site="12" :lines="1" text="选择出行人数"></u--text>
				</view>
			</view>
			<view class="item"><u-button type="primary" text="出发旅途" @click="toNavigation"></u-button></view>
		</view>
		<!-- 拼车价格信息结束 -->

		<!-- 加载图标开始 -->
		<u-loading-page :loading="isLoading"></u-loading-page>
		<!-- 加载图标结束 -->

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
		<u-popup :show="showSelectPeople" mode="bottom" @close="closeSelectPeople" closeable>
			<view class="item"><u--text :lines="1" size="18" text="请选择出行人数"></u--text></view>
			<view class="hint"><u--text type="info" :lines="1" size="11" text="儿童,婴儿同行需要计入出行人数中"></u--text></view>
			<view class="item">
				<u-radio-group @change="trip" borderBottom placement="column" iconPlacement="right" value="one">
					<u-radio :customStyle="{ marginBottom: '8px' }" label="1人同行" name="one" activeColor="#409eff"></u-radio>
					<u-radio :customStyle="{ marginBottom: '8px' }" label="2人同行" name="two" activeColor="#409eff"></u-radio>
					<u-radio :customStyle="{ marginBottom: '8px' }" label="3人同行" name="three" activeColor="#409eff"></u-radio>
					<u-radio :customStyle="{ marginBottom: '8px' }" label="4人同行" name="four" activeColor="#409eff"></u-radio>
				</u-radio-group>
			</view>
		</u-popup>
		<!-- 选择出行人数结束 -->
	</view>
</template>

<script>
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
			// 表单数据绑定
			formData: {
				deadline: '',
				number: 1
			},
			// 服务端返回的出行数据
			tripData: {
				money: '0.00',
				km: '0.00',
				time: '0.0'
			},
			// 选择出发时间显示与隐藏
			showTimeSelect: false,
			// 选择出行人数的弹出层显示与隐藏
			showSelectPeople: false,
			// 点击出发旅途加载图标显示与隐藏
			isLoading: false,
			// 首页传过来的出行数据
			indexToData: {}
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
		init(option) {
			let vm = this;
			const item = JSON.parse(decodeURIComponent(decodeURIComponent(option.item)));
			// 获取设备信息
			uni.getSystemInfo({
				success: function(e) {
					vm.screenWidth = e.screenWidth;
					vm.screenHeight = e.screenHeight * 0.73;
				}
			});
			// 根据旅途ID获取轨迹线
			vm.queryLine(item.id);
			vm.indexToData = item;
			// 获取最晚出发时间
			vm.getCurrentTime(2);
		},

		/**
		 * 根据旅途ID获取轨迹线
		 * @param {Object} id 旅途ID
		 */
		async queryLine(id) {
			let vm = this;
			const { data: res } = await vm.$http.get('index/query/line', { params: { id: id } });
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.line = JSON.parse(decodeURIComponent(decodeURIComponent(res.data.line)));
			vm.polyline = vm.line.polyline;
			vm.markers = vm.line.markers;
			vm.getTripData();
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
			vm.formData.deadline = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss');
			vm.showTimeSelect = false;
		},

		/**
		 * 关闭选择出行人数弹出层
		 */
		closeSelectPeople() {
			let vm = this;
			vm.showSelectPeople = false;
		},

		/**
		 * 出行人数选择
		 * @param {Object} e 当前出行人数
		 */
		trip(e) {
			let vm = this;
			switch (e) {
				case 'one':
					vm.formData.number = 1;
					break;
				case 'two':
					vm.formData.number = 2;
					break;
				case 'three':
					vm.formData.number = 3;
					break;
				case 'four':
					vm.formData.number = 4;
					break;
				default:
					return vm.$app.toast('没有这个选项！');
			}
			vm.showSelectPeople = false;
			vm.getTripData();
		},

		/**
		 * 获取出行相关数据
		 */
		async getTripData() {
			let vm = this;
			const { data: res } = await vm.$http.get('owner/trip/compute', {
				params: {
					km: vm.line.trip.km,
					time: vm.line.trip.time,
					owner_id: vm.indexToData.owner_id,
					number: vm.formData.number
				}
			});
			if (res.code !== 200) return vm.$message.toast(res.msg);
			vm.tripData = res.data;
		},

		/**
		 * 跳转到路线导航详情
		 */
		async toNavigation() {
			let vm = this;
			vm.isLoading = true;
			// 获取微信登录临时凭证
			const code = await vm.$app.wechatLogin();
			const { data: res } = await vm.$http.post('pay/call/wechat', { code: code, journey: vm.indexToData, trip: vm.formData });
			if (res.code !== 200) {
				vm.isLoading = false;
				return vm.$message.modal(res.msg);
			}

			/* 			// 发起支付
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: res.timeStamp,
				nonceStr: res.nonceStr,
				package: res.package,
				signType: res.signType,
				paySign: res.paySign,
				success: function(res) {
					console.log('success:' + JSON.stringify(res)); */

			vm.$app.navTo('/pages/index/navigation?item=' + vm.line);

			/* },
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			}); */
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
.item {
	margin: 20rpx;
	display: flex;
	/deep/ .u-text {
		flex: 0;
	}
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
	margin-top: 0rpx;
}
</style>
