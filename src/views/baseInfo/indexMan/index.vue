

<template>
  <!-- 指标管理 -->
  <div class="indexMan">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="indexManShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">新建</el-button>
        </div>
        <div class="bread-contain-right" v-show="indexManAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="indexManShow">

        <el-table stripe border :data="appServerData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="kpiUnique" label="指标维键" min-width="80">
          </el-table-column>
          <el-table-column prop="kpiName" label="指标名称" min-width="80">
          </el-table-column>
          <el-table-column prop="kpiComments" min-width="80" label="指标描述">
          </el-table-column>
          <el-table-column prop="kpiLevel" min-width="80" label="指标级别" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="subThemeUnique" :formatter="formatStatus" min-width="150" label="所属子主题维键">
          </el-table-column>
          <el-table-column prop="subThemeName" label="所属子主题名称" min-width="150">
          </el-table-column>
          <el-table-column prop="themeUnique" label="所属主题维键" min-width="150">
          </el-table-column>
          <el-table-column prop="themeName" min-width="150" label="所属主题名称">
          </el-table-column>
          <el-table-column prop="unit" min-width="80" label="单位" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" min-width="80" label="状态">
          </el-table-column>
          <el-table-column prop="comments" label="备注" min-width="150">
          </el-table-column>

          <el-table-column label="操作" width="80px" fixed="right">
            <template slot-scope="scope">

              <el-button type="text" @click="appAdd(scope)">编辑</el-button>
              <!-- <span style="color:#e6e6e6;">|</span>
               <el-button type="text"  @click="auth(scope)">授权范围</el-button> -->

            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <div v-show="indexManAddVisible">
        <indexManAdd ref="child"></indexManAdd>
      </div>
    </div>
  </div>
</template>

<script>
import indexManAdd from "./indexManAdd"
export default {
  name: "indexMan",
  components: {
    indexManAdd
  },
  data() {
    return {
      total: 0,//数据总数
      tableShow: true,
      tableQuery: {
        page: 1,
        pageCount: 50
      },
      maxHeight: 0,
      appServerData: [],
      showSelectIndex: -1,
      formData: {
        "kpiName": "",
        "kpiComments": "",
        "kpiLevel": "",
        "subThemeUnique": "",
        "subThemeName": "",
        "themeUnique": "",
        "themeName": "",
        "unit": "",
        "status": 1,
        "comments": "",
        "kpiUnique": "",
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础信息', path: '/ChangeTables' },
          { title: '指标管理', method: () => { window.histroy.back() } }
        ],
      },
      indexManShow: true,
      indexManAddVisible: false,
    }
  },
  mounted() {
    // 侧边栏
    eventBus.$emit("secondMenuShow", "secondMenuShow2")
    //查询初始数据
    this.selectTSubSystem()
  },
  methods: {
    //保存数据
    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.child.submitForm(formName, type);
    },
    //数据清空
    clear() {
      this.formData.kpiUnique = "";
      this.formData.kpiName = '';
      this.formData.kpiComments = '';
      this.formData.kpiLevel = '';
      this.formData.subThemeUnique = '';
      this.formData.subThemeName = '';
      this.formData.themeUnique = '';
      this.formData.themeName = '';
      this.formData.unit = '';
      this.formData.comments = '';
    },
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "停用"
    },
    // 添加按钮点击事件
    appAdd(val) {
      // sessionStorage.setItem('formData',JSON.stringify(this.formData));
      // this.name = val;
      this.clear();
      if (val === 'add') {
        this.$set(this.crumbsData.titleList, "2", { title: '新建', method: () => { window.histroy.back() } });
        this.$refs.child.editData(this.formData)
        this.common.chargeObjectEqual(this, this.formData, 'set', 'childIndexMan');
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "KpiQuery",
          "data": {
            kpiId: val.row.kpiId
          },
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.child.editData(res);
          this.common.chargeObjectEqual(this, res, 'set', 'childIndexMan');
        })
      }
      this.indexManShow = false;
      this.indexManAddVisible = true;
    },
    //列序号
    indexMethod(index) {
      return (this.tableQuery.page - 1) * (this.tableQuery.pageCount) + index + 1;
      // return index + 1
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
    selectTSubSystem() {
      let _this = this
      let params = {
        "busicode": "KpiList",
        "data": _this.tableQuery
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.$set(_this.appServerData, 'list', res.list)
        _this.total = res.total;
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(this, '.indexMan .kl-table', ['.indexMan .block'])

      })
    },
    closeDialog() {
      this.indexManShow = true;
      this.indexManAddVisible = false;
      this.crumbsData.titleList.pop();
      this.$refs.child.resetForm();
    },
    handleClose() {
      this.$refs.child.handleClose();
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
.indexMan {
  width: 100%;
  height: 100%;
  .main-content {
    height: 100%;
  }
}
</style>

