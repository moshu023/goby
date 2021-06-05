import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
// 导入阿里图标
import './assets/font-menu/iconfont.css'
import './assets/font-menu/font-menu'
import axios from 'axios'
import echarts from 'echarts'
import VCharts from 'v-charts-v2'
// 配置请求的root路径
// axios.defaults.baseURL = 'http://10.245.150.34:9999'
// // 设置axios
// axios.get('/submitTask').then(res => {
//   console.log(res)
// })
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
