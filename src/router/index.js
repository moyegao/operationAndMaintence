import Vue from 'vue'
import Router from 'vue-router'
import baseInfo from "./modules/baseInfo"
import systemMan from "./modules/systemMan"
import waterSet from "./modules/waterSet"
import tenant from "./modules/tenant"
import systemMonitor from "./modules/systemMonitor"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '登录'
      },
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '/home',
      meta: {
        title: '主容器'
      },
      component: resolve => require(['@/views/home'], resolve),
      children:[
        {
          path: '/',
          redirect:"/waterSet"
        },
        
        // 水司配置
        ...waterSet,
        // 基础信息
        ...baseInfo,
        // 系统管理
        ...systemMan,
        // 租户管理
        ...tenant,
        // 系统监控
        ...systemMonitor,
        // {
        //   path: '/waterSet',
        //   meta: {
        //     title: '水司配置'
        //   },
        //   component: resolve => require(['@/views/waterSet'], resolve),
        // },
      ]
    },
    
    
  ]
})
