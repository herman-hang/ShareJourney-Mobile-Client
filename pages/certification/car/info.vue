<template>
	<view class="container">
		<view class="card">
			<u--form labelPosition="left" :model="formData" :rules="formRules" ref="formRef">
				<view class="step">
					<u-upload ref="uUpload" name="1" :fileList="fileList" @delete="deletePic" @afterRead="afterRead" width="300" height="150" multiple :maxCount="1"></u-upload>
					<text>（车辆照片）</text>
				</view>
				<u-form-item labelWidth="80" label="车牌号" prop="plate_number" borderBottom>
					<u--input placeholder="请输入车牌号" v-model="formData.plate_number" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="可载人数" prop="capacity" borderBottom>
					<u--input placeholder="请输入可载人数" v-model="formData.capacity" border="none"></u--input>
				</u-form-item>
				<u-form-item labelWidth="80" label="车辆颜色" prop="color" borderBottom>
					<u--input placeholder="请输入车辆颜色" v-model="formData.color" border="none"></u--input>
				</u-form-item>
				<u-form-item><u-button type="primary" text="提交" @click="toSubmit"></u-button></u-form-item>
			</u--form>
		</view>
	</view>
</template>

<script>
import { uploadFilePromise } from '@/common/app.js';
export default {
	data() {
		return {
			// 表单数据绑定
			formData: {
				plate_number: '',
				capacity: '',
				color: ''
			},
			// 车辆图片
			fileList: [],
			// 表单验证规则
			formRules: {
				plate_number: {
					type: 'string',
					required: true,
					message: '请填写车牌号',
					trigger: ['blur', 'change']
				},
				capacity: {
					type: 'string',
					required: true,
					message: '请填写可载人数',
					trigger: ['blur', 'change']
				},
				color: {
					type: 'string',
					required: true,
					message: '请填写车辆颜色',
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
			this.$message.loading('提交中...');
			// 上传车辆图片
			const result = await uploadFilePromise(this.fileList[0].url, 'image');
			const { data: res } = await this.$http.post('mine/car/info/submit', {
				plate_number: this.formData.plate_number,
				capacity: this.formData.capacity,
				color: this.formData.color,
				car_url: result.data[0]
			});
			if (res.code !== 200) {
				uni.hideLoading();
				return this.$message.toast(res.msg);
			}
			uni.hideLoading();
			this.$app.navTo('/pages/certification/index');
		},

		/**
		 * 上传图片
		 * @param {Object} event
		 */
		async afterRead(event) {
			this.fileList.push({ url: event.file[0].url });
		},

		/**
		 * 删除图片
		 * @param {Object} event
		 */
		deletePic(event) {
			this.fileList = [];
		}
	}
};
</script>

<style lang="scss" scoped>
.step {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}
/deep/.u-upload__button {
	margin: 0rpx !important;
}
</style>
