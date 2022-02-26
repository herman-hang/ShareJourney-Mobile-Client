<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="ym-content">
		<view class="my-1">
			<view class="my-3">
				<image v-if="photo" @click="material" :src="photo" mode="scaleToFill" border="0" class="my-4 head"></image>
				<image
					v-else
					@click="material"
					:src="sex == '0' ? '/static/image/sex/girl.png' : '/static/image/sex/man.png'"
					mode="scaleToFill"
					border="0"
					class="my-4 head"
				></image>
				<view class="my-5">
					<view v-show="isLogin">
						<text decode="true" class="my-7" @click="material">{{ nickname }}</text>
						<text decode="true" class="my-8" @click="material">{{ mobile }}</text>
					</view>
					<view v-show="!isLogin">
						<text decode="true" class="my-7" @click="toLogin()">未登录</text>
						<text decode="true" class="my-8" @click="toLogin()">点击登录账号</text>
					</view>
				</view>
				<image v-if="isLogin" @click="material" src="/static/image/my/images/my_6_6.jpg" mode="scaleToFill" border="0" class="my-6"></image>
				<image v-else @click="toLogin()" src="/static/image/my/images/my_6_6.jpg" mode="scaleToFill" border="0" class="my-6"></image>
			</view>
			<view class="my-2">
				<view class="my-9">
					<view class="my-10">
						<text decode="true" class="my-13">收入余额</text>
						<text decode="true" class="my-14">￥{{ is_owner == '0' ? '0.00' : money }}</text>
						<view class="my-15">
							<image src="/static/image/my/images/my_16_16.jpg" mode="scaleToFill" border="0" class="my-16"></image>
							<image @click="toWithdraw()" src="/static/image/my/images/my_17_17.jpg" mode="scaleToFill" border="0" class="my-17"></image>
						</view>
					</view>
					<view class="my-11"></view>
					<view class="my-12">
						<text decode="true" class="my-18">总提现额</text>
						<text decode="true" class="my-19">￥{{ is_owner == '0' ? '0.00' : withdraw_money }}</text>
						<view class="my-20">
							<image src="/static/image/my/images/my_21_21.jpg" mode="scaleToFill" border="0" class="my-21"></image>
							<image src="/static/image/my/images/my_22_22.jpg" mode="scaleToFill" border="0" class="my-22" @click="toRule"></image>
						</view>
					</view>
				</view>
				<view class="my-36">
					<view class="my-37">
						<view @click="toMoney">
							<image src="/static/image/my/images/my_money.jpg" mode="scaleToFill" border="0" class="my-38"></image>
							<text decode="true" class="my-39">我的钱包</text>
							<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="my-40"></image>
						</view>
					</view>
					<view class="my-41">
						<image src="/static/image/my/images/my_42_42.jpg" mode="scaleToFill" border="0" class="my-42"></image>
						<text decode="true" class="my-43">旅行记录</text>
						<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="my-44"></image>
					</view>
					<view class="my-45">
						<view @click="toCertification">
							<image src="/static/image/my/images/my_46_46.jpg" mode="scaleToFill" border="0" class="my-46"></image>
							<text decode="true" class="my-47">车主认证</text>
							<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="my-48"></image>
						</view>
					</view>
				</view>
				<view class="my-49">
					<view class="my-54" @click="toMyIndent">
						<image src="/static/image/my/images/my_28_28.jpg" mode="scaleToFill" border="0" class="my-55"></image>
						<text decode="true" class="my-56">我的订单</text>
						<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="my-57"></image>
					</view>
					<view class="my-58">
						<view @click="toTerms()">
							<image src="/static/image/my/images/my_59_59.jpg" mode="scaleToFill" border="0" class="my-59"></image>
							<text decode="true" class="my-60">法律条款</text>
							<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="my-61"></image>
						</view>
					</view>
					<view class="my-62">
						<image src="/static/image/my/images/my_63_63.jpg" mode="scaleToFill" border="0" class="my-63"></image>
						<text decode="true" class="my-64">应用设置</text>
						<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="my-65"></image>
					</view>
				</view>
				<view class="my-99">
					<button v-if="isLogin" class="btn" type="default" @click="loginOut">退出登录</button>
					<button v-else class="btn" type="default" @click="toLogin">立即登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 是否登录
			isLogin: false,
			// 昵称
			nickname: '',
			// 手机号码
			mobile: '',
			// 收入金额
			money: '0.00',
			// 提现金额
			withdraw_money: '0.00',
			// 是否为车主 0为用户，2为车主
			is_owner: '0',
			// 头像
			photo: '',
			// 性别
			sex: '1'
		};
	},
	components: {},
	onLoad() {},
	onShow() {
		if (uni.getStorageSync('token')) {
			this.checkLogin();
		}
	},
	methods: {
		/**
		 * 退出登录
		 */
		async loginOut() {
			let self = this;
			self.$message.confirm('确认退出登录?', async function() {
				const { data: res } = await self.$http.get('login/out');
				if (res.code !== 200) return self.$message.toast(res.msg);
				self.$db.del('token');
				self.toLogin();
			});
		},

		/**
		 * 登录
		 */
		toLogin() {
			this.$app.navTo('/pages/login/index');
		},

		/**
		 * 跳转到我的钱包
		 */
		toMoney() {
			this.$app.navTo('/pages/money/index');
		},

		/**
		 * 个人资料
		 */
		material() {
			this.$app.navTo('/pages/material/index');
		},

		/**
		 * 提现页面
		 */
		toWithdraw() {
			this.$app.navTo('/pages/money/withdraw');
		},

		/**
		 * 跳转到法律条款
		 */
		toTerms() {
			this.$app.navTo('/pages/terms/index');
		},

		/**
		 * 跳转到车主认证
		 */
		toCertification() {
			this.$app.navTo('/pages/certification/index');
		},

		/**
		 * 跳转到提现规则
		 */
		toRule() {
			this.$app.navTo('/pages/money/rule');
		},

		/**
		 * 跳到我的订单
		 */
		toMyIndent() {
			this.$app.navTo('/pages/indent/list');
		},

		/**
		 * 判断是否登录
		 */
		async checkLogin() {
			if (this.$db.get('token')) {
				const { data: res } = await this.$http.get('mine/index');
				if (res.code !== 200) return this.$message.toast(res.msg);
				if (res.data.is_owner !== '0') {
					this.money = res.data.money;
					this.withdraw_money = res.data.withdraw_money;
				}
				(this.nickname = res.data.nickname), (this.photo = res.data.photo), (this.is_owner = res.data.is_owner), (this.sex = res.data.sex);
				this.mobile = res.data.mobile;
				this.isLogin = true;
			} else {
				(this.money = '0.00'), (this.withdraw_money = '0.00'), (this.isLogin = false);
			}
		}
	}
};
</script>

<style lang="scss">
@import '../../static/css/my/my.scss';
.btn {
	border-radius: 50rpx;
	color: #ffffff !important;
	background-color: $uni-theme-color !important;
}
</style>
