
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/index/destination","pages/index/owner","pages/index/plan","pages/index/call","pages/index/navigation","pages/journey/list","pages/chat/conversations","pages/chat/private/chat","pages/mine/index","pages/mine/withdraw","pages/mine/income","pages/login/index","pages/login/login","pages/login/bind","pages/register/register","pages/password/password","pages/login/agreement","pages/login/policy","pages/money/index","pages/money/withdraw","pages/terms/index","pages/material/index","pages/certification/index","pages/certification/agreement","pages/certification/card/step-1","pages/certification/card/step-2","pages/certification/withdraw/info","pages/certification/car/info","pages/certification/patente/patente","pages/certification/registration/registration","pages/certification/message","pages/money/rule","pages/indent/list","pages/record/list","pages/system/system","pages/system/about","pages/system/about/introduce","pages/system/password"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"共享旅途","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","scrollIndicator":"none"},"tabBar":{"color":"#bfbfbf","selectedColor":"#409eff","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/image/tabbar/index.png","selectedIconPath":"static/image/tabbar/index-active.png","text":"首页"},{"pagePath":"pages/journey/list","iconPath":"static/image/tabbar/car.png","selectedIconPath":"static/image/tabbar/car-active.png","text":"旅途"},{"pagePath":"pages/chat/conversations","iconPath":"static/image/tabbar/comment.png","selectedIconPath":"static/image/tabbar/comment-active.png","text":"消息"},{"pagePath":"pages/mine/index","iconPath":"static/image/tabbar/my.png","selectedIconPath":"static/image/tabbar/my-active.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":false},"appname":"共享旅途","compilerVersion":"3.3.11","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"共享旅途"}},{"path":"/pages/index/destination","meta":{},"window":{"navigationBarTitleText":"选择目的地"}},{"path":"/pages/index/owner","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"出发详情"}},{"path":"/pages/index/plan","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"出发详情"}},{"path":"/pages/index/call","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"出发详情"}},{"path":"/pages/index/navigation","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"出发路线"}},{"path":"/pages/journey/list","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"旅途列表"}},{"path":"/pages/chat/conversations","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"消息"}},{"path":"/pages/chat/private/chat","meta":{},"window":{"navigationBarTitleText":"私聊"}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","backgroundTextStyle":"dark"}},{"path":"/pages/mine/withdraw","meta":{},"window":{"navigationBarTitleText":"提现明细"}},{"path":"/pages/mine/income","meta":{},"window":{"navigationBarTitleText":"账单"}},{"path":"/pages/login/index","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/login/bind","meta":{},"window":{"navigationBarTitleText":"绑定手机"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"新用户注册"}},{"path":"/pages/password/password","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/login/agreement","meta":{},"window":{"navigationBarTitleText":"用户服务协议"}},{"path":"/pages/login/policy","meta":{},"window":{"navigationBarTitleText":"隐私政策"}},{"path":"/pages/money/index","meta":{},"window":{"navigationBarTitleText":"我的钱包"}},{"path":"/pages/money/withdraw","meta":{},"window":{"navigationBarTitleText":"申请提现"}},{"path":"/pages/terms/index","meta":{},"window":{"navigationBarTitleText":"法律条款"}},{"path":"/pages/material/index","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/certification/index","meta":{},"window":{"navigationBarTitleText":"车主认证"}},{"path":"/pages/certification/agreement","meta":{},"window":{"navigationBarTitleText":"车主认证协议"}},{"path":"/pages/certification/card/step-1","meta":{},"window":{"navigationBarTitleText":"实名认证"}},{"path":"/pages/certification/card/step-2","meta":{},"window":{"navigationBarTitleText":"实名认证"}},{"path":"/pages/certification/withdraw/info","meta":{},"window":{"navigationBarTitleText":"提现信息"}},{"path":"/pages/certification/car/info","meta":{},"window":{"navigationBarTitleText":"车辆信息"}},{"path":"/pages/certification/patente/patente","meta":{},"window":{"navigationBarTitleText":"驾驶证上传"}},{"path":"/pages/certification/registration/registration","meta":{},"window":{"navigationBarTitleText":"行驶证上传"}},{"path":"/pages/certification/message","meta":{},"window":{"navigationBarTitleText":"认证情况","navigationStyle":"custom"}},{"path":"/pages/money/rule","meta":{},"window":{"navigationBarTitleText":"提现规则"}},{"path":"/pages/indent/list","meta":{},"window":{"navigationBarTitleText":"我的订单"}},{"path":"/pages/record/list","meta":{},"window":{"navigationBarTitleText":"旅行记录"}},{"path":"/pages/system/system","meta":{},"window":{"navigationBarTitleText":"系统设置"}},{"path":"/pages/system/about","meta":{},"window":{"navigationBarTitleText":"关于"}},{"path":"/pages/system/about/introduce","meta":{},"window":{"navigationBarTitleText":"功能介绍"}},{"path":"/pages/system/password","meta":{},"window":{"navigationBarTitleText":"修改密码"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
