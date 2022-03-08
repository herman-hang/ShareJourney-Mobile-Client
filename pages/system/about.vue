<template>
	<view class="container">
		<view class="u-flex-col u-p-30 u-col-center">
			<u-image width="180rpx" height="180rpx" src="/static/logo.png"></u-image>
			<view class="header-text">
				<u--text text="共享旅途" bold size="18" align="center"></u--text>
				<u--text text="Version:1.0.0" align="center"></u--text>
			</view>
		</view>
		<view class="card">
			<view class="box" @click="checkVersion">
				<view class="box-item">
					<text class="box-font">检测新版本</text>
					<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
				</view>
				<u-line></u-line>
			</view>
			<view class="box" @click="toIntroduce">
				<view class="box-item">
					<text class="box-font">功能介绍</text>
					<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
				</view>
				<u-line></u-line>
			</view>
		</view>
		<view class="footer">
			<u--text @click="toPolicy" :lines="1" text="《隐私政策》" type="primary" align="center"></u--text>
			<u--text @click="toAgreement" :lines="1" text="《用户服务协议》" type="primary" align="center"></u--text>
			<u--text text="Copyright ©2022 All Rights Reserved." size="12" type="info" align="center"></u--text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	methods: {
		/**
		 * 检测版本
		 */
		checkVersion() {
			let vm = this;
			vm.$message.loading('检测中...');
			setTimeout(function() {
				uni.hideLoading();
				vm.$message.toast('当前为最新版本');
			}, 2000);
		},

		/**
		 * 跳转到隐藏政策
		 */
		toPolicy() {
			let vm = this;
			vm.$app.navTo('/pages/login/policy');
		},

		/**
		 * 跳转到用户服务协议
		 */
		toAgreement() {
			let vm = this;
			vm.$app.navTo('/pages/login/agreement');
		},

		/**
		 * 功能介绍
		 */
		toIntroduce() {
			let vm = this;
			vm.$app.navTo('/pages/system/about/introduce');
		}
	}
};
</script>

<style lang="scss" scoped>
.u-padding-30,
.u-p-30 {
	padding: 14px !important;
}
.u-flex-col {
	display: flex;
	flex-direction: column;
}
.u-col-center {
	align-items: center;
}
.header-text {
	margin-top: 40rpx;
}
.box-item {
	white-space: normal;
	width: 651upx;
	height: 85upx;
	padding: 0upx;
	clear: both;
	margin-top: 20upx;
	margin-left: 38upx;
	float: left;
	border-radius: 0upx;
	font-size: 8upx;
}
.box-font {
	width: 426upx;
	height: 47upx;
	margin-top: 13upx;
	float: left;
	border-radius: 0upx;
	color: #646464;
	font-size: 32upx;
	line-height: 40upx;
}
.box-img {
	width: 30upx;
	height: 32upx;
	margin-top: 20upx;
	margin-left: 170upx;
	float: left;
	border-radius: 0upx;
	font-size: 31upx;
	line-height: 32upx;
}
.footer {
	position: fixed;
	text-align: center;
	width: 100%;
	bottom: 0;
}
</style>
