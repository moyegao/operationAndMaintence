

<template>
  <div class="saleSet">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="saleSetShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="saleSetAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('saleSetAddRuleForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="company-content" v-show="saleSetShow">
        <div class="company-left">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="kl-table company-right">

          <el-table stripe border :data="appServerData" v-if="tableShow" :max-height="maxHeight">
            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="businessBranch" label="营业网点" min-width="100">
            </el-table-column>
            <el-table-column prop="chargingType" label="收费类型" min-width="100">
            </el-table-column>
            <el-table-column prop="outBank" min-width="100" label="出盘银行">
            </el-table-column>
            <el-table-column prop="status" min-width="80" label="状态">
            </el-table-column>
            <el-table-column prop="comments" min-width="120" label="备注">
            </el-table-column>

            <el-table-column label="操作" width="80px" fixed="right">
              <template slot-scope="scope">

                <el-button type="text" @click="appAdd(scope)">编辑</el-button>
                <!-- <span style="color:#e6e6e6;">|</span>
                  <el-button type="text"  @click="auth(scope)">授权范围</el-button> -->

              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div v-show="saleSetAddVisible">
        <saleSetAdd ref="saleSetAdd"></saleSetAdd>
      </div>
    </div>
  </div>
</template>

<script>
import saleSetAdd from "./saleSetAdd"
export default {
  name: "saleSet",
  components: {
    saleSetAdd
  },
  data() {
    return {
      tableShow: false,
      maxHeight: 0,
      appServerData: [],
      formData: {
        businessBranch: '',
        chargingType: "",
        outBank: '',
        expSql: "",
        expFileType: "",
        monthidIdx: "",
        returnUserNoColumn: "",
        returnMoneyColumn: "",
        returnResultColumn: "",
        descIdx: "",
        successFlag: "",
        status: "",
        comments: ""
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '水司配置', path: '/waterSet' },
          { title: '出回盘配置', method: () => { window.histroy.back() } }
        ],

      },
      saleSetShow: true,
      saleSetAddVisible: false,
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
      companyNo: "C021028",
    }
  },
  mounted() {
    this.selectTSubSystem();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.saleSet .kl-table', []);
    })
  },
  methods: {
    // 添加按钮点击事件
    appAdd(val) {
      this.saleSetShow = false;
      this.saleSetAddVisible = true;
      if (val === 'add') {
        this.$refs.saleSetAdd.editData({
          businessBranch: '',
          chargingType: "",
          outBank: '',
          expSql: "",
          expFileType: "",
          monthidIdx: "",
          returnUserNoColumn: "",
          returnMoneyColumn: "",
          returnResultColumn: "",
          descIdx: "",
          successFlag: "",
          status: "",
          comments: ""
        });
        this.crumbsData.titleList.push({ title: '添加', method: () => { window.histroy.back() } });
        this.common.chargeObjectEqual(this, this.formData, 'set', 'saleSetAdd');
      } else {
        this.crumbsData.titleList.push({ title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "BankConfigQuery",
          "data": {
            bankConfigId: val.row.bankConfigId,
            companyNo: this.companyNo
          },
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.saleSetAdd.editData(res);
          this.common.chargeObjectEqual(this, res, 'set', 'saleSetAdd');
        })
      }

    },
    // 列表的NO列
    indexMethod(index) {
      return index + 1;
    },

    selectTSubSystem() {
      this.getTreeDatas();
      let _this = this;
      let params = {
        "busicode": "BankConfigList",
        "data": { companyNo: this.companyNo },
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.appServerData = res;

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
        _this.treeDatas.tree[0].companyNo = res[0].companyNo;
        _this.companyNo = res[0].companyNo;
        this.$set(this.crumbsData.titleList, "2", { title: '根目录', method: () => { window.histroy.back() } });
      })
    },
    closeDialog() {
      this.saleSetShow = true;
      this.saleSetAddVisible = false;
      this.crumbsData.titleList.pop();
    },
    // 返回
    handleClose() {

      this.$refs.saleSetAdd.handleClose();
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[3].title;
      this.$refs.saleSetAdd.submitForm(formName, type, this.companyNo);
    },
    // 树的点击
    backTreeData(val) {
      let _this = this;
      // this.treeParantId = val.id;
      this.companyNo = val.companyNo
      this.$set(this.crumbsData.titleList, "2", { title: val.shortName, method: () => { window.histroy.back() } });
      let params = {
        "busicode": "BankConfigList",
        "data": { companyNo: this.companyNo },
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {

        _this.appServerData = res;

      })
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      })
    }
  }
}
</script>

<style lang="scss">
.saleSet {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

