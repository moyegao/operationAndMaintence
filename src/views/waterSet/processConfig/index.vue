
<template>
  <div class="processConfig">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="processConfigShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="processConfigAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('processConfigAddForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="company-content" v-show="processConfigShow">
        <div class="company-left">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="kl-table company-right">
          <div class="toolbar">
            <el-form :inline="true" :model="tableQuery" class="demo-form-inline" size="mini">

              <div class="toolbar-left" style="width: 80%;">
                <el-form-item label="流程名称：">
                  <el-input class="default_class" v-model="tableQuery.processName" size="mini" @keyup.enter.native="search" clearable></el-input>
                </el-form-item>
                <el-form-item label="审批状态：" prop="processState" style="width:50%">
                  <el-select v-model="tableQuery.processState" placeholder="请选择">
                    <el-option v-for="item in processStateData" :key="item.nodeCode" :label="item.nodeName" :value="item.nodeCode">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="button-group">
                  <el-button class="compile" type="primary el-icon-search" @click="search" size="mini"></el-button>
                </el-form-item>
              </div>

            </el-form>
          </div>

          <el-table stripe border :data="selServicesData" v-if="tableShow" :max-height="maxHeight">

            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>
            <el-table-column prop="processState" label="审批状态" :formatter="formatProcessStatus">
            </el-table-column>
            <el-table-column prop="receiptTypeName" label="单据类型">
            </el-table-column>
            <el-table-column prop="processCode" label="流程标识" width="200">
            </el-table-column>
            <el-table-column prop="platId" label="流程编号" width="200">
            </el-table-column>
            <el-table-column prop="processName" label="流程名称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" label="状态" :formatter="formatStatus">
            </el-table-column>
            <el-table-column label="操作" width="150px" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="appAdd(scope)">编辑</el-button>
                <span style="color:#e6e6e6;">|</span>
                <el-button type="text" @click="design(scope)">设计</el-button>
                <span style="color:#e6e6e6;">|</span>
                <el-button type="text" @click="refreshNode(scope)">刷新节点</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-show="processConfigAddVisible" style="height:92%;overflow:auto;">
        <processConfigAdd ref="processConfigAdd"></processConfigAdd>
      </div>
    </div>
  </div>
</template>

<script>
import processConfigAdd from "./processConfigAdd"
export default {
  name: "processConfig",
  components: {
    processConfigAdd,
  },
  data() {
    return {
      tableShow: true,
      maxHeight: 0,
      selServicesData: [],
      processStateData: [],
      tableQuery: {
        processName: '',
        companyNo: '',
        processState: ''
      },
      formData: {
        companyNo: '',
        id: "",
        processCode: '',
        platId: '',
        processName: "",
        receiptType: '',
        status: "",
        tenantId: "",
        processInstanceId: "",
        processState: "",
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '水司配置', path: '/waterSet' },
          { title: '审批流配置', method: () => { window.histroy.back() } },
          { title: '根目录', method: () => { window.histroy.back() } }
        ],

      },
      processConfigShow: true,
      processConfigAddVisible: false,
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
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    //格式化显示流程状态
    formatProcessStatus(row) {
      for (let i = 0; i < this.processStateData.length; i++) {
        if (row.processState == this.processStateData[i].nodeCode) {
          return this.processStateData[i].nodeName;
        }
      }
      return row.processState
    },
    // 添加按钮点击事件
    appAdd(val) {
      this.processConfigShow = false;
      this.processConfigAddVisible = true;
      if (val === 'add') {
        this.$refs.processConfigAdd.editData({
          id: "",
          processCode: '',
          platId: '',
          processName: "",
          receiptType: '',
          status: "",
          tenantId: "",
          processInstanceId: "",
          processState: "",
          companyNo: this.tableQuery.companyNo
        });
        this.formData.companyNo = this.tableQuery.companyNo;
        this.$set(this.crumbsData.titleList, "3", { title: '添加', method: () => { window.histroy.back() } });
        this.common.chargeObjectEqual(this, this.formData, 'set', 'processConfigAdd');
      } else {
        this.$set(this.crumbsData.titleList, "3", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "processConfigQuery",
          "data": {
            "id": val.row.id,
            "companyNo": _this.tableQuery.companyNo
          }
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          res.companyNo = _this.tableQuery.companyNo;
          this.$refs.processConfigAdd.editData(res);
          this.common.chargeObjectEqual(this, res, 'set', 'processConfigAdd');
        })
      }

    },
    design(val) {
      window.open("http://192.168.49.140:8095/workflow/workflow/workFlowDesign.htm?workflowid=" + val.row.platId);
    },
    // 搜索
    search() {
      this.tableQuery.page = 1;
      this.getData()
    },
    // 列表的NO列
    indexMethod(index) {
      return (index + 1);
    },
    getData() {
      let _this = this;
      // ********************************获取审批状态数据
      _this.common.getProcessStateData("BASE_PROCESS_CONFIG", _this.tableQuery.companyNo, _this, (res) => {
        _this.processStateData = res;
        //需要先获取审批状态，才能查询数据
        let params = {
          "busicode": "ProcessConfigList",
          "data": _this.tableQuery,
        }
        _this.$api.fetch({
          params: params,//参数
        }).then(res => {
          _this.selServicesData = res
          //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
          _this.common.changeTable(_this, '.processConfig .kl-table', []);
        }).catch((err) => {
          _this.common.changeTable(_this, '.processConfig .kl-table', []);
        })

      });
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
        _this.getData();
      })
    },
    refreshNode(val) {
      let _this = this;
      let params = {
        "busicode": "ProcessConfigNodeRefresh",
        "data": {
          "processCode": val.row.processCode,
          "companyNo": _this.tableQuery.companyNo
        }
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.$message({
          showClose: true,
          message: '执行成功',
          type: 'success'
        });
      })
    },
    closeDialog() {
      this.processConfigShow = true;
      this.processConfigAddVisible = false;
      this.crumbsData.titleList.pop();
    },
    // 返回
    handleClose() {

      this.$refs.processConfigAdd.handleClose();
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
      this.$refs.processConfigAdd.submitForm(formName, type, this.tableQuery.companyNo);
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
.processConfig {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

