<template>
	<view class="container">
		<view class="wrapper">
			<view class="input-content">
				<view class="cu-form-group" style="border: 2upx solid whitesmoke;margin-bottom: 20px;border-radius: 30px">
					<view class="title">手机号:</view>
					<input type="number" :value="mobile" placeholder="请输入手机号" maxlength="11" data-key="mobile" @input="inputChange" />
				</view>
				<view class="cu-form-group" style="border: 2upx solid whitesmoke;margin-bottom: 20px;border-radius: 30px">
					<text class="title">验证码:</text>
					<input type="number" :value="code" placeholder="请输入验证码" maxlength="6" data-key="code" @input="inputChange" @confirm="toRegister" />
					<button class="send-msg" @click="useVerify" :disabled="sending">{{ sendTime }}</button>
				</view>

				<view class="cu-form-group" style="border: 2upx solid whitesmoke;margin-bottom: 20px;border-radius: 30px">
					<text class="title">设置密码:</text>
					<input
						type="password"
						:value="password"
						placeholder="请设置新密码"
						placeholder-class="input-empty"
						maxlength="15"
						minlength="6"
						data-key="password"
						@input="inputChange"
						@confirm="toRegister"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toRegister">立即注册</button>
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree ? 'cuIcon-radiobox' : 'cuIcon-round'">同意</text>
				<!-- 协议地址 -->
				<navigator url="/pages/login/policy" open-type="navigate">《隐私政策》</navigator>
				和
				<navigator url="/pages/login/agreement" open-type="navigate">《用户服务协议》</navigator>
			</view>
		</view>
		<!-- 滑动验证码 -->
		<Verify @success="sendMsg" :mode="'pop'" :captchaType="'blockPuzzle'" :imgSize="{ width: '330px', height: '155px' }" ref="verify"></Verify>
	</view>
</template>

<script>
//引入组件
import Verify from '../../components/verify/verify.vue';
export default {
	components: {
		Verify
	},
	data() {
		return {
			// 选中协议
			showAgree: true,
			// 验证码
			code: '',
			// 手机号码
			mobile: '',
			// 密码
			password: '',
			// 倒计时标志位
			sending: false,
			sendTime: '获取验证码',
			count: 60
		};
	},
	onLoad() {},
	methods: {
		/**
		 * 是否选择协议
		 */
		isShowAgree() {
			this.showAgree = !this.showAgree;
		},

		/**
		 * 弹出验证码
		 */
		useVerify() {
			const { mobile } = this;
			if (!mobile) {
				return this.$message.toast('请输入手机号');
			} else if (mobile.length !== 11) {
				return this.$message.toast('请输入正确的手机号');
			}
			this.$refs.verify.show();
		},

		/**
		 * 发送验证码
		 */
		async sendMsg(params) {
			// #ifdef H5
			this.$refs.verify.close();
			// #endif
			const { mobile } = this;
			if (!mobile) {
				this.$message.toast('请输入手机号');
			} else if (mobile.length !== 11) {
				this.$message.toast('请输入正确的手机号');
			} else {
				this.$message.loading('正在发送验证码...');
				const { data: res } = await this.$http.get('register/send/code', { params: { mobile: mobile } });
				if (res.code !== 200) {
					uni.hideLoading();
					uni.showModal({
						showCancel: false,
						title: '短信发送失败',
						content: res.msg ? res.msg : '请一分钟后再获取验证码'
					});
				} else {
					this.sending = true;
					this.$message.toast('验证码发送成功请注意查收');
					// 缓存滑块验证码回调信息
					this.$db.set('verification', params.captchaVerification);
					this.countDown();
					uni.hideLoading();
				}
			}
		},

		/**
		 * 注册
		 */
		async toRegister() {
			const { mobile, password, code, showAgree } = this;
			if (!mobile) {
				this.$message.toast('请输入账号');
			} else if (!password) {
				this.$message.toast('请设置密码');
			} else if (password.length < 6) {
				this.$message.toast('密码位数必须大于6位');
			} else if (!showAgree) {
				this.$message.toast('请先同意《协议》');
			} else {
				const verification = this.$db.get('verification');
				const { data: res } = await this.$http.post('register', { mobile: mobile, password: password, code: code, verification: verification });
				if (res.code !== 200) return this.$message.toast(res.msg);
				this.$db.del('verification');
				this.$app.navTo('pages/login/login');
			}
		},

		/**
		 * 计时
		 */
		countDown() {
			const { count } = this;
			if (count === 1) {
				this.count = 60;
				this.sending = false;
				this.sendTime = '获取验证码';
			} else {
				this.count = count - 1;
				this.sending = true;
				this.sendTime = count - 1 + '秒后重新获取';
				setTimeout(this.countDown.bind(this), 1000);
			}
		},

		inputChange(e) {
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.footer {
	padding-left: 140upx;
	margin-top: 32upx;
	text-align: center;
	display: flex;
}

.send-msg {
	border-radius: 30px;
	color: white;
	height: 30px;
	font-size: 14px;
	line-height: 30px;
	background: $uni-theme-color;
}

.send-msgs {
	border-radius: 30px;
	color: #999999;
	height: 30px;

	font-size: 14px;
	line-height: 30px;
	background: white;
}

.container {
	padding-top: 32upx;
	position: relative;
	overflow: hidden;
	background: #fff;
	margin: 0rpx;
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
		background: -moz-linear-gradient(left, #409eff, #4399fc 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #409eff), color-stop(100%, #4399fc));
		background: -webkit-linear-gradient(left, #409eff 0, #4399fc 100%);
		background: -o-linear-gradient(left, #409eff 0, #4399fc 100%);
		background: -ms-linear-gradient(left, #409eff 0, #4399fc 100%);
		background: linear-gradient(to left, #409eff 0, #4399fc 100%);
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

.confirm-btn {
	width: 300px;
	height: 42px;
	line-height: 42px;
	border-radius: 30px;
	margin-top: 40px;
	background: $uni-theme-color;
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
	position: fixed;
	left: 0;
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
