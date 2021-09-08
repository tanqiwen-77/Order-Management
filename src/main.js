// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
import qs from 'qs'

Vue.prototype.$qs = qs


// 配置请求的跟路径
axios.defaults.baseURL = 'http://182.92.83.129/'

Vue.prototype.$http = axios

Vue.config.productionTip = false
var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth //获取屏幕宽度
var  htmlDom = document.getElementsByTagName('html')[0] //获取html
htmlDom.style.fontSize = htmlWidth*16/1071 + 'px'; //设置html字体大小为屏幕的十分之一
console.log(htmlWidth)
//监听窗口大小改变
window.addEventListener('resize', () => {
    var  htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    var  htmlDom = document.getElementsByTagName('html')[0]
    htmlDom.style.fontSize = htmlWidth *16/1071+ 'px';
}) 
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
      next('/login');
  }else {
          next();
      }
  }
);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
