<template>
  <div class="custom-home">
    <header>
      <first-Nav :firstNav="firstNav" @changeNav="changeNav">
        <div class="header-top-right">
          <img class="menu_img menu1" src="../assets/images/sysMonitoring-active.png" @click="getSecondMenu('sysMonitoring')" alt="">
          <img class="menu_img menu2" src="../assets/images/basic.png" @click="getSecondMenu('basic')" alt="">
          <img class="menu_img menu3" src="../assets/images/tenant.png" @click="getSecondMenu('tenant')" alt="">
          <img class="menu_img menu4" src="../assets/images/system.png" @click="getSecondMenu('system')" alt="">

          <div class="loginArea" @mouseover="changeStyle" @mouseout="restStyle">
            <img :src=" userInfo.photourl" alt>

            <div class='infoPop'>
              <div class="nick">你好，周新宇</div>
              <div class="line"></div>
              <div class="loginout" @click="quit">[退出登录]</div>
            </div>
          </div>

          <!-- <i>
            <img :src=" userInfo.photourl" alt>
          </i>

          <b>周新宇</b>
          <span @click="quit">
            <i class="el-icon-switch-button"></i>
            退出
          </span> -->
        </div>
      </first-Nav>

    </header>

    <section class="kl-container">
      <aside v-show="menuShow" class="primary-menu">
        <aside class="kl-aside">
          <!-- <second-Nav :secondNav="secondNav"></second-Nav> -->
          <second-Nav :secondNav="secondMenu.secondNav1" v-show="menuShowData.secondMenuShow1"></second-Nav>
          <second-Nav :secondNav="secondMenu.secondNav2" v-show="menuShowData.secondMenuShow2"></second-Nav>
          <second-Nav :secondNav="secondMenu.secondNav3" v-show="menuShowData.secondMenuShow3"></second-Nav>
          <second-Nav :secondNav="secondMenu.secondNav4" v-show="menuShowData.secondMenuShow4"></second-Nav>
        </aside>
        <!-- <div class="collapse" @click="collapse">
            <i class="el-icon-arrow-left leftChange"></i>
        </div> -->
      </aside>
      <div class="kl-main" style="margin-left: 0px;" id="main-home">
        <router-view v-if='isRouterAlive'></router-view>
      </div>

    </section>
  </div>

