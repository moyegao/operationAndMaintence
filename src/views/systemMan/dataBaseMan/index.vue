
<template>
  <div class="dataBaseMan">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="dataBaseManShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="dataBaseManAddVisible">
          <el-button size="mini" type="primary" @click="submit('ruleFormDataBaseManAdd')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="dataBaseManShow">

        <el-table stripe border :data="appServerData" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="serverNo" label="服务器编号" min-width="100">
          </el-table-column>
          <el-table-column prop="serverName" label="服务器名称" min-width="100">
          </el-table-column>
          <el-table-column prop="dbTypeName" min-width="100" label="数据库类型">
          </el-table-column>
          <el-table-column prop="dbIp" min-width="100" label="数据库IP" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="dbPort" min-width="80" label="数据库端口">
          </el-table-column>
          <!-- <el-table-column prop="dbSchema" label="数据库实例名" min-width="120">
          </el-table-column> -->
          <el-table-column prop="managerAccount" label="管理员账号" min-width="120">
          </el-table-column>
          <el-table-column prop="managerPassword" min-width="120" label="管理员密码">
          </el-table-column>
          <el-table-column prop="statusName" min-width="60" label="状态">
          </el-table-column>
          <el-table-column prop="comments" label="描述" min-width="150">
          </el-table-column>

          <el-table-column label="操作" width="80px" fixed="right">
            <template slot-scope="scope">

              <el-button type="text" @click="appAdd(scope)">编辑</el-button>
              <!-- <span style="color:#e6e6e6;">|</span>
               <el-button type="text"  @click="auth(scope)">授权范围</el-button> -->

            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableQuery.page"
            :page-sizes="[20, 100, 500, 1000]"
            :page-size="tableQuery.pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="appServerData.total">
          </el-pagination>
        </div> -->
      </div>
      <div v-show="dataBaseManAddVisible">
        <dataBaseManAdd ref="dataBaseManAdd"></dataBaseManAdd>
      </div>
    </div>
  </div>
</template>

<script>
import dataBaseManAdd from "./dataBaseManAdd"
export default {
  name: "dataBaseMan",
  components: {
    dataBaseManAdd
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
        serverNo: '',
        serverName: "",
        dbType: 1,
        dbIp: "",
        dbPort: "",
        dbSchema: "",
        managerAccount: "",
        managerPassword: "",
        comments: "",
        status: 1
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础信息', path: '/ChangeTables' },
          { title: '数据库管理', method: () => { window.histroy.back() } }
        ],

      },
      dataBaseManShow: true,
      dataBaseManAddVisible: false,
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
        this.$refs.dataBaseManAdd.editData(this.formData);
        this.common.chargeObjectEqual(this, this.formData, 'set', 'dataBaseAdd');
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "DbServerList",
          "data": {
            "dbId": val.row.dbId
          }
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.dataBaseManAdd.editData(res[0]);
          this.common.chargeObjectEqual(this, res[0], 'set', 'dataBaseAdd');
        })

      }
      this.dataBaseManShow = false;
      this.dataBaseManAddVisible = true;

    },
    // 列表的NO列
    indexMethod(index) {
      return (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1);
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
        "busicode": "DbServerList",
        "data": {}
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.appServerData = res
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.dataBaseMan .kl-table', [])

      })
    },
    closeDialog() {
      this.dataBaseManShow = true;
      this.dataBaseManAddVisible = false;
      this.crumbsData.titleList.pop();
    },

    // 返回
    handleClose() {

      this.$refs.dataBaseManAdd.handleClose();
    },
    // 、提交
    submit(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.dataBaseManAdd.submitForm(formName, type);
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
.dataBaseMan {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

