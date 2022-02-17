<template>
	<view class="container">
		<view class="card">
			<u--form labelPosition="left" :model="formData" :rules="formRules" ref="formRef">
				<u-form-item labelWidth="80" label="支付宝账户" prop="alipay" borderBottom>
					<u--input placeholder="请输入支付宝账户" v-model="formData.alipay" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="110" label="支付宝真实姓名" prop="alipay_name" borderBottom>
					<u--input placeholder="请输入支付宝真实姓名" v-model="formData.alipay_name" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="70" label="微信账户" prop="wxpay" borderBottom>
					<u--input placeholder="请输入微信账户" v-model="formData.wxpay" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="100" label="微信真实姓名" prop="wxpay_name" borderBottom>
					<u--input placeholder="请输入微信真实姓名" v-model="formData.wxpay_name" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="70" label="银行卡号" prop="bank_card" borderBottom>
					<u--input placeholder="请输入银行卡号" v-model="formData.bank_card" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="银行卡姓名" prop="bank_card_name" borderBottom>
					<u--input placeholder="请输入银行卡姓名" v-model="formData.bank_card_name" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="银行卡类型" prop="bank_card_type" borderBottom>
					<u--input placeholder="如:中国农业银行" v-model="formData.bank_card_type" border="none"></u--input>
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
				alipay: '',
				alipay_name: '',
				wxpay: '',
				wxpay_name: '',
				bank_card: '',
				bank_card_name: '',
				bank_card_type: ''
			},
			// 表单验证规则
			formRules: {
				alipay: {
					type: 'string',
					required: true,
					message: '请填写支付宝账户',
					trigger: ['blur', 'change']
				},
				alipay_name: {
					type: 'string',
					required: true,
					message: '请填写支付宝真实姓名',
					trigger: ['blur', 'change']
				},
				wxpay: {
					type: 'string',
					required: true,
					message: '请填写微信账户',
					trigger: ['blur', 'change']
				},
				wxpay_name: {
					type: 'string',
					required: true,
					message: '请填写微信真实姓名',
					trigger: ['blur', 'change']
				},
				bank_card: {
					type: 'string',
					required: true,
					message: '请填写银行卡号',
					trigger: ['blur', 'change']
				},
				bank_card: {
					type: 'string',
					required: true,
					message: '请填写银行卡号',
					trigger: ['blur', 'change']
				},
				bank_card_name: {
					type: 'string',
					required: true,
					message: '请填写银行卡姓名',
					trigger: ['blur', 'change']
				},
				bank_card_type: {
					type: 'string',
					required: true,
					message: '请填写银行卡类型',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	onLoad() {},
	methods: {
		/**
		 * 提交
		 */
		async toSubmit() {
			const { data: res } = await this.$http.post('mine/withdraw/info/submit', this.formData);
			if (res.code !== 200) return this.$message.toast(res.msg);
			this.$app.navTo('/pages/certification/index');
		}
	}
};
</script>

<style lang="scss" scoped></style>
