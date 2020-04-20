
<template>
  <!-- 行政区域 -->
  <div class="adminArea">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-show='enterMeterDataShow'>
        <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="handleClose()">返回</el-button>
      </div>
      <div class="bread-contain-right" v-show='adminAreaShow'>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="add('add')">新建</el-button>
      </div>
    </div>
    <div class="company-content" v-show='adminAreaShow'>
      <div class="company-left">
        <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
      </div>
      <div class="kl-table company-right">

        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="appServerData.list" class="wuserInfo-table">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="sname" min-width="80" label="区域简称">
          </el-table-column>

          <!-- // <el-table-column
          //   prop="code"
          //   width="200"
          //   label="区域编号"
          // >
          </el-table-column> -->

          <el-table-column show-overflow-tooltip prop="name" min-width="120" label="区域名称">
          </el-table-column>

          <el-table-column prop="status" min-width="100" label="状态" :formatter="formatStatus">
          </el-table-column>

          <el-table-column prop="createBy" min-width="100" label="创建人">
          </el-table-column>

          <el-table-column prop="createTime" min-width="140" label="创建时间">
          </el-table-column>

          <el-table-column prop="modifyBy" min-width="120" label="最后修改人">
          </el-table-column>

          <el-table-column prop='modifyTime' label='最后修改时间' show-overflow-tooltip min-width="140">
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click.native="add(scope)">编辑</el-button>
              <span style="color:#e6e6e6;">|</span>
              <el-button type="text" @click="addNext(scope.row)">添加下级</el-button>

            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="appServerData.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="adminArea-right-content1" v-show='enterMeterDataShow'>

      <adminAreaAdd ref="child"></adminAreaAdd>

    </div>
  </div>
