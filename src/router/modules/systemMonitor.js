
export default ([
    {
      path: '/systemMonitor',
      meta: {
        title: '基础信息'
      },
      component: resolve => require(['@/views/systemMonitor'], resolve),
      children:[
        {
            path: '/',
            redirect:"runStatus"
        },
        {
        path: 'runStatus',
        meta: {
            title: '使用统计'
        },
        component: resolve => require(['@/views/systemMonitor/runStatus'], resolve)
        },
        {
            path: 'InterfaceLog',
            meta: {
              title: '调用日志'
            },
          component: resolve => require(['@/views/systemMonitor/InterfaceLog'], resolve)
        },
      ]
    }
  ])