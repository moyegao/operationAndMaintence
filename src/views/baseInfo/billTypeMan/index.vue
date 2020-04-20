



<template>
  <div class="billTypeMan">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="billTypeManShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="billTypeManAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('billTypeManAddRuleForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="billTypeManShow">

        <el-table stripe border :data="appServerData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="receiptNo" label="单据编号" min-width="100">
          </el-table-column>
          <el-table-column prop="receiptName" label="单据名称" min-width="100">
          </el-table-column>
          <el-table-column prop="url" label="URL地址" min-width="100">
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
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="appServerData.total">
          </el-pagination>
        </div>
      </div>
      <div v-show="billTypeManAddVisible">
        <billTypeManAdd ref="billTypeManAdd"></billTypeManAdd>
      </div>
    </div>
  </div>
</template>

<script>
import billTypeManAdd from "./billTypeManAdd"
export default {
  name: "billTypeMan",
  components: {
    billTypeManAdd
  },
  data() {
    return {
      tableShow: false,
      tableQuery: {
        page: 1,
        pageCount: 50
      },
      maxHeight: 0,
      appServerData: [],
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础信息', path: '/ChangeTables' },
          { title: '单据类型管理', method: () => { window.histroy.back() } }
        ],

      },
      billTypeManShow: true,
      billTypeManAddVisible: false,
      formData: {
        receiptNo: "",
        receiptName: "",
        workflowInterface: "",
        url: "",
      },
    }
  },
  mounted() {
    this.selectTSubSystem()
  },
  methods: {
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    // 添加按钮点击事件
    appAdd(val) {
      this.billTypeManShow = false;
      this.billTypeManAddVisible = true;
      if (val === 'add') {
        this.$refs.billTypeManAdd.editData({
          receiptNo: "",
          receiptName: "",
          workflowInterface: "",
          url: "",
        });
        this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });
        this.common.chargeObjectEqual(this, this.formData, 'set', 'billTypeManAdd');
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "ReceiptQuery",
          "data": {
            receiptId: val.row.receiptId
          },
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.billTypeManAdd.editData(res);
          this.common.chargeObjectEqual(this, res, 'set', 'billTypeManAdd');
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
      this.selectTSubSystem()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.selectTSubSystem()
    },
    selectTSubSystem() {
      let _this = this
      let params = {
        "busicode": "ReceiptList",
        "data": this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.appServerData = res
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.billTypeMan .kl-table', ['.billTypeMan .block']);
      })
    },
    closeDialog() {
      this.billTypeManShow = true;
      this.billTypeManAddVisible = false;
      this.crumbsData.titleList.pop();
    },
    // 返回
    handleClose() {

      this.$refs.billTypeManAdd.handleClose();
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.billTypeManAdd.submitForm(formName, type);
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
.billTypeMan {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

