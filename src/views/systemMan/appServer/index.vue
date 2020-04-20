
<template>
  <div class="appServer">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="appServerShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="appServerAddVisible">
          <el-button size="mini" type="primary" @click="submit('ruleFormappServerAdd')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="appServerShow">

        <el-table stripe border :data="appServerData" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="serverCode" label="服务器编号" min-width="100">
          </el-table-column>
          <el-table-column prop="serverName" label="服务器名称" min-width="100">
          </el-table-column>
          <el-table-column prop="appVersionName" min-width="100" label="应用程序版本">
          </el-table-column>
          <el-table-column prop="appIp" min-width="80" label="服务器IP" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="appPort" min-width="100" label="服务器端口">
          </el-table-column>
          <el-table-column prop="statusName" min-width="80" :formatter="formatStatus" label="状态">
          </el-table-column>
          <el-table-column prop="comments" label="描述" min-width="150">
          </el-table-column>

          <el-table-column label="操作" width="80px" fixed="right">
            <template slot-scope="scope">

              <el-button type="text" @click="appAdd(scope)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="appServerAddVisible">
        <appServerAdd ref="appServerAdd"></appServerAdd>
      </div>
    </div>
  </div>
</template>

<script>
import appServerAdd from "./appServerAdd"
export default {
  name: "appServer",
  components: {
    appServerAdd
  },
  data() {
    return {
      tableShow: true,
      tableQuery: {
        page: 1,
        pageCount: 50
      },
      maxHeight: 0,
      appServerData: [],
      formData: {
        serverCode: '',
        serverName: "",
        appVersion: '',
        appIp: "",
        appPort: "",
        comments: "",
        status: 1
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/ChangeTables' },
          { title: '应用服务器', method: () => { window.histroy.back() } }
        ],

      },
      appServerShow: true,
      appServerAddVisible: false,
    }
  },
  mounted() {
    this.selectTSubSystem()
  },
  methods: {
    // 添加/编辑按钮点击事件
    appAdd(val) {
      if (val === 'add') {
        this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });
        this.$refs.appServerAdd.editData(this.formData);
        this.common.chargeObjectEqual(this, this.formData, 'set', 'appServerAdd');
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "appServerList",
          "data": {
            "serverId": val.row.serverId
          }
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.appServerAdd.editData(res[0]);
          this.common.chargeObjectEqual(this, res[0], 'set', 'appServerAdd');
        })

      }
      this.appServerShow = false;
      this.appServerAddVisible = true;

    },
    // 列表的NO列
    indexMethod(index) {
      return (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1);
    },
    formatStatus(row) {
      return row.status == 1 ? "启用" : '禁用';
    },
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.selectTSubSystem()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.selectTSubSystem()
    },
    // 列表初始化数据
    selectTSubSystem() {
      let _this = this;

      let params = {
        "busicode": "appServerList",
        "data": {}
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.appServerData = res
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.appServer .kl-table', [])

      })
    },
    closeDialog() {
      this.appServerShow = true;
      this.appServerAddVisible = false;
      this.crumbsData.titleList.pop();
    },

    // 返回
    handleClose() {
      this.$refs.appServerAdd.handleClose();
    },
    // 、提交
    submit(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.appServerAdd.submitForm(formName, type);
    }
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
.appServer {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