</template>
<script>
export default {
  name: "custom-home",
  data() {
    return {
      firstNav: {
        title: '客户服务运维平台',
        logoSrc: require('../../static/images/logo3.png'),
        navData: {
          navList: [

          ],
          activeChanel: '/waterSet',
        },
      },
      // 显示侧边栏
      menuShowData: {
        secondMenuShow1: true,
        secondMenuShow2: false,
        secondMenuShow3: false,
        secondMenuShow4: false,
      },

      // 侧边栏菜单
      secondMenu: {
        // 系统监控
        secondNav1: {
          navList: [
            {
              icon: "systemMonitor-1",
              type: 'firstmenu',
              url: "/systemMonitor/runStatus",
              NavName: "运行分析",
              children: []
            },
            {
              icon: "systemMonitor-5",
              type: 'firstmenu',
              url: "/systemMonitor/InterfaceLog",
              NavName: "调用日志",
              children: []
            },
          ],
        },
        // 基础配置
        secondNav2: {
          navList: [
            {
              NavName: '公用配置',
              icon: 'el-icon-setting',
              type: 'submenu',
              children: [
                {
                  icon: "baseInfo1-2",
                  type: 'firstmenu',
                  url: "/baseInfo/indexMan",
                  NavName: "指标管理",
                  children: []
                },
                {
                  icon: "baseInfo1-3",
                  type: 'firstmenu',
                  url: "/baseInfo/adminArea",
                  NavName: "行政区域",
                  children: []
                },
                {
                  icon: "baseInfo1-4",
                  type: 'firstmenu',
                  url: "/baseInfo/dataDictionary",
                  NavName: "数据字典",
                  children: []
                },

                {
                  icon: "baseInfo1-6",
                  type: 'firstmenu',
                  url: "/baseInfo/areaMan",
                  NavName: "片区管理",
                  children: []
                },
                {
                  icon: "baseInfo1-7",
                  type: 'firstmenu',
                  url: "/baseInfo/bankInterfaceMan",
                  NavName: "银行驱动",
                  children: []
                },
                {
                  icon: "baseInfo1-8",
                  type: 'firstmenu',
                  url: "/baseInfo/engMaterMan",
                  NavName: "物料编码",
                  children: []
                },
                {
                  icon: "baseInfo1-9",
                  type: 'firstmenu',
                  url: "/baseInfo/EnclosureMan",
                  NavName: "附件类型",
                  children: []
                },
                {
                  icon: "baseInfo1-10",
                  type: 'firstmenu',
                  url: "/baseInfo/billTypeMan",
                  NavName: "单据类型",
                  children: []
                },
                {
                  icon: "baseInfo1-11",
                  type: 'firstmenu',
                  url: "/baseInfo/codeRule",
                  NavName: "编码规则",
                  children: []
                },
                {
                  icon: "baseInfo1-12",
                  type: 'firstmenu',
                  url: "/baseInfo/printBusinessMan",
                  NavName: "打印模板",
                  children: []
                },
              ],
            },
            {
              NavName: '水司配置',
              icon: 'el-icon-office-building',
              type: 'submenu',
              children: [
                {
                  icon: "waterSet-3",
                  type: 'firstmenu',
                  url: "/waterSet/printTemplate",
                  NavName: "打印配置",
                  children: []
                },
                {
                  icon: "waterSet-4",
                  type: 'firstmenu',
                  url: "/waterSet/processConfig",
                  NavName: "审批流程",
                  children: []
                },
                {
                  icon: "waterSet-1",
                  type: 'firstmenu',
                  url: "/waterSet/bankLink",
                  NavName: "银行接口",
                  children: []
                },
                {
                  icon: "waterSet-2",
                  type: 'firstmenu',
                  url: "/waterSet/saleSet",
                  NavName: "银行出回盘",
                  children: []
                },
              ]
            },
          ],
        },
        // 租户管理
        secondNav3: {
          navList: [
            {
              icon: "baseInfo1-1",
              type: 'firstmenu',
              url: "/tenant/waterMan",
              NavName: "租户信息",
              children: []
            },
          ],
        },
        // 系统设置
        secondNav4: {
          navList: [
            {
              icon: "systemMan1-11",
              type: 'firstmenu',
              url: "/systemMan/staffMgt",
              NavName: "职员管理",
              children: []
            },
            {
              icon: "systemMan1-10",
              type: 'firstmenu',
              url: "/systemMan/department",
              NavName: "组织架构",
              children: []
            },
            {
              icon: "systemMan1-12",
              type: 'firstmenu',
              url: "/systemMan/sysModule",
              NavName: "系统模块",
              children: []
            },
            {
              icon: "systemMan1-4",
              type: 'firstmenu',
              url: "/systemMan/InterfaceMan",
              NavName: "接口管理",
              children: []
            },
            {
              icon: "systemMan1-3",
              type: 'firstmenu',
              url: "/systemMan/sysUser",
              NavName: "运维帐户",
              children: []
            },
            {
              icon: "systemMan1-1",
              type: 'firstmenu',
              url: "/systemMan/childSystem",
              NavName: "子系统管理",
              children: []
            },
            {
              icon: "systemMan1-6",
              type: 'firstmenu',
              url: "/systemMan/dataBaseMan",
              NavName: "数据库服务器",
              children: []
            },
            {
              icon: "systemMan1-7",
              type: 'firstmenu',
              url: "/systemMan/appVersion",
              NavName: "应用程序版本",
              children: []
            },
            {
              icon: "systemMan1-8",
              type: 'firstmenu',
              url: "/systemMan/appServer",
              NavName: "应用服务器",
              children: []
            },
          ],
        },
      },


      // secondNav: {
      //   navList: [],
      // },
      userInfo: {
        photourl: require('../../static/images/cute.jpeg')
      },
      menuShow: true,
      isRouterAlive: true,
    }
  },
  created() {
    if (localStorage.getItem('token')) {

    } else {
      this.$router.push('/login');
    }
  },
  mounted() {
    var _this = this
    eventBus.$on('secondMenuShow', (show) => {
      Object.keys(this.menuShowData).forEach(function (key) {
        if (key == show) {
          _this.menuShowData[key] = true
        } else {
          _this.menuShowData[key] = false
        }
      })
    })
    // this.getMenu();
    this.getSecondMenu('sysMonitoring')
    this.$nextTick(() => {
      $("#app #firstNav #nav .navList").children('li').eq(0).addClass("active").siblings().removeClass("active")
    })
  },
  methods: {
    getSecondMenu(menuName) {
      if (menuName == 'sysMonitoring') {// 系统监控
        this.$router.push('/systemMonitor')
        $('.menu_img').eq(0).attr('src', require('../assets/images/sysMonitoring-active.png'))
        $('.menu_img').eq(1).attr('src', require('../assets/images/basic.png'))
        $('.menu_img').eq(2).attr('src', require('../assets/images/tenant.png'))
        $('.menu_img').eq(3).attr('src', require('../assets/images/system.png'))
        this.firstNav.navData = {
          navList: [],
        }
        $('.custom-home header').css('height', '58px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 59px)')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      } else if (menuName == 'basic') {// 基础配置
        this.$router.push('/baseInfo')
        $('.menu_img').eq(0).attr('src', require('../assets/images/sysMonitoring.png'))
        $('.menu_img').eq(1).attr('src', require('../assets/images/basic-active.png'))
        $('.menu_img').eq(2).attr('src', require('../assets/images/tenant.png'))
        $('.menu_img').eq(3).attr('src', require('../assets/images/system.png'))
        this.firstNav.navData = {
          navList: [],
        }
        $('.custom-home header').css('height', '58px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 59px)')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      } else if (menuName == 'tenant') {// 租户管理
        this.$router.push('/tenant')
        $('.menu_img').eq(0).attr('src', require('../assets/images/sysMonitoring.png'))
        $('.menu_img').eq(1).attr('src', require('../assets/images/basic.png'))
        $('.menu_img').eq(2).attr('src', require('../assets/images/tenant-active.png'))
        $('.menu_img').eq(3).attr('src', require('../assets/images/system.png'))
        this.firstNav.navData = {
          navList: [],
        }
        $('.custom-home header').css('height', '58px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 59px)')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      } else if (menuName == 'system') {// 系统管理
        this.$router.push('/systemMan')
        $('.menu_img').eq(0).attr('src', require('../assets/images/sysMonitoring.png'))
        $('.menu_img').eq(1).attr('src', require('../assets/images/basic.png'))
        $('.menu_img').eq(2).attr('src', require('../assets/images/tenant.png'))
        $('.menu_img').eq(3).attr('src', require('../assets/images/system-active.png'))
        this.firstNav.navData = {
          navList: [],
        }
        $('.custom-home header').css('height', '58px')
        $('.custom-home > .kl-container').css('height', 'calc(100% - 59px)')
        $('#firstNav .nav .navList > li').css('min-width', '80px')
      }

    },
    changeStyle(obj){
        $('.loginArea > .infoPop').css('display', 'block');
    },
    restStyle(obj){
        $('.loginArea > .infoPop').css('display', 'none');
    },
    getMenu() {
      this.firstNav.navData = {
        navList: [
          {
            Navtitle: '系统监控',
            icon: 'systemMonitor',
            path: '/systemMonitor',
            children: [
              {
                icon: "systemMonitor-1",
                type: 'firstmenu',
                url: "/systemMonitor/runStatus",
                NavName: "运行分析",
                children: []
              },
              {
                icon: "systemMonitor-5",
                type: 'firstmenu',
                url: "/systemMonitor/InterfaceLog",
                NavName: "调用日志",
                children: []
              },
            ],

          },
          {
            Navtitle: '基础配置',
            icon: 'baseInfo',
            path: '/baseInfo',
            children: [
              {
                NavName: '公用配置',
                icon: 'el-icon-setting',
                type: 'submenu',
                children: [
                  {
                    icon: "baseInfo1-2",
                    type: 'firstmenu',
                    url: "/baseInfo/indexMan",
                    NavName: "指标管理",
                    children: []
                  },
                  {
                    icon: "baseInfo1-3",
                    type: 'firstmenu',
                    url: "/baseInfo/adminArea",
                    NavName: "行政区域",
                    children: []
                  },
                  {
                    icon: "baseInfo1-4",
                    type: 'firstmenu',
                    url: "/baseInfo/dataDictionary",
                    NavName: "数据字典",
                    children: []
                  },

                  {
                    icon: "baseInfo1-6",
                    type: 'firstmenu',
                    url: "/baseInfo/areaMan",
                    NavName: "片区管理",
                    children: []
                  },
                  {
                    icon: "baseInfo1-7",
                    type: 'firstmenu',
                    url: "/baseInfo/bankInterfaceMan",
                    NavName: "银行驱动",
                    children: []
                  },
                  {
                    icon: "baseInfo1-8",
                    type: 'firstmenu',
                    url: "/baseInfo/engMaterMan",
                    NavName: "物料编码",
                    children: []
                  },
                  {
                    icon: "baseInfo1-9",
                    type: 'firstmenu',
                    url: "/baseInfo/EnclosureMan",
                    NavName: "附件类型",
                    children: []
                  },
                  {
                    icon: "baseInfo1-10",
                    type: 'firstmenu',
                    url: "/baseInfo/billTypeMan",
                    NavName: "单据类型",
                    children: []
                  },
                  {
                    icon: "baseInfo1-11",
                    type: 'firstmenu',
                    url: "/baseInfo/printBusinessMan",
                    NavName: "打印模板",
                    children: []
                  },
                ],
              },
              {
                NavName: '水司配置',
                icon: 'el-icon-office-building',
                type: 'submenu',
                children: [
                  {
                    icon: "waterSet-3",
                    type: 'firstmenu',
                    url: "/waterSet/printTemplate",
                    NavName: "打印配置",
                    children: []
                  },
                  {
                    icon: "waterSet-4",
                    type: 'firstmenu',
                    url: "/waterSet/processConfig",
                    NavName: "审批流程",
                    children: []
                  },
                  {
                    icon: "waterSet-1",
                    type: 'firstmenu',
                    url: "/waterSet/bankLink",
                    NavName: "银行接口",
                    children: []
                  },
                  {
                    icon: "waterSet-2",
                    type: 'firstmenu',
                    url: "/waterSet/saleSet",
                    NavName: "银行出回盘",
                    children: []
                  },
                ]
              },
            ],


          },
          {
            Navtitle: '租户管理',
            icon: 'tenant',
            path: '/tenant',
            children: [
              {
                icon: "baseInfo1-1",
                type: 'firstmenu',
                url: "/tenant/waterMan",
                NavName: "租户信息",
                children: []
              },
            ],

          },
          {
            Navtitle: '系统管理',
            icon: 'systemMan',
            path: '/systemMan',
            children: [
              // {
              //   icon:"systemMan1-2",
              //   type: 'firstmenu',
              //   url: "/systemMan/funModule",
              //   NavName:"功能模块",
              //   children:[]
              // },
              {
                icon: "systemMan1-11",
                type: 'firstmenu',
                url: "/systemMan/staffMgt",
                NavName: "职员管理",
                children: []
              },
              {
                icon: "systemMan1-10",
                type: 'firstmenu',
                url: "/systemMan/department",
                NavName: "组织架构",
                children: []
              },
              {
                icon: "systemMan1-12",
                type: 'firstmenu',
                url: "/systemMan/sysModule",
                NavName: "系统模块",
                children: []
              },
              {
                icon: "systemMan1-4",
                type: 'firstmenu',
                url: "/systemMan/InterfaceMan",
                NavName: "接口管理",
                children: []
              },
              {
                icon: "systemMan1-3",
                type: 'firstmenu',
                url: "/systemMan/sysUser",
                NavName: "运维帐户",
                children: []
              },
              {
                icon: "systemMan1-1",
                type: 'firstmenu',
                url: "/systemMan/childSystem",
                NavName: "子系统管理",
                children: []
              },
              {
                icon: "systemMan1-6",
                type: 'firstmenu',
                url: "/systemMan/dataBaseMan",
                NavName: "数据库服务器",
                children: []
              },
              {
                icon: "systemMan1-7",
                type: 'firstmenu',
                url: "/systemMan/appVersion",
                NavName: "应用程序版本",
                children: []
              },
              {
                icon: "systemMan1-8",
                type: 'firstmenu',
                url: "/systemMan/appServer",
                NavName: "应用服务器",
                children: []
              },
            ],

          },

        ],
      };
      // this.$router.push(this.firstNav.navData.navList[0].children[1].url)//进入第一个菜单
      this.changeNav(this.firstNav.navData.navList[0]);

      var that = this;
      let params = {
        "busicode": "接口名",
        "data": {},
      }
      //this.$api.fetch({
      // apiUrl: 'interface.api',//路径
      //  method: 'post',//请求方法
      //  params: params,//参数
      //  needErrorCallback: true
      // }).then(res => {
      // 成功的回调
      // })
    },
    //退出登录
    quit() {
      window.localStorage.removeItem("token");
      this.$router.push('/')
      // // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'

      //         if(this.host=='localhost'){
      //           window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'

      //         }else {
      //           window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://jc.uat.gdhwater.com/cas.htm'

      //         }
      // window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://' + this.host + ':8080/cas.htm'
    },

    // 页面重加载函数
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },

    changeNav(val) {
      // let arr = ['/WaterSideIndex','/CenterSideIndex','/WaterSideIndex2','/CustomerAnalysisReport','/ChargeAnalysisStatement','/EngineeringAnalysisReport','/StatementAnalysisReport'];
      // if(arr.includes(val.path)){
      //   this.menuShow = false;
      //   $(".primary-menu").css('width','0px');
      //   $('.kl-main').css('width','calc(100% - 10px)');
      //   $('.primary-menu .kl-aside').css('display','none');
      //   $('.primary-menu .leftChange').addClass('el-icon-arrow-right').removeClass('el-icon-arrow-left');
      // }else{
      //   this.menuShow = true;
      //   $(".primary-menu").css('width','200px');
      //   $('.kl-main').css('width','calc(100% - 210px)');
      //   $('.primary-menu .kl-aside').css('display','block');
      //   $('.primary-menu .leftChange').addClass('el-icon-arrow-left').removeClass('el-icon-arrow-right');
      // }
      this.firstNav.navData.navList.forEach((item, index) => {
        if (val.path === item.path) {
          this.secondNav.navList = item.children;
          if (item.children[0].url) {
            this.$router.push(item.children[0].url);
          } else {
            this.$router.push(item.children[0].children[0].url);
          }
        }

      })
    },
    collapse() {
      $('.primary-menu').addClass('animation');
      $('.kl-main').addClass('animation');
      if ($('.primary-menu').width() === 0) {
        $('.primary-menu').css('width', '200px');

        $('.kl-main').css('width', 'calc(100% - 230px)');
        $('.primary-menu .kl-aside').css('display', 'block');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-left').removeClass('el-icon-arrow-right');
      } else {
        $('.primary-menu').css('width', '0px');
        $('.kl-main').css('width', 'calc(100% - 30px)');
        $('.primary-menu .kl-aside').css('display', 'none');
        $('.primary-menu .leftChange').addClass('el-icon-arrow-right').removeClass('el-icon-arrow-left');
      }
    }
  },
  watch: {
    // '$route.path':{
    //     handler(val){
    //       let strurl = val.match(/^(\/[\w]+)\/?/)[1];
    //       console.log(val)
    //       console.log(strurl)
    //     },
    //     deep:true
    //   },
  }

}
</script>

