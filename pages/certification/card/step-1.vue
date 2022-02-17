<template>
	<view class="container">
		<view class="card">
			<view class="step">
				<u-upload ref="uUpload" name="1" :fileList="frontList" @delete="deletePic" @afterRead="afterRead" width="300" height="150" multiple :maxCount="1"></u-upload>
				<text>（身份证正面）</text>
			</view>
			<view class="step">
				<u-upload ref="uUpload" name="2" :fileList="versoList" @delete="deletePic" @afterRead="afterRead" width="300" height="150" multiple :maxCount="1"></u-upload>
				<text>（身份证反面）</text>
			</view>
			<u-button type="primary" text="下一步" @click="toNext"></u-button>
		</view>
	</view>
</template>

<script>
import { uploadFilePromise } from '@/common/app.js';
export default {
	data() {
		return {
			// 身份证正面
			frontList: [],
			// 身份证反面
			versoList: []
		};
	},
	onLoad() {},
	methods: {
		/**
		 * 上传图片
		 * @param {Object} event
		 */
		async afterRead(event) {
			if (event.name === '1') {
				this.frontList.push({ url: event.file[0].url });
			} else {
				this.versoList.push({ url: event.file[0].url });
			}
		},

		/**
		 * 删除图片
		 * @param {Object} event
		 */
		deletePic(event) {
			if (event.name === '1') {
				this.frontList = [];
			} else {
				this.versoList = [];
			}
		},

		/**
		 * 下一步
		 */
		async toNext() {
			if (this.frontList === [] || this.versoList === []) {
				this.$message.toast('请上传身份证正反面！');
			}
			this.$message.loading('加载中...');
			// 上传身份证正面
			const frontRes = await uploadFilePromise(this.frontList[0].url, 'image');
			// 上传身份证反面
			const versoRes = await uploadFilePromise(this.versoList[0].url, 'image');
			if (frontRes.code !== 200 || versoRes.code !== 200) {
				uni.hideLoading();
				this.$message.toast('请重新加载身份证正反面！');
			}
			const { data: res } = await this.$http.post('mine/authentication/next', { card_front: frontRes.data[0], card_verso: versoRes.data[0] });
			if (res.code !== 200) {
				uni.hideLoading();
				return this.$message.toast(res.msg);
			}
			uni.hideLoading();
			this.$app.navTo('/pages/certification/card/step-2');
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
