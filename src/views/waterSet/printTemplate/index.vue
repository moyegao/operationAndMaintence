
<template>
  <div class="printTemplate">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="printTemplateShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
          <el-button type="primary" @click="print('print')" size="mini">直接打印</el-button>
          <el-button type="primary" @click="print('view')" size="mini">打印预览</el-button>
          <el-button type="primary" @click="printSyleSelect()" size="mini">选打印样式</el-button>
        </div>
        <div class="bread-contain-right" v-show="printTemplateAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('printTemplateAddForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="company-content" v-show="printTemplateShow">
        <div class="company-left">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="kl-table company-right">
          <div class="toolbar">
            <el-form :inline="true" :model="tableQuery" class="demo-form-inline" size="mini">

              <div class="toolbar-left">
                <el-form-item label="打印业务编号：">
                  <el-input class="default_class" v-model="tableQuery.code" size="mini" @keyup.enter.native="search" clearable></el-input>
                </el-form-item>
                <el-form-item label="打印业务名称：">
                  <el-input class="default_class" v-model="tableQuery.name" size="mini" @keyup.enter.native="search" clearable></el-input>
                </el-form-item>
                <el-form-item class="button-group">
                  <el-button class="compile" type="primary el-icon-search" @click="search" size="mini"></el-button>
                </el-form-item>
              </div>

              <div class="toolbar-right">

              </div>

            </el-form>
          </div>

          <el-table stripe border :data="selServicesData.list" v-if="tableShow" :max-height="maxHeight">
            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="busiCode" label="业务编码" width="200">
            </el-table-column>
            <el-table-column prop="busiName" label="业务名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="tempName" label="样式名称">
            </el-table-column>
            <el-table-column prop="hasDesign" label="是否设计">
            </el-table-column>
            <el-table-column prop="tempRemark" label="样式描述">
            </el-table-column>
            <el-table-column label="操作" width="120px" fixed="right">
              <template slot-scope="scope">

                <el-button type="text" @click="appAdd(scope)">编辑</el-button>
                <span style="color:#e6e6e6;">|</span>
                <el-button type="text" @click="design(scope)">设计</el-button>

              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="selServicesData.total">
            </el-pagination>
          </div>
        </div>
      </div>
      <printStyle :companyNo="tableQuery.companyNo" v-if="printStyleShow" :printStyleData="printStyleData"></printStyle>
      <div v-show="printTemplateAddVisible">
        <printTemplateAdd ref="printTemplateAdd"></printTemplateAdd>
      </div>
    </div>
  </div>
</template>

<script>
import printTemplateAdd from "./printTemplateAdd"
import printStyle from "@/components/printStyle.vue"
export default {
  name: "printTemplate",
  components: {
    printTemplateAdd,
    printStyle
  },
  data() {
    return {
      printStyleData: {
        printDataParams: {

        },
        printBusinessCode: "base_print_template"
      },
      printStyleShow: false,
      tableShow: true,
      maxHeight: 0,
      selServicesData: {},
      tableQuery: {
        name: '',
        code: '',
        companyNo: '',
        page: 1,
        pageCount: 50
      },
      formData: {
        id: '',
        name: "",
        remark: '',
        businessId: "",
        defaultFlag: 0,
        scope: ""
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '水司配置', path: '/waterSet' },
          { title: '打印样式', method: () => { window.histroy.back() } },
          { title: '根目录', method: () => { window.histroy.back() } }
        ],

      },
      printTemplateShow: true,
      printTemplateAddVisible: false,
      treeDatas: {
        tree: [
          {
            shortName: '根目录',
            id: '2',
            children: [
            ]
          }
        ],
        defaultProps: {
          label: 'shortName',
          children: 'children'
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: '请输入节点'
        },
        sendTreeProp: ['code', 'shortName', 'districtArr', 'children', 'companyNo', 'group', 'isLeaf', 'isParent', 'parent', 'sonData'],
        rootName: '根目录',
        defaultOpen: {
          nodeKey: 'id',
          // nodeItem:164
        }
      },
      treeParantId: "",
      ruleForm: {
        printStyle: "",
      }
    }
  },
  mounted() {
    this.getTreeDatas();
  },
  methods: {
    // 添加按钮点击事件
    appAdd(val) {
      this.printTemplateShow = false;
      this.printTemplateAddVisible = true;
      if (val === 'add') {
        this.$refs.printTemplateAdd.editData({
          id: '',
          name: "",
          remark: '',
          businessId: "",
          defaultFlag: 0,
          scope: "",
          companyNo: this.tableQuery.companyNo
        });
        this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } });
        this.common.chargeObjectEqual(this, this.formData, 'set', 'printTemplateAdd');
      } else {
        this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "PrintTemplateQuery",
          "data": {
            "id": val.row.tempId,
            "companyNo": _this.tableQuery.companyNo
          }
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          res.companyNo = _this.tableQuery.companyNo;
          this.$refs.printTemplateAdd.editData(res);
          this.common.chargeObjectEqual(this, res, 'set', 'printTemplateAdd');
        })
      }

    },
    design(val) {
      this.common.print('formatSet', this.tableQuery.companyNo, 'base_print_template', val.row.tempId, '', this);
    },
    printSyleSelect() {
      //TODO调用common中的打印样式选择功能;
      this.printStyleData.printDataParams = {
        "busicode": "PrintTemplateListPrint",
        "data": this.tableQuery.companyNo
      },
        this.printStyleShow = true;

    },
    //打印
    print(val) {
      let _this = this;
      let params = {
        "busicode": "PrintTemplateListPrint",
        "data": _this.tableQuery.companyNo
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.common.print(val, _this.tableQuery.companyNo, 'base_print_template', '', res, _this);
      })
    },
    // 搜索
    search() {
      this.tableQuery.page = 1;
      this.getData()
    },
    // 列表的NO列
    indexMethod(index) {
      return (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1);
    },
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.getData()
    },
    handleCurrentChange(val) {  //页码点击
      this.tableQuery.page = val
      this.getData()
    },
    getData() {
      let _this = this;
      let params = {
        "busicode": "PrintTempBusinessList",
        "data": this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.selServicesData = res
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.printTemplate .kl-table', []);

      }).catch((err) => {
        _this.common.changeTable(_this, '.printTemplate .kl-table', []);
      })

    },
    // 获取树的数据
    getTreeDatas() {
      let _this = this
      let params = {
        "busicode": "CompanyNameList",
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.treeDatas.tree[0].children = res;
        _this.tableQuery.companyNo = res[0].companyNo;
        this.$set(this.crumbsData.titleList, "2", { title: res[0].shortName, method: () => { window.histroy.back() } });
        _this.getData()
      })
    },
    closeDialog() {
      this.printTemplateShow = true;
      this.printTemplateAddVisible = false;
      this.crumbsData.titleList.pop();
    },
    // 返回
    handleClose() {

      this.$refs.printTemplateAdd.handleClose();
    },
    // 关闭弹窗
    close() {
      this.printStyleShow = false;
    },
    // 树的点击
    backTreeData(val) {
      let _this = this;
      this.tableQuery.companyNo = val.companyNo
      this.$set(this.crumbsData.titleList, "2", { title: val.shortName, method: () => { window.histroy.back() } });
      this.getData();
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[3].title;
      this.$refs.printTemplateAdd.submitForm(formName, type, this.tableQuery.companyNo);
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
.printTemplate {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

