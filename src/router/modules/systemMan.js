
export default ([
    {
      path: '/systemMan',
      meta: {
        title: '基础信息'
      },
      component: resolve => require(['@/views/systemMan'], resolve),
      children:[
        {
            path: '/',
            redirect:"InterfaceMan"
        },
        {
        path: 'childSystem',
        meta: {
            title: '子系统'
        },
        component: resolve => require(['@/views/systemMan/childSystem'], resolve)
        },
        {
            path: 'funModule',
            meta: {
              title: '功能模块'
            },
            component: resolve => require(['@/views/systemMan/funModule'], resolve)
        },
        {
            path: 'sysUser',
            meta: {
              title: '系统用户'
            },
            component: resolve => require(['@/views/systemMan/sysUser'], resolve)
        },
        {
            path: 'InterfaceMan',
            meta: {
              title: '接口管理'
            },
          component: resolve => require(['@/views/systemMan/InterfaceMan'], resolve)
        },
        {
          path: 'dataBaseMan',
          meta: {
            title: '数据库服务器'
          },
          component: resolve => require(['@/views/systemMan/dataBaseMan'], resolve)
        },
        {
          path: 'appVersion',
          meta: {
            title: '应用程序版本'
          },
          component: resolve => require(['@/views/systemMan/appVersion'], resolve)
        },
        {
          path: 'appServer',
          meta: {
            title: '应用服务器'
          },
          component: resolve => require(['@/views/systemMan/appServer'], resolve)
        },
        {
          path: 'department',
          meta: {
            title: '组织架构'
          },
          component: resolve => require(['@/views/systemMan/department'], resolve)
        },
        {
          path: 'staffMgt',
          meta: {
            title: '职员管理'
          },
          component: resolve => require(['@/views/systemMan/staffMgt'], resolve)
        },
        {
          path: 'sysModule',
          meta: {
            title: '系统模块'
          },
          component: resolve => require(['@/views/systemMan/sysModule'], resolve)
        },
      ]
    }
  ])