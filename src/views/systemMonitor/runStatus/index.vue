<template>
  <div class="InterfaceLog">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>

    </div>
    <div class="kl-table">
      <!-- 表格 -->
      <el-table stripe center border :data="historyData.list">

        <el-table-column fixed="left" type="index" width="80" label="NO." :index="indexMethod">
        </el-table-column>

        <el-table-column prop="name" label="项目">
        </el-table-column>

        <el-table-column prop="num" label="数量">
        </el-table-column>

        <el-table-column prop="errorNum" label="异常数量">
        </el-table-column>
        
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "useStat",
  components: {
  },
  data() {
    return {
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统监控', path: '/systemMan' },
          { title: '运行分析', method: () => { window.histroy.back() } }
        ],

      },
      tableShow: true,
      maxHeight: 0,
      historyData: {
        list: [
          {
            name: '在用水司',
            num: '16',
            errorNum: '0'
          },
          {
            name: '数据库服务器',
            num: '16',
            errorNum: '0'
          },
          {
            name: '应用服务器',
            num: '16',
            errorNum: '0'
          },
          {
            name: '营收中台微服务',
            num: '16',
            errorNum: '0'
          },
          {
            name: '客户认证微服务',
            num: '16',
            errorNum: '0'
          }
        ]
      },

    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit("secondMenuShow", "secondMenuShow1")
    this.getData()

  },
  methods: {

    // 初始化列表数据
    getData() {
      let _this = this;
    },
    indexMethod(index) {//获取表格序号
      return (index + 1);
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    }
  }
}
</script>
<style lang="scss">
.InterfaceLog {
  width: 100%;
  height: 100%;
}
</style>
