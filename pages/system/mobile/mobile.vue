<template>
	<view class="container">
		<view class="card">
			<u-empty slot="bottom" textColor="#333" :text="'您的手机号码:' + mobile" icon="/static/image/bind/mobile.png">
				<template>
					<u-button size="mini" shape="circle" text="更换" @click="toChange"></u-button>
				</template>
			</u-empty>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 手机号码
			mobile: ''
		};
	},
	onLoad() {
		let vm = this;
		vm.getMobile();
	},
	methods: {
		/**
		 * 跳转到更换手机
		 */
		toChange() {
			let vm = this;
			vm.$app.navTo('/pages/system/mobile/change?mobile=' + vm.mobile);
		},

		/**
		 * 获取手机号码
		 */
		async getMobile() {
			let vm = this;
			const { data: res } = await this.$http.get('mine/index');
			if (res.code !== 200) return this.$message.toast(res.msg);
			vm.mobile = res.data.mobile;
		}
	}
};
</script>

<style lang="scss" scoped></style>
