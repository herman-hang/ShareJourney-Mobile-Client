<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {}
};
</script>

<style lang="scss">
@import '@/uni_modules/uview-ui/index.scss';
@import './static/css/login/main.css';
@import './static/css/register/icon.css';
@import './static/css/login/common.css';
@import './static/css/login/simplepro.css';
@import './static/css/icon/iconfont.css';

/*每个页面公共css */
/* body,
html {
	overflow-x: hidden;
} */
body::-webkit-scrollbar {
	display: none;
}
// #ifdef MP-WEIXIN
Page {
	background-color: #f3f5f3;
}
// #endif
.icon {
	font-family: iconfont;
	margin-left: 20rpx;
}
uni-page-body,
#app {
	height: 100%;
}
.container {
	// #ifdef H5
	white-space: normal;
	background-color: #f3f5f3;
	width: 100%;
	height: 100%;
	padding: 0upx;
	clear: both;
	float: left;	
	border-radius: 0upx;
	// #endif
	// #ifdef APP-PLUS
	white-space: normal;
	width: 749upx;
	height: 1300upx;
	padding: 0upx;
	clear: both;
	float: left;
	background-color: #f3f5f3;
	border-radius: 0upx;
	// #endif
}
.card {
	margin: 10rpx 20rpx;
	background-color: #ffffff;
	padding: 15rpx;
	border-radius: 15rpx;
	// box-shadow: 0px 3px 5px 0px rgba(65, 106, 123, 0.2);
}
</style>
