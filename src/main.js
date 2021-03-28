import Vue from 'vue'
import App from './App.vue'
import 'jquery'
import 'jquery-ui'
import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap3/dist/js/bootstrap.min'
import axios from 'axios'
import router from './router.js'
import '@/assets/icons/iconfont.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

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

  //将它们拼接成完整的字符串
  //return 'yyyy-mm-dd hh:mm:ss'  可以改成下面的方法
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
