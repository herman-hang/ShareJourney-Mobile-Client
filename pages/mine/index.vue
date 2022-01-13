<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="ym-content">
		<view class="my-1">
			<view class="my-3">
				<image src="/static/image/sex/man.png" mode="scaleToFill" border="0" class="my-4 head"></image>
				<view class="my-5">
					<text decode="true" class="my-7">小航</text>
					<text decode="true" class="my-8">152****3238</text>
				</view>
				<image src="/static/image/my/images/my_6_6.jpg" mode="scaleToFill" border="0" class="my-6"></image>
			</view>
			<view class="my-2">
				<view class="my-9">
					<view class="my-10">
						<text decode="true" class="my-13">收入余额</text>
						<text decode="true" class="my-14">￥0.00</text>
						<view class="my-15">
							<image src="/static/image/my/images/my_16_16.jpg" mode="scaleToFill" border="0" class="my-16"></image>
							<image src="/static/image/my/images/my_17_17.jpg" mode="scaleToFill" border="0" class="my-17"></image>
						</view>
					</view>
					<view class="my-11"></view>
					<view class="my-12">
						<text decode="true" class="my-18">总提现额</text>
						<text decode="true" class="my-19">￥0.00</text>
						<view class="my-20">
							<image src="/static/image/my/images/my_21_21.jpg" mode="scaleToFill" border="0" class="my-21"></image>
							<image src="/static/image/my/images/my_22_22.jpg" mode="scaleToFill" border="0" class="my-22"></image>
						</view>
					</view>
				</view>
				<!-- 				<view class="my-23">
					<view class="my-24">
						<image  src="/static/image/my/images/my_25_25.jpg" mode="scaleToFill" border="0" class="my-25"></image>
						<text decode="true" class="my-26">我的发布</text>
					</view>
					<view class="my-27">
						<image src="/static/image/my/images/my_28_28.jpg" mode="scaleToFill" border="0" class="my-28"></image>
						<text decode="true" class="my-29">我的接单</text>
					</view>
					<view class="my-30">
						<image src="/static/image/my/images/my_31_31.jpg" mode="scaleToFill" border="0" class="my-31"></image>
						<text decode="true" class="my-32">开通会员</text>
					</view>
					<view class="my-33">
						<image src="/static/image/my/images/my_34_34.jpg" mode="scaleToFill" border="0" class="my-34"></image>
						<text decode="true" class="my-35">首页广告</text>
					</view>
				</view> -->
				<view class="my-36">
					<view class="my-37">
						<image src="/static/image/my/images/my_money.jpg" mode="scaleToFill" border="0" class="my-38"></image>
						<text decode="true" class="my-39">我的钱包</text>
						<image src="/static/image/my/images/my_40_40.jpg" mode="scaleToFill" border="0" class="my-40"></image>
					</view>
					<view class="my-41">
						<image src="/static/image/my/images/my_42_42.jpg" mode="scaleToFill" border="0" class="my-42"></image>
						<text decode="true" class="my-43">旅行记录</text>
						<image src="/static/image/my/images/my_44_44.jpg" mode="scaleToFill" border="0" class="my-44"></image>
					</view>
					<view class="my-45">
						<image src="/static/image/my/images/my_46_46.jpg" mode="scaleToFill" border="0" class="my-46"></image>
						<text decode="true" class="my-47">车主认证</text>
						<image src="/static/image/my/images/my_48_48.jpg" mode="scaleToFill" border="0" class="my-48"></image>
					</view>
				</view>
				<view class="my-49">
					<!-- <view class="my-50">
						<image src="/static/image/my/images/my_51_51.jpg" mode="scaleToFill" border="0" class="my-51"></image>
						<text decode="true" class="my-52">我的消息</text>
						<image src="/static/image/my/images/my_53_53.jpg" mode="scaleToFill" border="0" class="my-53"></image>
					</view> -->
					<view class="my-54">
						<image src="/static/image/my/images/my_28_28.jpg" mode="scaleToFill" border="0" class="my-55"></image>
						<text decode="true" class="my-56">我的订单</text>
						<image src="/static/image/my/images/my_57_57.jpg" mode="scaleToFill" border="0" class="my-57"></image>
					</view>
					<view class="my-58">
						<image src="/static/image/my/images/my_59_59.jpg" mode="scaleToFill" border="0" class="my-59"></image>
						<text decode="true" class="my-60">法律条款</text>
						<image src="/static/image/my/images/my_61_61.jpg" mode="scaleToFill" border="0" class="my-61"></image>
					</view>
					<view class="my-62">
						<image src="/static/image/my/images/my_63_63.jpg" mode="scaleToFill" border="0" class="my-63"></image>
						<text decode="true" class="my-64">系统设置</text>
						<image src="/static/image/my/images/my_65_65.jpg" mode="scaleToFill" border="0" class="my-65"></image>
					</view>
				</view>
				<view class="my-1 my-2 my-99"><button class="btn" type="default">退出登录</button></view>
			</view>
		</view>
	</view>
