import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/login'
import home from '../components/home'
import thing from '../components/thing'
import test from '../components/test'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', 
    redirect: '/login',
    },
    {
      path: '/login',
      
      component: login,
      meta: { title: '登录页面' }
    },
    {
      path: '/test',
      
      component: test,
      meta: { title: '查询页面' }
    },
   
    {
      path: '/home',
      
      component: home,
      
      children: [
        {
            path: 'thing',
            component: thing,
            meta: { title: '管理页面' },
        },]
    },
  ]
})
