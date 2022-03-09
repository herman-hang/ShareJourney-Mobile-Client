<template>
	<view class="container">
		<view class="u-flex-col u-p-30 u-col-center">
			<u-upload @afterRead="afterRead">
				<u-image v-if="materialForm.photo" width="150rpx" height="150rpx" :src="materialForm.photo" shape="circle"></u-image>
				<u-image v-else width="150rpx" height="150rpx" :src="materialForm.sex == '0' ? '/static/image/sex/girl.png' : '/static/image/sex/man.png'" shape="circle"></u-image>
				<text class="change">更换头像</text>
			</u-upload>
		</view>
		<view class="card">
			<u--form :rules="rules" labelPosition="left" ref="materialFormRef" :model="materialForm">
				<u-form-item labelWidth="160rpx" label="用户名" borderBottom><u--text type="info" :text="materialForm.user"></u--text></u-form-item>
				<u-form-item labelWidth="160rpx" label="注册时间" borderBottom><u--text type="info" :text="materialForm.create_time | date"></u--text></u-form-item>
				<u-form-item prop="nickname" labelWidth="160rpx" label="昵称" borderBottom>
					<u--input @change="saveMaterial()" v-model="materialForm.nickname" placeholder="请输入昵称" border="none"></u--input>
				</u-form-item>
				<u-form-item prop="sex" @click="showSex = true" labelWidth="160rpx" label="性别" borderBottom>
					<u--input v-model="sexValue" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item prop="age" labelWidth="160rpx" label="年龄" borderBottom>
					<u--input  @change="saveMaterial()" v-model="materialForm.age" placeholder="请输入年龄" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="160rpx" label="地区" borderBottom>
					<u--input @change="saveMaterial()" v-model="materialForm.region" placeholder="请输入地区" border="none"></u--input>
				</u-form-item>
				<u-form-item prop="qq" labelWidth="160rpx" label="QQ号码" borderBottom>
					<u--input @change="saveMaterial()" v-model="materialForm.qq" placeholder="请输入QQ号码" border="none"></u--input>
				</u-form-item>
				<u-form-item prop="introduction" labelWidth="160rpx" label="简介" borderBottom>
					<u--textarea @blur="saveMaterial()" @input="saveMaterial()" v-model="materialForm.introduction" placeholder="请输入简介"></u--textarea>
				</u-form-item>
			</u--form>

			<!-- 性别选择组件 -->
			<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false" @select="sexSelect"></u-action-sheet>
		</view>
	</view>
</template>

<script>
import { uploadFilePromise } from '@/common/app.js';
export default {
	data() {
		return {
			// 性别选择框
			showSex: false,
			// 性别值
			sexValue: '',
			// 表单数据绑定
			materialForm: {
				photo: '',
				sex: '0'
			},
			actions: [
				{
					name: '男',
					index: '1'
				},
				{
					name: '女',
					index: '0'
				},
				{
					name: '保密',
					index: '2'
				}
			],
			// 表单验证规则
			rules: {
				nickname: {
					type: 'string',
					required: true,
					message: '请填写昵称',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	onLoad() {
		this.getMaterial();
	},
	methods: {
		/**
		 * 选择性别复制
		 * @param {Object} e
		 */
		sexSelect(e) {
			this.materialForm.sex = e.index;
			this.sexValue = e.name;
			this.saveMaterial();
		},

		/**
		 * 获取个人资料
		 */
		async getMaterial() {
			const { data: res } = await this.$http.get('mine/material');
			if (res.code !== 200) return this.$message.toast(res.msg);
			this.materialForm = res.data;
			switch (res.data.sex) {
				case '0':
					this.sexValue = '女';
					break;
				case '1':
					this.sexValue = '男';
					break;
				case '2':
					this.sexValue = '保密';
					break;
				default:
					return this.toast('性别参数错误！');
			}
		},

		/**
		 * 保存个人资料
		 */
		async saveMaterial() {
			const { data: res } = await this.$http.post('mine/material', this.materialForm);
			if (res.code !== 200) return this.$message.toast(res.msg);
		},

		/**
		 * 上传图片
		 * @param {Object} event
		 */
		async afterRead(event) {
			const res = await uploadFilePromise(event.file.url, 'image');
			if (res.code !== 200) this.$message.toast(res.msg);
			this.materialForm.photo = res.data[0];
			this.saveMaterial();
		}
	}
};
</script>

<style lang="scss" scoped>
.u-padding-30,
.u-p-30 {
	padding: 14px !important;
}
.u-flex-col {
	display: flex;
	flex-direction: column;
}
.u-col-center {
	align-items: center;
}
.change {
	color: $uni-theme-color;
	text-align: center;
}
</style>