</template>

<script>
// 定义全局参数,控制数据加载
var _self,
	page = 1,
	timer = null;
export default {
	data() {
		return {
			loadingText: '',
			animation: '',
			animationData: {},
			page: 0, //当前分页页码
			apiUrl: 'https://www.ymznkf.com/wx_server', //后端接口地址
			id: '', //传值使用,方便存在本地的locakStorage
			del_id: '' //方便存在本地的locakStorage
		};
	},
	options: { styleIsolation: 'shared' },
	components: {},
	onLoad(options) {
		_self = this;

		//检查是否登录参考代码,需要用的时候，可以把注释取掉
		//if(this.checkLogin()==false){
		//	return;
		//}

		//this.getLaction();//得到gps

		this.page = 0;

		//检测有没有传入id参数
		if (options.id != null && options.id != '') {
			this.id = options.id;
		}

		// 初始化一个动画
		var animation = uni.createAnimation({
			transformOrigin: '50% 0 50%',
			duration: 1000, //动画持续1秒
			timingFunction: 'linear', //linear 全程匀速运动
			delay: 200 //延迟两秒执行动画
		});
		this.animation = animation;

		//执行初始化,需要用的时候，可以把注释取掉
		//this.Refresh("init");
	},
	onShow() {
		console.log('on show');
		//if(this.checkLogin()==false){
		//	return;
		//}

		//执行初始化,需要用的时候，可以把注释取掉
		//this.Refresh("init");
	},
	onPullDownRefresh: function() {
		//下拉刷新的时候请求一次数据
		this.Refresh();
	},
	methods: {
		//刷新数据
		Refresh: function(_action) {
			uni.showLoading();

			//提交到服务器
			var that = this;
			var url = that.apiUrl + '{server_code_file_path}';
			console.log(url);
			uni.request({
				url: url, //后端接口地址，需要改成自己的接口地址
				data: {
					action: _action, //上传动作，如按钮点击会产生click动作，分页也会产生，在后端根据具体的动作来判断事件
					uid: that.getUid(), //上传用户id,在登录中获得
					//上传页面中的变量
					//定义变量---start

					//定义变量---end
					id: that.id, //上传id值，后端可以根据此值来操作当前id
					del_id: that.del_id, //在列表中删除按钮选中时，上传到有后端，进行删除操作
					page: that.page
				},
				method: 'GET',
				success: function(res) {
					//后端返回数据

					// 隐藏导航栏加载框
					uni.hideNavigationBarLoading();
					// 停止下拉动作
					uni.stopPullDownRefresh();

					// 隐藏加载框
					uni.hideLoading();

					var tmp = res.data;

					//初始化，对页面上的控件进行赋值操作
					if (_action == 'init') {
					}

					//如果后端有返回消息，则弹出消息提示
					if (tmp.message != null && tmp.message != '') {
						uni.showToast({
							title: tmp.message,
							icon: 'none',
							duration: 2000
						});
					}

					//如果后端有返回页码，则更改当前页码
					if (tmp.page != null && tmp.page != '') {
						page = tmp.page;
					}
				},
				fail: function(res) {
					uni.showToast({
						title: '服务器访问失败',
						icon: 'none',
						duration: 2000
					});
					console.log(res.data);
					console.log('is failed');
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../static/css/my.scss';
.btn {
	border-radius: 50rpx;
	color: #ffffff !important;
	background-color: $uni-theme-color !important;
}

</style>
