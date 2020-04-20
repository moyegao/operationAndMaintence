
<template>
  <div class="water-manage">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="waterManShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="waterManAddVisible">
          <el-button size="mini" type="primary" @click="submit('waterRuleForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-show="staffViewShow">
          <el-button icon="el-icon-caret-left" size="mini" @click="staffViewClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-show="waterOperationShow">
          <el-button icon="el-icon-caret-left" size="mini" @click="waterOperationClose">返回</el-button>
        </div>
        <div class="bread-contain-right" v-show="waterAuthorize">
          <el-button icon="el-icon-caret-left" size="mini" @click="authorClose">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="waterManShow">

        <el-table stripe border :data="appServerData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="companyNo" label="水司编号" min-width="100">
          </el-table-column>
          <el-table-column prop="simplifyNo" label="简化编号" min-width="100">
          </el-table-column>
          <el-table-column prop="shortName" min-width="100" label="水司简称">
          </el-table-column>
          <el-table-column prop="adminArea" min-width="80" label="省份">
          </el-table-column>
          <el-table-column prop="companyArea" min-width="100" label="片区">
          </el-table-column>
          <el-table-column prop="versionName" min-width="100" label="应用程序版本">
          </el-table-column>
          <el-table-column prop="serverName" min-width="100" label="数据库服务器">
          </el-table-column>
          <el-table-column prop="status" label="状态" :formatter="formatStatus" min-width="80">
          </el-table-column>

          <el-table-column label="操作" width="180px" fixed="right">
            <template slot-scope="scope">

              <el-button type="text" @click="editor(scope)">编辑</el-button>
              <span style="color:#e6e6e6;">|</span>
              <el-button type="text" @click="waterOperation(scope)">授权模块</el-button>
              <span style="color:#e6e6e6;">|</span>
              <el-button type="text" @click="staffView(scope)">授权员工</el-button>

            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="appServerData.total">
          </el-pagination>
        </div>
      </div>
      <waterManAdd v-show="waterManAddVisible" ref="waterManAdd" :isEdit=currentType>
      </waterManAdd>
      <waterAuthorize :waterCom.sync="choosedCompony" v-show="waterAuthorize" ref="waterAuthorize">
      </waterAuthorize>
      <staffView v-show="staffViewShow" ref="staffView">
      </staffView>
      <waterOperation v-show="waterOperationShow" ref="waterOperation">
      </waterOperation>
    </div>

  </div>
</template>

<script>
import waterManAdd from './waterDialog'
import waterAuthorize from './waterAuthorizeDialog'
import staffView from './staffView'
import waterOperation from './waterOperation'
export default {
  name: "water-manage",
  components: {
    waterManAdd,
    waterAuthorize,
    staffView,
    waterOperation,
  },
  data() {
    return {
      tableShow: true,
      staffViewShow: false,
      waterOperationShow: false,
      tableQuery: {
        page: 1,
        pageCount: 50
      },
      maxHeight: 0,
      choosedCompony: '',
      appServerData: [],
      formData: {
        companyNo: '',
        simplifyNo: "",
        shortName: '',
        adminArea: "",
        companyArea: "",
        databaseAccount: "",
        databasePassword: "",
        maxIdle: "",
        maxTotal: "",
        workflowApp: "",
        comments: "",
        sourceCompany: "",
        dbId: "",
        appVersion: '',
        status: 1,
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '租户管理', path: '/ChangeTables' },
          { title: '租户信息', method: () => { window.histroy.back() } }
        ],

      },
      waterManShow: true,
      waterManAddVisible: false,
      waterAuthorize: false,
      currentType: false,
    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit("secondMenuShow", "secondMenuShow3")
    this.selectTSubSystem()
  },
  methods: {
    // 格式化状态
    formatStatus(row) {
      return row.status == 1 ? "启用" : "禁用"
    },
    // 添加按钮点击事件
    appAdd() {

      this.waterManAddVisible = true;
      this.waterManShow = false;

      this.staffViewShow = false,
        this.waterOperationShow = false,
        this.currentType = false;
      this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });

      this.$refs.waterManAdd.editData({
        companyNo: '',
        simplifyNo: "",
        shortName: '',
        adminArea: "",
        companyArea: "",
        databaseAccount: "",
        databasePassword: "",
        maxIdle: "",
        maxTotal: "",
        workflowApp: "",
        comments: "",
        sourceCompany: "",
        dbId: "",
        appVersion: "",
        status: 1,
      });

      this.common.chargeObjectEqual(this, this.formData, 'set', 'waterManAdd');
    },
    // 单编辑点击事件
    editor(scope) {
      this.currentType = true;
      let _this = this;
      let params = {
        "busicode": "CompanyQuery",
        "data": {
          companyId: scope.row.companyId
        },
      };
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        this.common.chargeObjectEqual(this, res, 'set', 'waterManAdd');
        this.$refs.waterManAdd.editData(res);
      })
      this.waterManAddVisible = true;
      this.waterManShow = false;
      this.staffViewShow = false;
      this.waterOperationShow = false;
      this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });

    },
    // 授权弹出框显示
    auth(scope) {
      this.choosedCompony = scope.row;
      this.waterAuthorize = true;
      this.waterManShow = false;
      this.staffViewShow = false;
      this.waterOperationShow = false;
      this.$set(this.crumbsData.titleList, "2", { title: '授权范围', method: () => { window.histroy.back() } });
    },
    staffView(scope) {
      this.choosedCompony = scope.row;
      this.waterAuthorize = false;
      this.waterManShow = false;
      this.staffViewShow = true;
      this.waterOperationShow = false;
      this.$set(this.crumbsData.titleList, "2", { title: '授权员工', method: () => { window.histroy.back() } });
    },
    waterOperation(scope) {
      this.choosedCompony = scope.row;
      this.waterAuthorize = false;
      this.waterManShow = false;
      this.staffViewShow = false;
      this.waterOperationShow = true;
      this.$set(this.crumbsData.titleList, "2", { title: '授权模块', method: () => { window.histroy.back() } });
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
    // 列表初始化
    selectTSubSystem() {
      let _this = this;
      let params = {
        "busicode": "CompanyList",
        "data": this.tableQuery
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {

        // _this.$set(_this.tableData,'list',res.data)
        _this.appServerData = res
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.water-manage .kl-table', ['.water-manage .block'])

      })

    },
    closeDialog() {
      this.waterManShow = true;
      this.staffViewShow = false;
      this.waterOperationShow = false;
      this.waterManAddVisible = false;
      this.waterAuthorize = false;
      this.crumbsData.titleList.pop();

    },
    handleClose() {

      this.$refs.waterManAdd.handleClose();
    },
    authorClose() {
      this.closeDialog();
    },
    staffViewClose() {
      this.closeDialog();
    },
    waterOperationClose() {
      this.closeDialog();
    },
    // 、提交
    submit(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.waterManAdd.submitForm(formName, type);
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
.water-manage {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

