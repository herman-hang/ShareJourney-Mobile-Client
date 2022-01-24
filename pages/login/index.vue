<template>
	<view class="container">
		<image @click="navBack" src="../../static/image/login/close.png" style="width: 32upx;height: 32upx;margin-left: 46upx;"></image>

		<view style="text-align: center;">
			<image style="width: 120upx;height: 120upx;margin-top: 140upx;border-radius:20upx" src="../../static/logo.png"></image>
			<view style="font-size: 28upx;margin-top: 32upx">便捷、安心、省钱！</view>
			<button v-if="weixinLogin" class="confirm-btn" @click="weixinLo">微信登录</button>
			<button v-if="!weixinLogin" class="confirm-btn" @click="phoneLogin">手机号登录</button>
			<view v-if="weixinLogin" style="margin-top: 32upx;text-align: center"><text style="color: #999999;font-size: 26upx;" @click="phoneLogin">手机登录 ></text></view>
			<!-- 底部信息 -->
			<view class="footer">
				<text>登录即代表同意</text>
				<!-- 协议地址 -->
				<navigator url="/pages/login/policy" open-type="navigate">《隐私政策》</navigator>
				和
				<navigator url="/pages/login/agreement" open-type="navigate">《用户服务协议》</navigator>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			// 微信登录标志位
			weixinLogin: false,
			// 登录终端类型
			platform: process.env.VUE_APP_PLATFORM,
			// 登录凭证
			code: ''
		};
	},
	onLoad() {
		this.isWeixin();
		// #ifdef MP-WEIXIN
		this.getCode();
		// #endif
	},
	methods: {
		// 微信登录开启
		isWeixin() {
			if (process.env.VUE_APP_PLATFORM == 'mp-weixin') {
				this.weixinLogin = true;
			}
		},

		/**
		 * 跳转到登录页
		 */
		phoneLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},

		/**
		 * 关闭选择登录页面返回上一层
		 */
		navBack() {
			uni.navigateBack();
		},

		/**
		 * 微信授权登录
		 */
		async weixinLo() {
			// #ifdef MP-WEIXIN
			let self = this;
			// 获取登录凭证
			uni.getUserProfile({
				lang: 'zh_CN',
				desc: '获取用户相关信息',
				success: async infoRes => {
					const { data: res } = await this.$http.post('login/weixin', { code: self.code, param: infoRes, platform: this.platform });
					if (res.code == 401) {
						return uni.showModal({
							showCancel: false,
							title: '登录成功',
							confirmText: '去绑定',
							content: res.msg,
							success() {
								self.$app.navTo('/pages/login/bind');
							}
						});
					} else if (res.code == 200) {
						this.$db.set('token', res.data.Authorization);
						// 缓存小程序登录状态
						this.$db.set('UserInfos3rdSession_Token', res.data.session3rd);
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						return this.$message.toast(res);
					}
				}
			});
			// #endif
		},

		/**
		 * 获取微信登录凭证code
		 */
		getCode() {
			const self = this;
			return new Promise((resolve, reject) => {
				uni.login({
					provider: 'weixin',
					success: res => {
						self.code = res.code;
						resolve(res.code);
					},
					fail: reject
				});
			});
		}
	}
};
</script>

<style lang="scss">
.footer {
	padding-left: 140upx;
	margin-top: 32upx;
	font-size: 24upx;
	color: #666666;
	text-align: center;
	display: flex;
}

page {
	background: #fff;
}

.send-msg {
	border-radius: 30px;
	color: black;
	background: white;
	height: 30px;
	font-size: 14px;
	line-height: 30px;
}

.container {
	top: 0;
	padding-top: 80rpx;
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #fff;
}

.wrapper {
	position: relative;
	z-index: 90;
	background: #fff;
	padding-bottom: 20px;
}

.back-btn {
	position: absolute;
	left: 20px;
	z-index: 9999;
	padding-top: var(--status-bar-height);
	top: 20px;
	font-size: 20px;
	color: $font-color-dark;
}

.left-top-sign {
	font-size: 80px;
	color: $page-color-base;
	position: relative;
}

.right-top-sign {
	position: absolute;
	top: 40px;
	right: -15px;
	z-index: 95;

	&:before,
	&:after {
		display: block;
		content: '';
		width: 20px;
		height: 40px;
		background: $uni-theme-color;
	}

	&:before {
		transform: rotate(50deg);
		border-radius: 0 50px 0 0;
	}

	&:after {
		position: absolute;
		right: -198px;
		top: 0;
		transform: rotate(-50deg);
		border-radius: 50px 0 0 0;
		/* background: pink; */
	}
}

.left-bottom-sign {
	position: absolute;
	left: -270px;
	bottom: -320px;
	/*border: 100upx solid #d0d1fd;*/
	border-radius: 50%;
	padding: 90px;
}

.welcome {
	position: relative;
	left: 30px;
	top: -55px;
	font-size: 28px;
	color: #555;
	text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}

.input-content {
	padding: 0 20px;
}

.input-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 30px;
	background: $page-color-light;
	height: 64px;
	border-radius: 4px;
	margin-bottom: 30px;

	&:last-child {
		margin-bottom: 0;
	}

	.tit {
		height: 30px;
		line-height: 28px;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
	}

	input {
		height: 40px;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		width: 100%;
	}
}

.confirm-btn-weixin {
	width: 200px;
	height: 42px;
	line-height: 42px;
	border-radius: 30px;
	margin-top: 40upx;
	background: -moz-linear-gradient(left, #409eff, #4399fc 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #409eff), color-stop(100%, #4399fc));
	background: -webkit-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: -o-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: -ms-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: linear-gradient(to left, #409eff 0, #4399fc 100%);
	color: #fff;
	font-size: $font-lg;

	&:after {
		border-radius: 60px;
	}
}

.confirm-btn {
	width: 200px;
	height: 42px;
	line-height: 42px;
	border-radius: 30px;
	margin-top: 300upx;
	background: -moz-linear-gradient(left, #409eff, #4399fc 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #409eff), color-stop(100%, #4399fc));
	background: -webkit-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: -o-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: -ms-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: linear-gradient(to left, #409eff 0, #4399fc 100%);
	color: #fff;
	font-size: $font-lg;

	&:after {
		border-radius: 60px;
	}
}

.confirm-btn1 {
	width: 300px;
	height: 42px;
	line-height: 42px;
	border-radius: 30px;
	margin-top: 40px;
	background: whitesmoke;
	color: grey;
	font-size: $font-lg;

	&:after {
		border-radius: 60px;
	}
}

.forget-section {
	font-size: $font-sm + 2upx;
	color: $font-color-spec;
	text-align: center;
	margin-top: 40px;
}

.register-section {
	left: 0;
	margin-top: 30px;
	bottom: 30px;
	width: 100%;
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	text-align: center;

	text {
		color: $font-color-spec;
		margin-left: 10px;
	}
}
</style>
