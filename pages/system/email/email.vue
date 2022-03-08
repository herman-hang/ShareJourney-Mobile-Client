<template>
	<view class="container">
		<view class="card">
			<u-empty slot="bottom" textColor="#333" :text="email !== '' ? '您的邮箱:' + email : '请绑定安全邮箱地址'" icon="/static/image/bind/email.png">
				<template>
					<u-button type="primary" size="mini" shape="circle" text="绑定" v-if="email == ''" @click="toBind"></u-button>
					<u-button size="mini" shape="circle" text="更换" v-else @click="toChange"></u-button>
				</template>
			</u-empty>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 邮箱地址
			email: ''
		};
	},
	onLoad() {
		let vm = this;
		vm.getEmail();
	},
	methods: {
		/**
		 * 获取邮箱地址
		 */
		async getEmail() {
			let vm = this;
			const { data: res } = await vm.$http.get('system/query/email');
			if (res.code !== 200) return vm.$message.toast(res.msg);
			if (res.data.email !== null) {
				vm.email = res.data.email;
			}
		},

		/**
		 * 更换邮箱地址
		 */
		toChange() {
			let vm = this;
			vm.$app.navTo('/pages/system/email/change?email=' + vm.email);
		},

		/**
		 * 绑定邮箱
		 */
		toBind() {
			let vm = this;
			vm.$app.navTo('/pages/system/email/bind?email=' + vm.email);
		}
	}
};
</script>

<style lang="scss" scoped></style>
