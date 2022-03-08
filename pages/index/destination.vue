<template>
	<view>
		<!-- 搜索框开始 -->
		<view class="card">
			<u-search
				@clickIcon="selectSite"
				@clear="clear"
				@blur="search"
				@custom="search"
				@search="search"
				searchIcon="map"
				:label="site.city"
				actionText="搜索"
				:actionStyle="actionStyle"
				focus
				:clearabled="true"
				shape="square"
				inputAlign="center"
				height="70"
				v-model="keyword"
			></u-search>
		</view>
		<!-- 搜索框结束 -->

		<!-- 加载图标开始 -->
		<u-loading-icon mode="circle" text="加载中" :show="!isShow"></u-loading-icon>
		<!-- 加载图标结束 -->

		<!-- 地点列表开始 -->
		<view class="card" v-show="isShow">
			<view v-for="(item, index) in cityData" :key="item.id">
				<view class="box">
					<view class="item-icon"><u-icon name="map" size="16"></u-icon></view>
					<view class="item-text" @click="selectSite(item)">
						<u--text :text="item.title"></u--text>
						<u--text :text="item.address" type="info" size="12"></u--text>
					</view>
				</view>
				<u-line></u-line>
			</view>
		</view>
		<!-- 地点列表结束 -->
	</view>
</template>

<script>
import QQMapWX from '../../static/js/qqmap/qqmap-wx-jssdk.min.js';
import { qqMapKey, qqMapSig } from '@/config.js';
export default {
	data() {
		return {
			// 搜索右边控件样式
			actionStyle: {
				color: '#409eff'
			},
			// 搜索关键词
			keyword: '',
			// 定位的城市
			site: {
				city: '定位中'
			},
			// 地点列表的数据
			cityData: [],
			// 控制加载图标
			isShow: false
		};
	},
	onLoad(option) {
		let vm = this;
		vm.init(option);
	},
	methods: {
		/**
		 * 初始化
		 */
		init(option) {
			let vm = this;
			// 对中文解码
			vm.site = JSON.parse(decodeURIComponent(decodeURIComponent(option.item)));
			// 实例化腾讯地图API
			vm.qqmapsdk = new QQMapWX({
				key: qqMapKey
			});
			vm.getCity(vm.site.city);
		},

		/**
		 * 获取城市周边地点
		 * @param {Object} keyword //搜索关键词
		 */
		getCity(keyword) {
			let vm = this;
			vm.qqmapsdk.search({
				keyword: keyword, //搜索关键词
				sig: qqMapSig,
				page_size: 20,
				success: function(res) {
					if (res.status === 0) {
						vm.cityData = res.data;
						vm.isShow = true;
					}
				}
			});
		},

		/**
		 * 选择地址
		 */
		selectSite(address = '') {
			let vm = this;
			if (address === '') {
				uni.chooseLocation({
					success(res) {
						if (res.name === '' || res.name === null || res.name === undefined) {
							vm.$message.toast('请选择地点再确定');
							setTimeout(function() {
								vm.selectSite();
							}, 2000);
							return false;
						}
						const item = JSON.stringify({
							start: vm.site,
							end: {
								address: res.name,
								longitude: res.longitude,
								latitude: res.latitude
							}
						});
						vm.site.type === 0
							? vm.$app.navTo('/pages/index/plan?item=' + encodeURIComponent(item))
							: vm.$app.navTo('/pages/index/owner?item=' + encodeURIComponent(item));
					}
				});
			} else {
				const item = JSON.stringify({
					start: vm.site,
					end: {
						address: address.title,
						longitude: address.location.lng,
						latitude: address.location.lat
					}
				});
				vm.site.type === 0 ? vm.$app.navTo('/pages/index/plan?item=' + encodeURIComponent(item)) : vm.$app.navTo('pages/index/owner?item=' + encodeURIComponent(item));
			}
		},

		/**
		 * 清空文本触发
		 */
		clear() {
			let vm = this;
			vm.keywords = '';
		},

		/**
		 * 内容发生变化时
		 */
		search() {
			let vm = this;
			vm.getSuggestion(vm.keyword);
		},
		
		/**
		 * 搜索地名关键词
		 */
		getSuggestion(keyword){
			let vm = this;
			vm.qqmapsdk.getSuggestion({
				keyword: keyword, //搜索关键词
				sig: qqMapSig,
				page_size: 20,
				success: function(res) {
					if (res.status === 0) {
						vm.cityData = res.data;
						vm.isShow = true;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.card {
	margin: 0 0 15rpx 0;
	border-radius: 0;
}
.box {
	display: flex;
	margin: 20rpx 10rpx;
	.item-icon {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}
}
</style>
