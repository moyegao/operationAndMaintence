



<template>
  <div class="codeRule">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="codeRuleShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="codeRuleAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('codeRuleAddRuleForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="codeRuleShow">
        <div class="toolbar">
          <el-form :inline="true" :model="tableQuery" class="demo-form-inline" size="mini">
 
            <div class="toolbar-left">
              <el-form-item label="编号：">
                    <el-input class="default_class" v-model="tableQuery.code" size="mini" @keyup.enter.native="search" clearable></el-input>
              </el-form-item>
              <el-form-item label="名称：">
                    <el-input class="default_class" v-model="tableQuery.name" size="mini" @keyup.enter.native="search" clearable></el-input>
              </el-form-item>
              <el-form-item class="button-group">
                <el-button class="compile" type="primary el-icon-search"  @click="search" size="mini"></el-button>
              </el-form-item>
            </div>

            <div class="toolbar-right">
           
            </div>

          </el-form>
        </div>
        <el-table stripe border :data="listData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="ruleCode"  align="left" label="编号" min-width="100">
          </el-table-column>
          <el-table-column prop="ruleName"  align="left" label="名称" min-width="100">
          </el-table-column>
          <el-table-column prop="ruleExpRemark" align="left" label="表达式" >
          </el-table-column>
          <el-table-column prop="startSerialNumber" label="起始编号" min-width="50">
          </el-table-column>
          <el-table-column prop="serialNumberIncrement" label="增量步长" min-width="50">
          </el-table-column>
          <el-table-column prop="resetCycle" label="重置周期" min-width="50" :formatter="formatResetCycle">
          </el-table-column>
          <el-table-column label="操作" width="80px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="appAdd(scope)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="listData.total">
          </el-pagination>
        </div>
      </div>
      <div v-show="codeRuleAddVisible">
        <codeRuleAdd ref="codeRuleAdd"></codeRuleAdd>
      </div>
    </div>
  </div>
</template>

<script>
import codeRuleAdd from "./codeRuleAdd"
export default {
  name: "codeRule",
  components: {
    codeRuleAdd
  },
  data() {
    return {
      tableShow: false,
      tableQuery: {
        code:'',
        name:'',
        page: 1,
        pageCount: 50
      },
      maxHeight: 0,
      listData: [],
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础信息', path: '/ChangeTables' },
          { title: '编码规则', method: () => { window.histroy.back() } }
        ],

      },
      codeRuleShow: true,
      codeRuleAddVisible: false,
      formData: {
          ruleCode: "",
          ruleName: "",
          ruleExp:"",
          ruleExpRemark:"",
          startSerialNumber: "1",
          serialNumberIncrement: "1",
          resetCycle:0,
      },
    }
  },
  mounted() {
    this.selectList()
  },
  methods: {
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    formatResetCycle(row) { //转义
      if(row.resetCycle == 1){
        return '年';
      }else if(row.resetCycle == 2){
        return '月';
      }else if(row.resetCycle == 3){
        return '日';
      }else if(row.resetCycle == 0){
        return '无';
      }
    },
    // 搜索
    search(){
      this.tableQuery.page = 1;
      this.selectList()
    },
    // 添加按钮点击事件
    appAdd(val) {
      this.codeRuleShow = false;
      this.codeRuleAddVisible = true;
      if (val === 'add') {
        this.$refs.codeRuleAdd.editData({
          ruleCode: "",
          ruleName: "",
          ruleExp:"",
          ruleExpRemark:"",
          startSerialNumber: "1",
          serialNumberIncrement: "1",
          resetCycle:0,
        });
        this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });
        this.common.chargeObjectEqual(this, this.formData, 'set', 'codeRuleAdd');
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "CodeRuleQuery",
          "data": {
            id: val.row.id
          },
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.codeRuleAdd.editData(res);
          
          this.common.chargeObjectEqual(this, res, 'set', 'codeRuleAdd');
        })
      }

    },
    // 列表的NO列
    indexMethod(index) {
      return (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1);
    },
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.selectList()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.selectList()
    },
    selectList() {
      let _this = this
      let params = {
        "busicode": "CodeRuleList",
        "data": this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.listData = res
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.codeRule .kl-table', ['.codeRule .block']);
      })
    },
    closeDialog() {
      this.codeRuleShow = true;
      this.codeRuleAddVisible = false;
      this.crumbsData.titleList.pop();
    },
    // 返回
    handleClose() {

      this.$refs.codeRuleAdd.handleClose();
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.codeRuleAdd.submitForm(formName, type);
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
.codeRule {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

