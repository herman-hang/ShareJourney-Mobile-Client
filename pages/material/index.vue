<template>
	<view class="container">
		<view class="u-flex-col u-p-30 u-col-center">
			<u-image width="150rpx" height="150rpx" :src="headImg" shape="circle"></u-image>
			<text class="u-p-t-10 change">更换头像</text>
		</view>
		<view class="card">
			<u--form labelPosition="left" ref="form1">
				<u-form-item labelWidth="160rpx" label="用户名" borderBottom><u--input disabled disabledColor="#fff" border="none"></u--input></u-form-item>
				<u-form-item labelWidth="160rpx" label="昵称" borderBottom><u--input placeholder="请输入昵称" border="none"></u--input></u-form-item>
				<u-form-item labelWidth="160rpx" label="性别" borderBottom><u--input placeholder="请选择性别" border="none"></u--input></u-form-item>
				<u-form-item labelWidth="160rpx" label="年龄" borderBottom><u--input placeholder="请输入年龄" border="none"></u--input></u-form-item>
				<u-form-item labelWidth="160rpx" label="地区" borderBottom><u--input placeholder="请输入地区" border="none"></u--input></u-form-item>
				<u-form-item labelWidth="160rpx" label="QQ号码" borderBottom><u--input placeholder="请输入QQ号码" border="none"></u--input></u-form-item>
				<u-form-item labelWidth="160rpx" label="注册时间" borderBottom><u--input border="none"></u--input></u-form-item>
				<u-form-item labelWidth="160rpx" label="简介" borderBottom><u--textarea placeholder="请输入简介"></u--textarea></u-form-item>
			</u--form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			headImg: '../../static/logo.png'
		};
	},
	onLoad() {},
	methods: {}
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
}
</style>
