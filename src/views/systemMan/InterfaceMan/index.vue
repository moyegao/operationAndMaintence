


<template>
  <div class="InterfaceMan">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="InterfaceManShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="InterfaceManAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('formDataInterfaceManAdd')">保存</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="close">返回</el-button>
        </div>
        <div class="bread-contain-right" v-show="callPageVisible">
          <el-button icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="InterfaceManShow">

        <div class="toolbar">
          <el-form :inline="true" :model="tableQuery" class="demo-form-inline" size="mini">

            <div class="toolbar-left">
              <el-form-item label="服务标识：">
                <el-input class="default_class" v-model="tableQuery.serviceCode" size="mini" @keyup.enter.native="search" clearable></el-input>
              </el-form-item>
              <el-form-item label="服务描述：">
                <el-input class="default_class" v-model="tableQuery.comments" size="mini" @keyup.enter.native="search" clearable></el-input>
              </el-form-item>
              <el-form-item class="button-group">
                <el-button class="compile" type="primary el-icon-search" @click="search" size="mini"></el-button>
              </el-form-item>
            </div>

            <div class="toolbar-right">

            </div>

          </el-form>
        </div>
        <el-table stripe center border :data="selServicesData.list" v-if="tableShow" :max-height="maxHeight" style="width: 100%">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="serviceCode" label="服务标识" width="200">
          </el-table-column>
          <el-table-column prop="className" label="服务类名" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="comments" label="服务描述">
          </el-table-column>
          <el-table-column prop="callCount" width="120" label="调用次数">
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">

              <el-button type="text" @click="appAdd(scope)">修改</el-button>
              <span style="color:#e6e6e6;">|</span>
              <el-button type="text" @click="callPages(scope)">调用页面</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="selServicesData.total">
          </el-pagination>
        </div>
      </div>
      <div v-if="InterfaceManAddVisible" class="interfaceAdd">
        <InterfaceManAdd ref="InterfaceManAdd"></InterfaceManAdd>
      </div>
      <div v-show="callPageVisible" class="interfaceCallPage">
        <callPage ref="callPage"></callPage>
      </div>
    </div>
  </div>
</template>

<script>
import InterfaceManAdd from "./InterfaceManAdd"
import callPage from "./callPage"
export default {
  name: "InterfaceMan",
  components: {
    InterfaceManAdd,
    callPage
  },
  data() {
    return {
      tableShow: false,
      tableQuery: {
        comments: '',
        serviceCode: '',
        page: 1,
        pageCount: 50
      },
      maxHeight: 0,
      selServicesData: {

      },
      InterfaceManAddVisible: false,
      InterfaceManShow: true,
      callPageVisible: false,
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/systemMan' },
          { title: '接口管理', method: () => { window.histroy.back() } }
        ],

      },
      formData: {
        "serviceCode": "",
        "className": "",
        "comments": "",
        "importExample": "",
        "outputExample": "",
        "status": 1,
        "tServiceDetails": []

      },
      formDataService: {}
    }

  },
  mounted() {
    // 侧边栏
    eventBus.$emit("secondMenuShow", "secondMenuShow4")
    this.getData();
  },
  methods: {
    // 初始化列表数据
    getData() {
      let _this = this;

      let params = {
        "busicode": "ServiceList",
        "data": this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.selServicesData = res;
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.InterfaceMan .kl-table', ['.InterfaceMan .toolbar', '.InterfaceMan .block'])

      })
    },
    // 搜索
    search() {
      this.tableQuery.page = 1;
      this.getData()
    },
    // 调用页面弹出
    callPages(scope) {
      this.$set(this.crumbsData.titleList, "2", { title: '调用页面', method: () => { window.histroy.back() } });
      this.$refs.callPage.selPageToServices(scope.row.serviceCode);
      this.callPageVisible = true;
      this.InterfaceManShow = false;
    },
    // 添加按钮点击事件
    appAdd(val) {
      this.InterfaceManAddVisible = true;
      this.InterfaceManShow = false;
      this.$nextTick(() => {
        if (val === 'add') {
          this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });
          this.$refs.InterfaceManAdd.editData({
            "serviceCode": "",
            "className": "",
            "comments": "",
            "importExample": "",
            "outputExample": "",
            "status": 1,
            "tServiceDetails": []

          });
          this.common.chargeObjectEqual(this, this.formData, 'set', 'InterfaceForm');
        } else {
          this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
          let _this = this
          let arr = [val];
          let params = {
            "busicode": "ServiceQuery",
            "data": {
              "serviceId": val.row.serviceId
            },
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {

            _this.formDataService = res;
            // if(_this.formDataService.tServiceDetails.length!==0){
            //   for(let i in _this.formDataService.tServiceDetails){
            //       _this.formDataService.tServiceDetails[i].operation = JSON.parse(_this.formDataService.tServiceDetails[i].operation);
            //     }
            // }

            _this.$refs.InterfaceManAdd.editData(_this.formDataService, 'edit');
            _this.common.chargeObjectEqual(_this, res, 'set', 'InterfaceForm');
          })

        }
      });
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

    handleClose() {

      this.InterfaceManAddVisible = false;
      this.InterfaceManShow = true;
      this.callPageVisible = false;
      this.crumbsData.titleList.pop();
    },
    close() {//返回
      this.$refs.InterfaceManAdd.handleClose();
    },


    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.InterfaceManAdd.submitForm(formName, type);
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    },
    // formDataService(newValue,oldVal){
    //   for(let i = 0; i<newValue.tServiceDetails.length; i++){
    //   }
    // }
  }
}
</script>

<style lang="scss">
.InterfaceMan {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
    .interfaceAdd,
    .interfaceCallPage {
      width: 100%;
      height: calc(100% - 50px);
    }
  }
  .kl-table {
    height: calc(100% - 50px);
  }
}
</style>

