
export default ([
    {
      path: '/tenant',
      meta: {
        title: '租户管理'
      },
      component: resolve => require(['@/views/tenant'], resolve),
      children:[
        {
            path: '/',
            redirect:"waterMan"
        },
        {
          path: 'waterMan',
          meta: {
            title: '租户管理'
          },
          component: resolve => require(['@/views/tenant/waterMan'], resolve)
        },
      ]
    }
  ])