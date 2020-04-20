
export default ([
    {
      path: '/waterSet',
      meta: {
        title: '水司配置'
      },
      component: resolve => require(['@/views/waterSet'], resolve),
      children:[
        {
            path: '/',
            redirect:"bankLink"
        },
        {
        path: 'bankLink',
        meta: {
            title: '银行直联'
        },
        component: resolve => require(['@/views/waterSet/bankLink'], resolve)
        },
        {
            path: 'saleSet',
            meta: {
              title: '出回盘配置'
            },
            component: resolve => require(['@/views/waterSet/saleSet'], resolve)
        },
        {
            path: 'printTemplate',
            meta: {
              title: '打印样式设置'
            },
            component: resolve => require(['@/views/waterSet/printTemplate'], resolve)
        },
        {
            path: 'processConfig',
            meta: {
              title: '审批流设置'
            },
            component: resolve => require(['@/views/waterSet/processConfig'], resolve)
        },
      ]
    }
  ])