<style lang="scss">
@import "../assets/styles/scss/base/fn";
$imgWidth: 200px;
$theme-color: #297acc;
.custom-home {
  width: 100%;
  height: 100%;
  .header-top-right {
    display: flex;
    align-items: center;
    height: 100%;
    float: right;
    .menu1 {
      margin-right: 40px !important;
      height: 40px;
      cursor: pointer;
    }
    .menu4 {
      margin-right: 5px !important;
    }
    .menu_img {
      margin-right: 30px;
      height: 40px;
      cursor: pointer;
    }
    .el-input__icon {
      line-height: 45px;
    }
    & > span {
      color: #fff;
      font-size: 14px;
      i {
        color: #fff;
        font-size: 14px;
        vertical-align: middle;
        height: 14px;
        width: 14px;
      }
    }
    & > * {
      float: left;
    }
    i {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 30px;
        height: 30px;
        float: left;
      }
    }
    b {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      padding: 0 20px 0 10px;
      font-weight: 400;
    }
    .loginArea {
      display: block;
      float: left;
      position: relative;
      line-height: 8px;
      padding: 0px 10px 0px 40px;
      font-size: 12px;
      text-align: center;
      img {
        width: 45px;
        height: 45px;
        margin: 5px 0;
        border-radius: 50%;
      }
      .infoPop {
        display: none;
        position: absolute;
        right: 3px;
        top: 55px;
        width: 100px;
        font-size: 12px;
        line-height: 22px;
        border: 1px solid #e2e2e2;
        background: #fff;
        padding: 10px;
        border-radius: 4px;
        -webkit-box-shadow: 1px 2px 2px #e2e2e2;
        box-shadow: 1px 2px 2px #e2e2e2;
        text-align: left;
        z-index: 2000;

        &:after {
          content: "";
          display: block;
          border-bottom: 10px solid #c5343400;
          border-left: 10px solid #ffffff;
          position: absolute;
          right: 23px;
          top: -3px;
          z-index: 11;
          background-color: transparent;
          transform: rotate(45deg);
        }
        .nick {
          width: 100%;
          color: #4889f3;
          margin: 0;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .line {
          border-bottom: 1px dashed #e4e4e4;
          height: 0;
          font-size: 0;
          overflow: hidden;
          margin: 5px 0;
        }
        .loginout {
          color: #5c5c5c;
          cursor: pointer;
          &:hover {
            color: #bf5757;
          }
        }
      }
    }
  }
  #firstNav {
    // .setting {
    //   padding-right: 50px;
    // }
    .navList > li {
      height: 25px !important;
    }
  }
  #firstNav {
    .top,
    .logo,
    .setting {
      height: 58px !important;
    }
    .logoLine {
      line-height: 58px;
    }
    .logo img {
      height: 42px;
    }
    .title {
      height: 58px;
      line-height: 58px;
      font-size: 23px;
    }
  }
  .primary-menu {
    float: left;
    width: 200px;
    height: 100%;
    position: relative;
    background: #fff;
    .kl-aside {
      position: absolute;
      left: 0px;
      width: 200px;
      z-index: 1000;
      background: #fff;
      height: calc(100% - 18px);
      color: #000;
      border-radius: 3px;
      .el-menu {
        width: 100%;
        border: none;
        overflow: auto;
        background: transparent;
        background: #fff;
        height: 100%;

        .el-menu-item {
          height: 38px;
        }

        .el-menu-item.is-active {
          background: #328ed1;
          color: #fff;
        }

        .el-menu-item {
          width: 100%;

          text-align: center;
        }
        li.el-submenu {
          color: #000;
          .el-menu {
            background: transparent;
          }
          .el-submenu__title {
            text-align: left;
            height: 50px !important;
            line-height: 50px !important;
            font-size: 14px;
            font-weight: 700;
            &:hover,
            &:focus {
              background: $theme-color;
            }
          }
        }
        .el-menu-item {
          background: transparent;
          color: #3b3a3a;
          text-align: left;
          height: 38px !important;
          line-height: 38px !important;
          font-size: 14px;
          font-weight: 700;
          &:hover,
          &:focus {
            background: $theme-color;
          }
          &.is-active {
            background: $theme-color;
            color: #fff;
            height: 38px !important;
            line-height: 38px !important;
          }
        }
      }
      .kr-title {
        color: #3195f4;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        text-align: center;
      }

      .switch-btn {
        position: relative;
        width: 18px;
        height: 100%;
        float: left;
        background: rgba(0, 70, 142, 0.1);
        line-height: 100%;
        text-align: center;
        .glyphicon-menu-right,
        .glyphicon-menu-left {
          vertical-align: middle;
          background: rgb(0, 70, 141);
          color: #fff;
          height: 60px;
          line-height: 60px;
          font-weight: bolder;
          position: absolute;
          top: 50%;
          left: 3%;
          transform: translateY(-50%);
          border-radius: 0 3px 3px 0;
        }
      }
    }
  }
  & > .kl-container {
    height: calc(100% - 90px);
    position: relative;
    background: #eaf4ff;
    padding: 10px;
    // width: calc(100% - 20px);
    width: 100%;
    .kl-main {
      height: 100%;
      float: right;
      width: calc(100% - 210px);
      border-radius: 3px;
      background: #fff;
      .model-first-rank {
        padding: 0px;
      }
    }
  }
  .toolbar {
    width: calc(100% - 20px);
    padding: 0px 10px;
    .demo-form-inline {
      zoom: 1;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
      & > .toolbar-left {
        float: left;
      }
      & > .toolbar-right {
        float: right;
      }
    }
  }
  // .kl-table {
  //   width: calc(100% - 20px);
  //   padding: 0px 10px;
  //   .block {
  //     text-align: right;
  //     padding: 10px 0px;
  //     height: 30px;
  //   }
  //   .el-table--striped .el-table__body tr.el-table__row--striped td {
  //     background: #f5f5f5;
  //   }
  //   .el-table__header {
  //     th {
  //       color: #111;
  //       background: #f3f5fb;
  //     }
  //   }
  //   .el-table td,
  //   .el-table th {
  //     padding: 4px 0;
  //     text-align: center;
  //   }
  //   .el-table {
  //     border: 1px solid #ebeef5;
  //     .cell {
  //       line-height: 30px;
  //       height: 30px;
  //     }
  //     .el-table__fixed-right {
  //       /*border-left: 1px solid #ebeef5*/
  //       .el-button,
  //       .el-button--text {
  //         font-size: 12px;
  //       }
  //     }
  //   }
  // }
  .bread-contain {
    width: calc(100% - 10px);
    zoom: 1;
    border-bottom: 1px solid #eaf4ff;
    margin-bottom: 10px;
    height: 40px;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    .bread-contain-right {
      float: right;
      width: 50%;
      text-align: right;
      line-height: 40px;
    }
    #crumbs {
      float: left;
      width: 40%;
      padding-right: 0px;
      // .is-link{
      //   color: #606266 !important;
      //   font-weight: 500 !important;
      // }
      // .el-breadcrumb__inner{
      //   font-weight: 700;
      //   color: #409eff;
      // }
    }
  }
  // 搜索按钮
  .compile {
    background: #faa646;
    border: 1px solid #faa646;
  }
  // 按钮公共样式
  .el-button--info {
    color: #f8fafe;
    background: #297acc;
    border-color: #d3d4d6;
  }
  .el-textarea .el-input__count {
    height: 25px;
  }
  .el-input__inner {
    cursor: text !important;
    &::-webkit-input-placeholder {
      font-size: 12px;
    }
    &::-moz-placeholder {
      font-size: 12px;
    }
    &:-ms-input-placeholder {
      font-size: 12px;
    }
  }
}
</style>
