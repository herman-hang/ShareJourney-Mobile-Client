<template>
	<view class="container">
		<view class="card">
			<view class="box">
				<view class="box-item" @click="toMobile">
					<text class="box-font">手机号码</text>
					<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
				</view>
				<u-line></u-line>
			</view>
			<view class="box">
				<view class="box-item" @click="toEmail">
					<text class="box-font">安全邮箱</text>
					<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
				</view>
				<u-line></u-line>
			</view>
			<view class="box" @click="toPassword">
				<view class="box-item">
					<text class="box-font">修改密码</text>
					<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
				</view>
				<u-line></u-line>
			</view>
			<view class="box" @click="toAbout">
				<view class="box-item">
					<text class="box-font">关于共享旅途</text>
					<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
				</view>
				<u-line></u-line>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		/**
		 * 跳转到关于共享旅途
		 */
		toAbout() {
			let vm = this;
			vm.$app.navTo('/pages/system/about');
		},

		/**
		 * 跳转到修改密码
		 */
		toPassword() {
			let vm = this;
			vm.$app.navTo('/pages/system/password');
		},

		/**
		 * 跳转到手机号码
		 */
		toMobile() {
			let vm = this;
			vm.$app.navTo('/pages/system/mobile/mobile');
		},

		/**
		 * 跳转到邮箱
		 */
		toEmail() {
			let vm = this;
			vm.$app.navTo('/pages/system/email/email');
		}
	}
};
</script>

<style lang="scss" scoped>
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
</style>
