<template>
	<view class="container">
		<view class="card">
			<view class="box">
				<view class="box-item">
					<navigator url="/pages/login/policy" open-type="navigate">
						<text class="box-font">隐私政策</text>
						<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
					</navigator>
				</view>
				<u-line></u-line>
			</view>
			<view class="box">
				<view class="box-item">
					<navigator url="/pages/login/agreement" open-type="navigate">
						<text class="box-font">用户服务协议</text>
						<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
					</navigator>
				</view>
				<u-line></u-line>
			</view>
			<view class="box">
				<view class="box-item">
					<navigator url="pages/certification/agreement" open-type="navigate">
						<text class="box-font">车主认证协议</text>
						<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
					</navigator>
				</view>
				<u-line></u-line>
			</view>
			<view class="box">
				<view class="box-item">
					<navigator url="pages/money/rule" open-type="navigate">
						<text class="box-font">提现规则</text>
						<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="box-img"></image>
					</navigator>
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
	onLoad() {},
	methods: {}
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
