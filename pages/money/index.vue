<template>
	<view class="container">
		<view class="card">
			<view class="box money">
				<view class="box-item">
					<view class="title">
						<text>收入余额(元)</text>
						<text class="icon" v-if="isMoney" @click="showMoney(1)">&#xe69e;</text>
						<text class="icon" v-else @click="showMoney(1)">&#xe9cb;</text>
					</view>
					<view class="amount" v-if="isMoney">{{ money }}</view>
					<view class="amount" v-else>****</view>
				</view>
			</view>
			<view class="box withdraw">
				<view class="box-item">
					<view class="title">
						<text>总提现额(元)</text>
						<text class="icon" v-if="isWithdraw" @click="showMoney(2)">&#xe69e;</text>
						<text class="icon" v-else @click="showMoney(2)">&#xe9cb;</text>
					</view>
					<view class="amount" v-if="isWithdraw">{{ withdraw }}</view>
					<view class="amount" v-else>****</view>
				</view>
			</view>
			<view class="box expenditure">
				<view class="box-item">
					<view class="title">
						<text>总消费额(元)</text>
						<text class="icon" v-if="isExpenditure" @click="showMoney(3)">&#xe69e;</text>
						<text class="icon" v-else @click="showMoney(3)">&#xe9cb;</text>
					</view>
					<view class="amount" v-if="isExpenditure">{{ expenditure }}</view>
					<view class="amount" v-else>****</view>
				</view>
			</view>
		</view>
		<view class="footer"><button class="btn" type="default" plain="true" size="mini" @click="toWithdraw">申请提现</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 收入金额显示与隐藏
			isMoney: true,
			// 总提现金额显示与隐藏
			isWithdraw: true,
			// 总消费金额显示与隐藏
			isExpenditure: true,
			// 收入金额
			money: '0.00',
			// 总提现金额
			withdraw: '0.00',
			// 总消费
			expenditure: '0.00'
		};
	},
	onLoad() {
		this.myMoney();
	},
	methods: {
		/**
		 * 金额显示与隐藏
		 * @param {Object} type 隐藏按钮类型
		 */
		showMoney(type) {
			switch (type) {
				case 1:
					this.isMoney = !this.isMoney;
					break;
				case 2:
					this.isWithdraw = !this.isWithdraw;
					break;
				case 3:
					this.isExpenditure = !this.isExpenditure;
					break;
				default:
					break;
			}
		},

		/**
		 * 获取钱包数据
		 */
		async myMoney() {
			const { data: res } = await this.$http.get('mine/money');
			if (res.code !== 200) return this.$message.toast(res.msg);
			this.money = res.data.money;
			this.withdraw = res.data.withdraw_money;
			this.expenditure = res.data.expenditure;
		},

		/**
		 * 申请提现
		 */
		toWithdraw() {
			this.$app.navTo('/pages/money/withdraw');
		}
	}
};
</script>

<style lang="scss" scoped>
.btn {
	color: $uni-theme-color !important;
	border:1px solid $uni-theme-color !important;
}
.card {
	color: #ffffff;
}
.box {
	border-radius: 20rpx;
	width: 100%;
	height: 240rpx;
	margin: 30rpx auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.money {
	background: -moz-linear-gradient(left, #409eff, #4399fc 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #409eff), color-stop(100%, #4399fc));
	background: -webkit-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: -o-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: -ms-linear-gradient(left, #409eff 0, #4399fc 100%);
	background: linear-gradient(to left, #409eff 0, #4399fc 100%);
}
.box-item {
	text-align: center;
}
.title {
	font-size: 32rpx;
}
.amount {
	font-size: 64rpx;
}
.expenditure {
	background: -moz-linear-gradient(left, #716aca, #716aca 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #716aca), color-stop(100%, #716aca));
	background: -webkit-linear-gradient(left, #716aca 0, #716aca 100%);
	background: -o-linear-gradient(left, #716aca 0, #716aca 100%);
	background: -ms-linear-gradient(left, #716aca 0, #716aca 100%);
	background: linear-gradient(to left, #716aca 0, #716aca 100%);
}
.withdraw {
	background: -moz-linear-gradient(left, #67c23a, #67c23a 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #67c23a), color-stop(100%, #67c23a));
	background: -webkit-linear-gradient(left, #67c23a 0, #67c23a 100%);
	background: -o-linear-gradient(left, #67c23a 0, #67c23a 100%);
	background: -ms-linear-gradient(left, #67c23a 0, #67c23a 100%);
	background: linear-gradient(to left, #67c23a 0, #67c23a 100%);
}
.footer {
	position: absolute;
	text-align: center;
	bottom: 150rpx;
	margin: auto;
	left: 0;
	right: 0;
}
</style>
