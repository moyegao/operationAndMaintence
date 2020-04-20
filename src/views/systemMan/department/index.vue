



<template>
  <div class="department">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="departmentShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="departmentAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('departmentAddRuleForm')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="company-content" v-show='departmentShow'>
        <div class="company-left">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="company-right kl-table">

          <el-table stripe border :data="appServerData.list" v-if="tableShow" :max-height="maxHeight">
            <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
            </el-table-column>

            <el-table-column prop="matrNo" label="组织编号" min-width="100">
            </el-table-column>
            <el-table-column prop="matrNo" label="组织名称" min-width="100">
            </el-table-column>
            <el-table-column prop="matrName" label="组织路径名称" min-width="100">
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[20, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="appServerData.total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div v-show="departmentAddVisible">
        <departmentAdd ref="departmentAdd"></departmentAdd>
      </div>
    </div>
  </div>
</template>

<script>
import departmentAdd from "./departmentAdd"
export default {
  name: "department",
  components: {
    departmentAdd
  },
  data() {
    return {
      tableShow: true,
      tableQuery: {
        page: 1,
        pageCount: 20
      },
      maxHeight: 0,
      appServerData: {},
      formData: {
        matrNo: "",
        matrName: "",
        matrMode: "",
        matrNum: "",
        matrUnit: "",
        matrPrice: "",
      },
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统设置', path: '/ChangeTables' },
          { title: '组织架构', method: () => { window.histroy.back() } }
        ],

      },
      treeDatas: {
        tree: [
          {
            shortName: '根目录',
            id: '2',
            children: [{
              shortName: '粤海水务',
              id: '3',
              children: []
            },
            {
              shortName: '粤港供水',
              id: '4',
              children: []
            }
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
        sendTreeProp: ['code', 'name', 'districtArr', 'children', 'companyNo', 'group', 'isLeaf', 'isParent', 'parent', 'id'],
        rootName: '根目录',
        defaultOpen: {
          nodeKey: 'id',
          // nodeItem:164
        }
      },
      departmentShow: true,
      departmentAddVisible: false,
    }
  },
  mounted() {
    this.selectTSubSystemTree();
    this.selectTSubSystem()
  },
  methods: {
    selectTSubSystemTree() {

      // let _this = this
      // let params = {
      //   "busicode": "DistrictTree",
      //   "data": {},
      // }
      // this.$api.fetch({
      //   params,//参数
      // }).then(res => {
      //   _this.treeDatas.tree = res;
      //   _this.companyNo = res.id;
      // })
    },
    // 格式化状态
    formatStatus(row) {
      return row.status === 1 ? "启用" : "禁用"
    },
    // 添加按钮点击事件
    appAdd(val) {
      this.departmentShow = false;
      this.departmentAddVisible = true;
      if (val === 'add') {
        this.$refs.departmentAdd.editData({
          matrNo: "",
          matrName: "",
          matrMode: "",
          matrNum: "",
          matrUnit: "",
          matrPrice: "",
        });
        this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });
        this.common.chargeObjectEqual(this, this.formData, 'set', 'departmentAdd');
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "MatrTemplateQuery",
          "data": {
            matrId: val.row.matrId
          },
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          this.$refs.departmentAdd.editData(res);
          this.common.chargeObjectEqual(this, res, 'set', 'departmentAdd');
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
      // let _this = this
      // let params = {
      //     "busicode": "MatrTemplateList",
      //     "data": this.tableQuery,
      // }
      // this.$api.fetch({
      //   params: params,//参数
      // }).then(res => {
      //   _this.appServerData = res        
      //   //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      //   _this.common.changeTable(_this,'.department .kl-table',[]);
      // })

    },
    closeDialog() {
      this.departmentShow = true;
      this.departmentAddVisible = false;
      this.crumbsData.titleList.pop();
    },
    // 返回
    handleClose() {

      this.$refs.departmentAdd.handleClose();
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.departmentAdd.submitForm(formName, type);
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
    }
  }
}
</script>

<style lang="scss">
.department {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

