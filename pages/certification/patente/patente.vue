<template>
	<view class="container">
		<view class="card">
			<view class="step">
				<u-upload ref="uUpload" name="1" :fileList="fileList" @delete="deletePic" @afterRead="afterRead" width="300" height="150" multiple :maxCount="1"></u-upload>
				<text>（驾驶证照片）</text>
			</view>
			<u-button type="primary" text="提交" @click="toSubmit"></u-button>
		</view>
	</view>
</template>

<script>
import { uploadFilePromise } from '@/common/app.js';
export default {
	data() {
		return {
			// 驾驶证
			fileList: []
		};
	},
	onLoad() {},
	methods: {
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
		},

		/**
		 * 提交
		 */
		async toSubmit() {
			this.$message.loading('提交中...');
			// 上传车辆图片
			const result = await uploadFilePromise(this.fileList[0].url, 'image');
			const { data: res } = await this.$http.post('mine/patente/submit', {
				patente_url: result.data[0]
			});
			if (res.code !== 200) {
				uni.hideLoading();
				return this.$message.toast(res.msg);
			}
			uni.hideLoading();
			this.$app.navTo('/pages/certification/index');
		}
	}
};
</script>

<style lang="scss" scoped>
.step {
	text-align: center;
	margin-bottom: 25rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
/deep/.u-upload__button {
	margin: 0rpx !important;
}
</style>
