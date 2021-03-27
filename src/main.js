import Vue from 'vue'
import App from './App.vue'
import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap3/dist/js/bootstrap.min'
import axios from 'axios'
import router from './router.js'

import '@/assets/icons/iconfont.css'

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
