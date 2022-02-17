<template>
	<view class="container">
		<view class="card">
			<u--form labelPosition="left" :model="formData" :rules="formRules" ref="formRef">
				<u-form-item labelWidth="80" label="真实姓名" prop="name" borderBottom>
					<u--input placeholder="请输入真实姓名" v-model="formData.name" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="身份证号码" prop="card" borderBottom>
					<u--input placeholder="请输入身份证号码" v-model="formData.card" border="none"></u--input>
				</u-form-item>
				<u-form-item><u-button type="primary" text="提交" @click="toSubmit"></u-button></u-form-item>
			</u--form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 表单数据绑定
			formData: {
				name: '',
				card: ''
			},
			// 表单验证规则
			formRules: {
				name: {
					type: 'string',
					required: true,
					message: '请填写真实姓名',
					trigger: ['blur', 'change']
				},
				card: {
					type: 'string',
					required: true,
					message: '请填写身份证号码',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	onLoad() {},
	methods: {
		/**
		 * 实名认证提交
		 */
		async toSubmit() {
			const { data: res } = await this.$http.post('mine/authentication/submit', this.formData);
			if (res.code !== 200) return this.$message.toast(res.msg);
			this.$app.navTo('/pages/certification/index');
		}
	}
};
</script>

<style lang="scss" scoped></style>
