

<template>
  <div class="funModule">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-show='enterMeterDataShow'>
        <el-button size="mini" type="primary" @click="submitForm('funModuleAddruleForm')">保存</el-button>
        <el-button icon="el-icon-caret-left" size="mini" @click="close()">返回</el-button>
      </div>
      <div class="bread-contain-right" v-show='funModuleShow'>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="add('add')">添加</el-button>
      </div>
    </div>
    <div class="funModule-right-content" v-show='funModuleShow'>
      <div class="kr-left">
        <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
      </div>
      <div class="kr-right kl-table">

        <el-table v-if="tableShow" :max-height="maxHeight" stripe border :data="tableData.list" class="wuserInfo-table">
          <el-table-column
            type="index"
            label="NO."
            width="50"
            fixed="left"
            :index="indexMethod"
            >
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            prop="moduleName"
            min-width="80"
            label="模块名称">
          </el-table-column>

          <el-table-column
            prop="moduleLevel"
            min-width="120"
            label="模块级别"
          >
          </el-table-column>

          <el-table-column
            prop="pageAddr"
            min-width="100"
            label="页面路径"
          >
          </el-table-column>

          <el-table-column
            prop="status"
            min-width="100"
            label="状态"
            :formatter="formatStatus"
          >
          </el-table-column>

          <el-table-column
            prop="comments"
            min-width="120"
            label="备注">
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <el-button type="text"  @click.native="add(scope)">编辑</el-button>
              

            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="funModule-right-content1" v-show='enterMeterDataShow'>

      <funModuleAdd ref="funModuleAdds"></funModuleAdd>

    </div>
  </div>