</template>
<script>
import adminAreaAdd from "./adminAreaAdd"
export default {
  name: "adminArea-index",
  components: {
    adminAreaAdd,
  },
  data() {
    return {
      appServerData: [],//后台返回的请求数据
      tableQuery: {
        code: '',
        page: 1,
        pageCount: 50
      },
      ruleForm: { //表单数据
        id: '',
        parentId: '',
        code: '',//区域编号
        name: '',//区域名称
        sname: '',//简称
        status: 1,//区域状态
        // parentName:"根目录",
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础信息', path: '/baseInfo' },
          { title: '行政区域', method: () => { window.histroy.back() } },
        ],
      },
      treeDatas: {
        tree: [],
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: '请输入节点'
        },
        sendTreeProp: ['code', 'name', 'districtArr', 'children', 'companyNo', 'group', 'isLeaf', 'isParent', 'parent', 'id'],
        rootName: '根目录',
        defaultOpen: {
          nodeKey: 'id',
          // nodeItem:164
        }
      },
      maxHeight: 0,
      tableShow: false,
      enterMeterDataShow: false,
      enterMeterDate: '',
      adminAreaShow: true,
      companyNo: "",
    }
  },
  mounted() {
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.adminArea .kl-table', ['.adminArea .block'])
    });
    this.selectTSubSystemTree();
    this.selectTSubSystem();

  },
  methods: {
    selectTSubSystemTree() {
      let _this = this
      let params = {
        "busicode": "DistrictTree",
        "data": {},
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.treeDatas.tree = res;
        _this.companyNo = res.id;
      })
    },
    selectTSubSystem() {
      let _this = this
      let params = {
        "busicode": "DistrictList",
        "data": _this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.$set(_this.appServerData, 'list', res.pageInfo.list)
        _this.appServerData.total = res.pageInfo.total;
        let lenth = res.navData.length;
        _this.$refs.child.parentName = res.navData[lenth - 1].name;
        // _this.total = res.pageInfo.total;
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(this, '.adminArea .kl-table', ['.adminArea .block'])
      })
    },
    formatStatus(row) { //转义
      return row.status === 1 ? '启用' : '停用'
    },
    //分页
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.selectTSubSystem()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.selectTSubSystem()
    },
    indexMethod(index) {//获取表格序号
      return (
        (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1)
      );
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.child.submitForm(formName, type);
    },
    //数据清空
    clear() {
      this.ruleForm.name = '';
      this.ruleForm.sname = '';
      this.ruleForm.status = 1;
    },
    add(val) {//添加
      this.clear();
      let that = this;
      if (val === 'add') {
        that.$set(that.crumbsData.titleList, "2", { title: '新建', method: () => { window.histroy.back() } });
        that.$refs.child.editData(that.ruleForm);
        that.common.chargeObjectEqual(that, that.ruleForm, 'set', 'childAdminArea');
      } else {
        that.$set(that.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let row = val.row;
        let child = that.$refs.child.ruleForm;
        child.code = row.code;
        child.name = row.name;
        child.sname = row.sname;
        child.status = row.status;
        child.parentId = row.parentId;
        child.id = row.id;
        // child.parentName = row.parentName;
        that.common.chargeObjectEqual(that, child, 'set', 'childAdminArea');
      }
      this.adminAreaShow = false;
      this.enterMeterDataShow = true;
    },
    closeDialog() {
      this.enterMeterDataShow = false;
      this.crumbsData.titleList.pop();
      this.$refs.child.resetForm();
      this.adminAreaShow = true;
    },
    handleClose() {
      this.$refs.child.handleClose();
    },
    addNext(val) {
      this.adminAreaShow = false;
      this.enterMeterDataShow = true;
      this.$set(this.crumbsData.titleList, "2", { title: '添加下级', method: () => { window.histroy.back() } });
      this.ruleForm.code = val.code;
      this.ruleForm.parentId = val.id;
      this.$refs.child.parentName = val.name;
      this.$refs.child.editData(this.ruleForm, val.name);
      this.common.chargeObjectEqual(this, this.ruleForm, 'set', 'childAdminArea');
    },
    backTreeData(e) {
      let that = this;
      let treeData = that.treeDatas.tree;
      // let code = '';
      let name = '';
      let child = [];
      let kid = [];
      let kids = [];
      let parentName = '';
      that.ruleForm.parentId = e.id;
      that.ruleForm.code = e.code;
      if (e.id === treeData.id) {
        // code = treeData.code;
        name = treeData.name;
        parentName = name;
        // console.log(that.crumbsData.titleList,"根目录",num);//根目录 3
        // that.$set(that.crumbsData.titleList, "2", { title: name, method: () => { window.histroy.back() } });
      } else {
        child = treeData.children;
        for (let i = 0; i < child.length; i++) {
          if (e.id === child[i].id) {
            // code = child[i].code;
            name = child[i].name
            parentName = name;
            // console.log(that.crumbsData.titleList,"某某省",that.crumbsData.titleList.length);//某某省 4
            // that.$set(that.crumbsData.titleList, "3", { title: name, method: () => { window.histroy.back() } });
          } else {
            kid = child[i].children
            for (let j = 0; j < kid.length; j++) {
              if (e.id === kid[j].id) {
                // code = kid[j].code;
                name = kid[j].name;
                parentName = name;
                // console.log(that.crumbsData.titleList,"某某市",that.crumbsData.titleList.length);//某某市 5
                // that.$set(that.crumbsData.titleList, "4", { title: name, method: () => { window.histroy.back() } });
              } else {
                kids = kid[j].children
                for (let k = 0; k < kids.length; k++) {
                  if (e.id === kids[k].id) {
                    name = kids[k].name;
                    parentName = name;
                  }
                }
              }
            }
          }
        }
      }
      this.$refs.child.parentName = parentName;
      this.tableQuery.code = e.code
      this.selectTSubSystem()
    },

  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
  }
}
</script>
<style lang="scss">
$imgWidth: 200px;
$theme-color: #297acc;
.adminArea {
  height: 100%;
  .longinput .el-input__inner {
    width: 160px;
  }
  .company-content{
    height: 90%;
  }
}
</style>

