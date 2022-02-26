<template>
	<view class="container">
		<!-- 搜索框开始 -->
		<u-search :showAction="false" margin="20rpx" placeholder="请输入关键字" bgColor="#ffffff"></u-search>
		<!-- 搜索框结束 -->
		<view class="u-page">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in indexList" :key="index">
					<u-cell :title="`用户-${index + 1}`">
						<u-avatar slot="icon" size="35" :src="item.url" customStyle="margin: -3px 5px -3px 0"></u-avatar>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			indexList: [],
			urls: [
				'https://cdn.uviewui.com/uview/album/1.jpg',
				'https://cdn.uviewui.com/uview/album/2.jpg',
				'https://cdn.uviewui.com/uview/album/3.jpg',
				'https://cdn.uviewui.com/uview/album/4.jpg',
				'https://cdn.uviewui.com/uview/album/5.jpg',
				'https://cdn.uviewui.com/uview/album/6.jpg',
				'https://cdn.uviewui.com/uview/album/7.jpg',
				'https://cdn.uviewui.com/uview/album/8.jpg',
				'https://cdn.uviewui.com/uview/album/9.jpg',
				'https://cdn.uviewui.com/uview/album/10.jpg'
			]
		};
	},
	onLoad() {
		this.loadmore();
	},
	methods: {
		scrolltolower() {
			this.loadmore();
		},
		loadmore() {
			for (let i = 0; i < 30; i++) {
				this.indexList.push({
					url: this.urls[uni.$u.random(0, this.urls.length - 1)]
				});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.a {
}
</style>
