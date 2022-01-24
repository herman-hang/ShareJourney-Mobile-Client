<template>
	<view class="container">
		<view class="card">
			<u--form ref="formRef" :model="formData" :rules="rules">
				<u-form-item label="当前余额" borderBottom labelWidth="160rpx"><u--text mode="price" :text="formData.money"></u--text></u-form-item>
				<u-form-item label="到账方式" borderBottom labelWidth="160rpx" @click="showSelectWay" prop="withdraw_way">
					<u--input disabled disabledColor="#ffffff" placeholder="请选择到账方式" border="none" v-model="formData.withdraw_way"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="提现金额" borderBottom labelWidth="140rpx" prop="withdraw_money">
					<u-input border="none" placeholder="请输入金额" v-model="formData.withdraw_money" @focus="hideKeyboard">
						<template slot="suffix">
							<u-button size="mini" type="primary" :plain="true" text="全部提现" @click="allWithdraw"></u-button>
						</template>
					</u-input>
				</u-form-item>
			</u--form>
			<u-action-sheet
				:show="showSelect"
				:actions="actions"
				title="请选择到账方式"
				description="请留意到账时间"
				@close="showSelect = false"
				@select="withdrawSelect"
			></u-action-sheet>

			<!-- 输入提现金额键盘 -->
			<u-keyboard
				tips="点击确定立即提现"
				mode="number"
				@change="valChange"
				@backspace="backspace"
				:show="isShowKeyboard"
				:overlay="false"
				@cancel="cancelKeyboard"
				@confirm="confirmKeyboard"
				safeAreaInsetBottom
			></u-keyboard>

			<!-- 输入验证码键盘 -->
			<u-keyboard
				mode="number"
				@change="valChangeCode"
				dotDisabled
				@backspace="backspaceCode"
				:tooltip="false"
				:show="isShowCodeKeyboard"
				zIndex="10076"
				:closeOnClickOverlay="false"
				safeAreaInsetBottom
			></u-keyboard>

			<!-- 弹出层 -->
			<u-popup :show="isShowPopup" :round="10" mode="center" @close="closePopup" closeable overlayOpacity="0.2" zIndex="10075" :closeOnClickOverlay="false">
				<view class="popup">
					<view class="popup-item"><text>请输入验证码</text></view>
					<view class="popup-item">
						<u-code-input :borderColor="isError ? '#f56c6c' : ''" v-model="formData.code" hairline focus bold disabledKeyboard></u-code-input>
					</view>
					<view class="popup-item">
						<text v-show="sending == true">{{ sendTime }}</text>
						<text v-show="sending == false" @click="sendCode">获取验证码</text>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 弹出选择提现方式
			showSelect: false,
			// 定义提现选择选项
			actions: [],
			// 数据表单绑定
			formData: {
				money: '0.00',
				withdraw_money: '',
				withdraw_account: '',
				withdraw_way: '',
				code: ''
			},
			// 表单验证规则
			rules: {
				withdraw_way: {
					type: 'string',
					required: true,
					message: '请选择提现方式',
					trigger: ['blur', 'change']
				},
				withdraw_money: {
					type: 'string',
					required: true,
					message: '请输入提现金额',
					trigger: ['change']
				}
			},
			// 是否显示键盘
			isShowKeyboard: false,
			// 验证码键盘显示与隐藏
			isShowCodeKeyboard: false,
			// 是否显示弹出层
			isShowPopup: false,
			// 倒计时秒数初始化
			count: 60,
			sending: false,
			sendTime: '获取验证码',
			isError: false
		};
	},
	onLoad() {
		this.getMoneyInfo();
	},
	methods: {
		/**
		 * 获取提现信息
		 */
		async getMoneyInfo() {
			const { data: res } = await this.$http.get('mine/withdraw');
			if (res.code !== 200) return this.$message.toast(res.msg);
			this.formData.money = res.data.money;
			this.actions = res.data.actions;
		},

		/**
		 * 隐藏输入提现金额软键盘
		 */
		hideKeyboard() {
			// #ifdef APP-PLUS
			setInterval(function() {
				uni.hideKeyboard(); //隐藏软键盘
			}, 10);
			// #endif
			this.isShowKeyboard = true;
		},

		/**
		 * 赋值函数
		 * @param {Object} e
		 */
		withdrawSelect(e) {
			this.formData.withdraw_account = e.withdraw_account;
			this.formData.withdraw_way = e.name;
		},

		/**
		 * 全部提现
		 */
		allWithdraw() {
			this.formData.withdraw_money = this.formData.money;
		},

		/**
		 * 显示选择提现方式
		 */
		showSelectWay() {
			this.isShowCodeKeyboard = false;
			this.isShowKeyboard = false;
			this.isShowPopup = false;
			this.showSelect = true;
		},

		/**
		 * 输入提现金额键盘按键被点击(点击退格键不会触发此事件)
		 * @param {Object} val
		 */
		valChange(val) {
			// 将每次按键的值拼接到value变量中，注意+=写法
			this.formData.withdraw_money += val;
		},

		/**
		 * 输入提现金额键盘退格键被点击
		 */
		backspace() {
			let moeny = this.formData.withdraw_money;
			// 删除value的最后一个字符
			if (moeny.length) this.formData.withdraw_money = moeny.substr(0, moeny.length - 1);
		},

		/**
		 * 关闭输入提现金额键盘
		 */
		cancelKeyboard() {
			this.isShowKeyboard = false;
		},

		/**
		 * 输入提现金额键盘点击确定
		 */
		confirmKeyboard() {
			this.$refs.formRef
				.validate()
				.then(async result => {
					this.$message.loading('正在发送验证码...');
					const { data: res } = await this.$http.post('mine/withdraw/send/code', this.formData);
					if (res.code !== 200) {
						uni.hideLoading();
						uni.showModal({
							showCancel: false,
							title: '短信发送失败',
							content: res.msg ? res.msg : '请一分钟后再获取验证码'
						});
					} else {
						this.$message.toast('验证码发送成功请注意查收');
						uni.hideLoading();
						this.isShowKeyboard = false;
						this.isShowPopup = true;
						this.isShowCodeKeyboard = true;
						this.countDown();
					}
				})
				.catch(errors => {
					return false;
				});
		},

		/**
		 * 验证码键盘按键被点击
		 */
		valChangeCode(val) {
			this.formData.code += val;
			if (this.formData.code.length === 6) {
				this.finishCode();
			}
		},

		/**
		 * 验证码键盘退格键点击
		 */
		backspaceCode() {
			let code = this.formData.code;
			// 删除value的最后一个字符
			if (code.length) {
			}
			this.formData.code = code.substr(0, code.length - 1);
		},

		/**
		 * 关闭弹出层
		 */
		closePopup() {
			this.isShowCodeKeyboard = false;
			this.isShowPopup = false;
		},

		/**
		 * 倒计时
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

		/**
		 * 发送验证码
		 */
		async sendCode() {
			this.$message.loading('正在发送验证码...');
			const { data: res } = await this.$http.post('mine/withdraw/send/code', this.formData);
			if (res.code !== 200) {
				uni.hideLoading();
				uni.showModal({
					showCancel: false,
					title: '短信发送失败',
					content: res.msg ? res.msg : '请一分钟后再获取验证码'
				});
			} else {
				this.$message.toast('验证码发送成功请注意查收');
				uni.hideLoading();
				this.countDown();
			}
		},

		/**
		 * 输完验证码完自动提交
		 */
		async finishCode() {
			const { data: res } = await this.$http.post('mine/withdraw/audit', { code: this.formData.code });
			if (res.code !== 200) return (this.isError = true), (this.formData.code = '');
			this.isError = false;
			this.isShowCodeKeyboard = false;
			this.isShowPopup = false;
			this.$app.navTo('pages/money/index');
		}
	}
};
</script>

<style lang="scss" scoped>
uni-button:after {
	border: none;
}
.popup {
	width: 600rpx;
	height: 250rpx;
	margin-top: 50rpx;
}
.popup-item {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 20rpx;
}
</style>