</template>
<script>
import funModuleAdd from "./funModuleAdd"
export default {
  name: "funModule-index",
  components: {
    funModuleAdd,
  },
  data() {
    return {
      tableData: {},
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/baseInfo' },
          { title: '功能模块', },
          { title: '根目录', },
        ],
      },
      treeDatas: {
        tree: [
          { 
            foreignkey: '全部', 
            id: '222', 
            _child: [
              { 
                foreignkey: '客服平台', 
                id: '222', 
                _child: [
                  { foreignkey: '首页', id: '222' }, 
                  { foreignkey: '抄表中心', id: '222' }, 
                  { foreignkey: '工程中心', id: '222' }, 
                  { foreignkey: '服务中心', id: '222' }
                ] 
              }
            ] 
          }
        ],
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        inputProp: {
          showSearch: false,
          Inp_placeholder: '请输入节点'
        },
        sendTreeProp: ['code', 'name', 'districtArr', 'children', 'id', 'group', 'isLeaf','isParent','parent','sonData'],
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
      funModuleShow:true,
      total: 5,
      formData:{ 
            moduleName:'',
            pageAddr:'',
            sort:'',
            status:1,
            comments:'' 
          },
      tableQuery:{
        pageCount:50,
        page:1
      },
      treeParantId:""

    }
  },
  mounted() {
    this.getData();
    
  },
  methods: {
    getData() {
      let _this = this
      let params = {
          "busicode": "SysModuleList",
          "data": this.tableQuery,
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
            // _this.$set(_this.tableData,'list',res.data)
            _this.tableData = res;
            //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
            _this.common.changeTable(_this, '.funModule .kl-table', ['.funModule .block']);

      })
      this.getTreeDatas();
    },
    // 获取树的数据
    getTreeDatas(){
      let _this = this
      let params = {
        "busicode": "SysModuleTree",
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        this.treeDatas.tree = res;

      })
    },
    formatStatus(row){ //转义
        return row.status ===1?'启用':'停用'
    },
    //分页
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val;
      this.tableQuery.page = 1;
      this.getData();
    },
    handleCurrentChange(val) {  //页面点击
      this.tableQuery.page = val;
      this.getData();
    },
    // 列表的NO列
    indexMethod(index) {
      return (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
    },
    add(val) {//添加
      if(val==='add'){
            this.$set(this.crumbsData.titleList,"3",{title:'添加',method:()=>{window.histroy.back()}});
            this.$refs.funModuleAdds.editData({ 
              moduleName:'',
              pageAddr:'',
              sort:'',
              status:1,
              comments:'' 
            });
         
            this.common.chargeObjectEqual(this,this.formData,'set','funModuleForm');
        }else{
            this.$set(this.crumbsData.titleList,"3",{title:'编辑',method:()=>{window.histroy.back()}});
            let _this = this;
            let params = {
                "busicode": "SysModuleList",
                "data": {
                  moduleId:val.row.moduleId
                },
            }
            this.$api.fetch({
              params: params,//参数
            }).then(res => {
              this.$refs.funModuleAdds.editData(res.list[0]);
              this.common.chargeObjectEqual(this,res.list[0],'set','funModuleForm');
            })

        }
      this.funModuleShow = false;
      this.enterMeterDataShow = true;
    },
    callBack(){
      this.crumbsData.titleList.pop();
      this.enterMeterDataShow = false;
      this.funModuleShow = true;
    },
    close(){//返回
      this.$refs.funModuleAdds.handleClose();
    },
    // 树的点击
    backTreeData(val) { 
      let _this = this;
      this.treeParantId = val.id;
      this.$set(this.crumbsData.titleList,"2",{title:val.name,method:()=>{window.histroy.back()}});
      let params = {
          "busicode": "SysModuleList",
          "data": {
            moduleCode:val.code
          },
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {

        // _this.$set(_this.tableData,'list',res.data)
        _this.tableData = res;
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.funModule .kl-table', ['.funModule .block']);

      })
    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.funModuleAdds.submitForm(formName,type,this.treeParantId);
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
.funModule {
  height: 100%;
  
  .block {
    text-align: right;
    padding: 10px 0px;
  }
  .funModule-right-content1 {
    height: 100%;
    .kr-right1-top {
      // height: 40px;
      display: flex;
      justify-content: space-between;
      padding: 10px 20px 10px 10px;
      
      .form-right {
      }
    }
    .kr-right1-buttom {
      height: 100%;
      display: flex;
      .luru-right {
        width: 27%;
        border-right: 1.5px solid rgb(234, 244, 255);

        .luru-right-detail {
          padding: 10px 20px;
          .label-detail {
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 20px;
            padding: 0 10px 14px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          .dialogcontent-detail {
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #121315;
            line-height: 20px;
            padding: 0 10px 14px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
        }
        .luru-righ-check {

          .label-detail {
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 20px;
            padding: 0 10px 14px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
          .dialogcontent-detail {
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #121315;
            line-height: 20px;
            padding: 0 10px 14px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }
        }
      }
      .luru-left {
        width: 73%;
      }
    }
  }
  .dialog-jichao {
    height: 85%;
    .el-dialog {
      height: 100% !important;
    }
    .el-dialog__body {
      padding: 0px 20px;
      .primaryData{
        margin-top: 10px;
        padding-left:20px;
        b{
          font-weight: 400;
          color:#000;
        }
        span{
          margin-right: 10px;
        }
      }
      .el-form{
        width: 100%;
        zoom: 1;
        &:after{
          display: block;
          content:"";
          clear: both;
        }
        .form-left {
          .el-form-item {
            margin-bottom: 0px;
          }
          & > .el-form-item__content{
            width: 100%;
          }
          .searchBtn {
            margin-left: 1.5rem;
            background: #faa646;
            color: #fff;
            height: 28px;
            margin-top: 0.5rem;
          }
        }
      }
      
    }
  }


  .funModule-right-content {
    height: calc(100% - 60px);
    overflow-y: auto;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    .kr-left {
      width: 18%;
      height: 100%;

    }
    .kr-right {
      width: 81%;
      height: 100%;
      table {
        overflow: auto;
        width: 100%;
        thead th {
          width: 10%;
          font-size: 14px;

        }
        tbody tr {

          margin-top: 1rem;
          td {
            text-align: center;
            .el-input,
            .el-select {
              width: 95%;
            }
          }
        }
      }
    }
  }
  .btnBox {
    display: inline-block;
    width: 100%;
    text-align: right;
    margin-bottom: 2%;
  }
  .btnBox .el-button {
    margin-left: 1%;
    font-size: 14px;
  }
  .my-input {
    width: 90%;
    display: inline-block;
    // padding-left: 10%;
    .el-input__inner {
      width: 100% !important;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .my-input .el-input {
    width: 100% !important;
  }
  .my-input .el-select .el-input {
    width: 100%;
  }
  .my-important {
    .el-form-item__label {
      color: red;
      font-weight: bolder;
    }
  }
  .dialogcontent {
    width: 100%;
    display: inline-block;
  }
  .dialogcontent span {
    width: 100%;
    display: inline-block;
    // border-bottom: 1px solid;
  }
  .dialogcontent1 {
    width: 58%;
    display: inline-block;
  }
  .inputcontent {
    width: 52%;
    display: inline-block;
    // border-bottom: 1px solid;
  }
  .dialogcontent2 {
    width: 58%;
    display: inline-block;
  }
  .dialogcontent3 {
    width: 40%;
    display: inline-block;
  }
  .dialogcontent3 .inputcontent {
    width: 100%;
    display: inline-block;
    // border-bottom: 1px solid;
  }
  .kl-table {
    padding: 0 20px;
    .block {
      text-align: right;
      padding: 10px 0px;
    }
  }
  .longinput .el-input__inner {
    width: 160px;
  }
}
</style>

