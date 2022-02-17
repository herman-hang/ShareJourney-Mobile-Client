<template>
	<view>
		<view class="u-content" v-if="status === '2'">
			<view class="u-content__circle success"><u-icon name="checkbox-mark" color="#fff" size="30"></u-icon></view>
			<text class="u-content__normal success-text">已认证成功</text>
			<u-button type="success" text="返回" plain @click="toMine"></u-button>
		</view>
		<view class="u-content" v-else-if="status === '1'">
			<view class="u-content__circle audit"><u-icon name="clock" color="#fff" size="30"></u-icon></view>
			<text class="u-content__normal audit-text">已提交，等待审核中</text>
			<u-button type="info" text="返回" plain @click="toMine"></u-button>
		</view>
		<view class="u-content" v-else>
			<view class="u-content__circle reject"><u-icon name="close" color="#fff" size="30"></u-icon></view>
			<text class="u-content__normal reject-text">已驳回，原因：{{ cause }}</text>
			<u-button type="error" text="重新认证" plain @click="toAuth"></u-button>
		</view>
	</view>
</template>

<script>
import * as db from '../../utils/db.js';
export default {
	data() {
		return {
			// 显示状态
			status: '',
			// 驳回原因
			cause: ''
		};
	},
	onLoad(option) {
		if (option.status == '3') {
			db.set('reject', option.cause);
			this.cause = option.cause;
		} else {
			db.del('reject');
			this.status = option.status;
		}
	},
	methods: {
		/**
		 * 重新认证
		 */
		toAuth() {
			this.$app.navTo('/pages/certification/index');
		},
		
		/**
		 * 跳转到我的
		 */
		toMine(){
			uni.switchTab({
				url: '/pages/mine/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.u-content {
	padding: 150px 60px 0;
	@include flex(column);
	align-items: center;
	justify-content: center;

	&__circle {
		// background-color: $u-success;
		@include flex;
		border-radius: 100px;
		width: 60px;
		height: 60px;
		align-items: center;
		justify-content: center;
	}

	&__normal {
		font-size: 15px;
		// color: $u-success;
		margin-top: 15px;
	}
}
.success {
	background-color: $u-success;
}
.success-text {
	color: $u-success;
	margin-bottom: 20rpx;
}
.reject {
	background-color: $uni-color-error;
}
.reject-text {
	color: $uni-color-error;
	margin-bottom: 20rpx;
}
.audit {
	background-color: $uni-color-primary;
}
.audit-text {
	color: $uni-text-color-disable;
	margin-bottom: 20rpx;
}
</style>
