
export default ([
    {
      path: '/baseInfo',
      meta: {
        title: '基础信息'
      },
      component: resolve => require(['@/views/baseInfo'], resolve),
      children:[
        {
            path: '/',
            redirect:"indexMan"
        },
        {
          path: 'indexMan',
          meta: {
            title: '指标管理'
          },
          component: resolve => require(['@/views/baseInfo/indexMan'], resolve)
        },
        {
          path: 'adminArea',
          meta: {
            title: '行政区域'
          },
          component: resolve => require(['@/views/baseInfo/adminArea'], resolve)
        },
        {
          path: 'dataDictionary',
          meta: {
            title: '数据字典'
          },
          component: resolve => require(['@/views/baseInfo/dataDictionary'], resolve)
        },
        
        {
          path: 'areaMan',
          meta: {
            title: '片区管理'
          },
          component: resolve => require(['@/views/baseInfo/areaMan'], resolve)
        },
        {
          path: 'bankInterfaceMan',
          meta: {
            title: '银行接口管理'
          },
          component: resolve => require(['@/views/baseInfo/bankInterfaceMan'], resolve)
        },
        {
          path: 'engMaterMan',
          meta: {
            title: '工程材料管理'
          },
          component: resolve => require(['@/views/baseInfo/engMaterMan'], resolve)
        },
        {
          path: 'EnclosureMan',
          meta: {
            title: '附件管理'
          },
          component: resolve => require(['@/views/baseInfo/EnclosureMan'], resolve)
        },
        {
          path: 'billTypeMan',
          meta: {
            title: '单据类型管理'
          },
          component: resolve => require(['@/views/baseInfo/billTypeMan'], resolve)
        },
        {
          path: 'printBusinessMan',
          meta: {
            title: '打印业务配置'
          },
          component: resolve => require(['@/views/baseInfo/printBusinessMan'], resolve)
        },
        {
          path: 'codeRule',
          meta: {
            title: '编码规则'
          },
          component: resolve => require(['@/views/baseInfo/codeRule'], resolve)
        },
      ]
    }
  ])