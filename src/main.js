import Vue from 'vue'
import App from './App.vue'
import 'jquery'
import 'jquery-ui'
import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap3/dist/js/bootstrap.min'
import axios from 'axios'
import router from './router.js'
import '@/assets/icons/iconfont.css'


import alert from '@/assets/js/alert' //这里引入的是js文件

Vue.prototype.alert = alert;




import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)



// axios.defaults.baseURL='http://47.94.251.61:8080'
axios.defaults.baseURL='http://127.0.0.1:8080'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.filter('dateTimeFormat',function(originVal){
  const dt = new Date(originVal)
  //年的时间
  const y = dt.getFullYear()
  //月的时间  .padStart 不足两位自动补0  2位长度
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  //日的时间
  const d = (dt.getDate() + '').padStart(2,'0')
  //小时
  const hh = (dt.getHours()+'').padStart(2,'0')
  //分钟
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  //秒数
  const ss = (dt.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.prototype.toast = function(msg){
  let duration = 1000;
  let div = document.createElement('div');
  div.style.cssText = "text-align: center;height:40px;"
  let m = document.createElement('span');
  m.innerHTML = msg;
  m.style.cssText = "opacity: 0.5;color: rgb(255, 255, 255);padding:8px 25px;text-align: center;border-radius: 4px;z-index: 999999;background: rgb(0, 0, 0);font-size: 18px;";
  div.appendChild(m)
  document.body.appendChild(div);
  setTimeout(function () {
    let d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function () {
      document.body.removeChild(div)
    }, d * 1000);
  }, duration);
}

Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  //年的时间
  const y = dt.getFullYear()
  //月的时间  .padStart 不足两位自动补0  2位长度
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  //日的时间
  const d = (dt.getDate() + '').padStart(2,'0')

  return `${y}-${m}-${d}`
})




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

