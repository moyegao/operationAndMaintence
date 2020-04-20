

<template>
  <div class="childSystem">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="childSystemShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="childSystemAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('childSystemAddruleForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="childSystemShow">

        <el-table stripe border :data="appServerData.list" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="systemCode" label="子系统编号" min-width="100">
          </el-table-column>
          <el-table-column prop="systemName" label="子系统名称" min-width="100">
          </el-table-column>
          <el-table-column prop="allowIp" label="接口允许IP" min-width="100">
          </el-table-column>
          <el-table-column prop="forbidIp" label="接口禁止IP" min-width="100">
          </el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" min-width="80" label="状态">
          </el-table-column>
          <el-table-column prop="comments" label="描述" min-width="150">
          </el-table-column>

          <el-table-column label="操作" width="80px" fixed="right">
            <template slot-scope="scope">

              <el-button type="text" @click="appAdd(scope)">编辑</el-button>

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
            :total="appServerData.rowCount">
          </el-pagination>
        </div> -->
      </div>
      <div v-show="childSystemAddVisible">
        <childSystemAdd ref="childSystemAdd"></childSystemAdd>
      </div>
    </div>
  </div>
</template>

<script>
import childSystemAdd from "./childSystemAdd"
export default {
  name: "childSystem",
  components: {
    childSystemAdd
  },
  data() {
    return {
      tableShow: false,
      tableQuery: {
        page: 1,
        pageCount: 20
      },
      maxHeight: 0,
      appServerData: [],
      formData: {
        systemCode: "",
        systemName: "",
        status: 1,
        allowIp: "",
        forbidIp: "",
        comments: "",
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/systemMan' },
          { title: '子系统管理', method: () => { window.histroy.back() } }
        ],

      },
      childSystemShow: true,
      childSystemAddVisible: false,
    }
  },
  mounted() {
    this.selectTSubSystem();
  },
  methods: {
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    // 添加按钮点击事件
    appAdd(val) {
      if (val === 'add') {
        this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });
        this.$refs.childSystemAdd.editData({
          systemCode: "",
          systemName: "",
          status: 1,
          allowIp: "",
          forbidIp: "",
          comments: "",
        });
        this.common.chargeObjectEqual(this, this.formData, 'set', 'childSystemAdd');

      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "TSubSystemList",
          "data": {
            subsystemId: val.row.subsystemId
          },
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.childSystemAdd.editData(res[0]);
          this.common.chargeObjectEqual(this, res[0], 'set', 'childSystemAdd');
        })

      }
      this.childSystemShow = false;
      this.childSystemAddVisible = true;
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
        "busicode": "TSubSystemList",
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.$set(_this.appServerData, 'list', res)
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.childSystem .kl-table', []);
      })
    },
    closeDialog() {
      this.childSystemShow = true;
      this.childSystemAddVisible = false;
      this.crumbsData.titleList.pop();
      this.$refs.childSystemAdd.resetForm();
    },
    handleClose() {

      this.$refs.childSystemAdd.handleClose();
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.childSystemAdd.submitForm(formName, type);
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
.childSystem {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

