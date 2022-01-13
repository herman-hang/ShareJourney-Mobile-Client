import Vue from 'vue'
//全局时间戳过滤器
Vue.filter('date', function(unixtime) {
  // 时间戳转换为日期时间 --年月日 时分秒
  var now = new Date(unixtime * 1000); // 依情况进行更改 * 1
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + now.toTimeString().substr(0, 8);
})
//全局时间过滤器 (elementUI时间戳转换)
Vue.filter('timestamp', function(originVal) {
  const dt = new Date(originVal);
  //年
  const y = dt.getFullYear();
  //月    这里加1时因为Month是从0开始，月份没有0月，后面的padStart代表如果时间不足两位则用0补充
  const m = (dt.getMonth() + 1 + '').padStart(2, '0');
  //日
  const d = (dt.getDay() + '').padStart(2, '0');
  //时
  /*  const hh = (dt.getHours() + '').padStart(2, '0');
    //分
    const mm = (dt.getMinutes() + '').padStart(2, '0');
    //秒
    const ss = (dt.getSeconds() + '').padStart(2, '0'); */
  return `${y}-${m}-${d}`;
})
