<template>
	<view class="container">
		<view class="card">
			<view class="box">
				<view class="box-item">
					<view class="box-font">
						<text class="box-font-title">实名信息</text>
						<text class="box-font-item" v-if="statusData.card == ''">未实名</text>
						<text class="box-font-item" v-else>{{ statusData.name }} {{ statusData.card }}</text>
						<text class="box-font-item">年龄要求：18-70周岁</text>
					</view>
					<u-button v-if="statusData.card == ''" type="primary" text="去上传" class="box-btn" size="mini" @click="toAuthentication"></u-button>
					<u-button v-else icon="checkmark-circle" type="success" text="已实名" class="box-btn" size="mini" plain></u-button>
				</view>
				<u-line></u-line>
			</view>
			<view class="box">
				<view class="box-item">
					<view class="box-font">
						<text class="box-font-title">驾驶证</text>
						<text class="box-font-item">准驾车型：至少包含A1、A2、A3、B1、B2、C1、C2</text>
					</view>
					<u-button v-if="statusData.patente_url === ''" type="primary" text="去上传" class="box-btn" size="mini" @click="toPatente"></u-button>
					<u-button v-else type="success" text="重新上传" class="box-btn" size="mini" plain @click="toPatente"></u-button>
				</view>
				<u-line></u-line>
			</view>
			<view class="box">
				<view class="box-item">
					<view class="box-font">
						<text class="box-font-title">行驶证</text>
						<text class="box-font-item">非运营性质车辆，本人车辆或者亲友车辆均可认证</text>
					</view>
					<u-button v-if="statusData.registration_url === ''" type="primary" text="去上传" class="box-btn" size="mini" @click="toRegistration"></u-button>
					<u-button v-else type="success" text="重新上传" class="box-btn" size="mini" plain @click="toRegistration"></u-button>
				</view>
				<u-line></u-line>
			</view>
			<view class="box">
				<view class="box-item">
					<view class="box-font">
						<text class="box-font-title">车辆信息</text>
						<text class="box-font-item">请使用真实照片，座位数量不超过7座</text>
					</view>
					<u-button v-if="statusData.car_url === ''" type="primary" text="去填写" class="box-btn" size="mini" @click="toCarInfo"></u-button>
					<u-button v-else type="success" text="重新填写" class="box-btn" size="mini" plain @click="toCarInfo"></u-button>
				</view>
				<u-line></u-line>
			</view>
			<view class="box">
				<view class="box-item">
					<view class="box-font">
						<text class="box-font-title">提现信息</text>
						<text class="box-font-item">如实填写提现账户信息，仅允许填写一次</text>
					</view>
					<u-button v-if="statusData.withdraw_info === ''" type="primary" text="去填写" class="box-btn" size="mini" @click="toWithdraw"></u-button>
					<u-button v-else type="success" text="重新填写" class="box-btn" size="mini" plain @click="toWithdraw"></u-button>
				</view>
				<u-line></u-line>
			</view>
		</view>
		<view class="card footer">
			<view class="agree">
				<text @click="isShowAgree" class="cuIcon" :class="showAgree ? 'cuIcon-radiobox' : 'cuIcon-round'">请阅读并同意</text>
				<!-- 协议地址 -->
				<navigator class="agreement" url="/pages/certification/agreement" open-type="navigate">《车主认证协议》</navigator>
			</view>
			<u-button type="primary" text="提交认证"></u-button>
		</view>
	</view>
</template>

<script>
import * as db from '../../utils/db.js';
export default {
	data() {
		return {
			// 选中协议
			showAgree: true,
			// 状态数据
			statusData: {
				card: '',
				name: '',
				cause: '',
				is_owner: '',
				car_url: '',
				patente_url: '',
				registration_url: '',
				withdraw_info: ''
			}
		};
	},
	onShow() {
		this.getStatus();
	},
	methods: {
		/**
		 * 是否选择协议
		 */
		isShowAgree() {
			this.showAgree = !this.showAgree;
		},

		/**
		 * 跳到实名认证
		 */
		toAuthentication() {
			this.$app.navTo('/pages/certification/card/step-1');
		},

		/**
		 * 跳转到提现信息
		 */
		toWithdraw() {
			this.$app.navTo('/pages/certification/withdraw/info');
		},

		/**
		 * 跳转到车辆信息
		 */
		toCarInfo() {
			this.$app.navTo('/pages/certification/car/info');
		},

		/**
		 * 跳转到驾驶证上传
		 */
		toPatente() {
			this.$app.navTo('/pages/certification/patente/patente');
		},

		/**
		 * 跳转到行驶证上传
		 */
		toRegistration() {
			this.$app.navTo('/pages/certification/registration/registration');
		},

		/**
		 * 获取认证状态情况
		 */
		async getStatus() {
			const { data: res } = await this.$http.get('mine/certification');
			if (res.code !== 200) return this.$message.toast(res.msg);
			console.log(res);
			switch (res.data.is_owner) {
				case '0':
					this.statusData = res.data;
					break;
				case '1': // 跳转到审核中
					this.$app.navTo('/pages/certification/message?status=1');
					break;
				case '2': // 跳转到已认证成功
					this.$app.navTo('/pages/certification/message?status=2');
					break;
				case '3': // 跳转到驳回
					this.statusData = res.data;
					const flag = db.get('reject');
					if (flag === null || flag === '' || flag === undefined) {
						this.$app.navTo('/pages/certification/message?status=3&cause=' + res.data.cause);
					}
					break;
				default:
					return false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.box-item {
	display: flex;
	align-items: center;
	white-space: normal;
	width: 651upx;
	height: 105upx;
	padding: 0upx;
	clear: both;
	margin-left: 38upx;
	float: left;
	border-radius: 0upx;
	font-size: 8upx;
	margin: 20rpx;
}
.box-font {
	display: flex;
	flex-direction: column;
	// #ifdef MP-WEIXIN
	width: 400%;
	// #endif
	// #ifdef H5 || APP-PLUS
	width: 486rpx;
	// #endif
	float: left;
	border-radius: 0upx;
	color: #646464;
	font-size: 32rpx;
	line-height: 40rpx;
}
.box-font-title {
	font-weight: 600;
}
.box-font-item {
	font-size: 24rpx;
	color: #8f8f94;
}
.box-btn {
	width: 120rpx !important;
}
.footer {
	width: 718rpx;
	position: fixed;
	bottom: 0;
	margin-bottom: 30rpx;
	line-height: 50rpx;
}
.agree {
	display: flex;
	margin-bottom: 20rpx;
}
.agreement {
	margin-left: 10rpx;
	color: $uni-theme-color;
}
.cuIcon::before {
	margin-right: 5rpx;
}
.auth-text {
	width: 120rpx !important;
}
</style>
