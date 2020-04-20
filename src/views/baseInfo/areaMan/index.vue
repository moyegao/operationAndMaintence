

<template>
<!-- 片区管理 -->
  <div class="areaMan">
    <div class="main-content">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right" v-show="areaManShow">
                <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">新建</el-button>
            </div>
            <div class="bread-contain-right" v-show="areaManAddVisible">
              <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button  icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
            </div>
        </div>
      <div class="kl-table" v-show="areaManShow">
        

        <el-table
          stripe border
          :data="appServerData.list"
          v-if="tableShow"
          :max-height="maxHeight">
          <el-table-column
            type="index"
            label="NO."
            width="50"
            fixed="left"
            :index="indexMethod">
          </el-table-column>

          <el-table-column
            prop="areaNo"
            label="片区编号"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="areaName"
            label="片区名称"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            :formatter="formatStatus"
            min-width="80"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="comments"
            label="备注"
            min-width="150">
          </el-table-column>

          <el-table-column label="操作"  width="80px" fixed="right">
            <template slot-scope="scope">
              
              <el-button type="text" @click="appAdd(scope)">编辑</el-button>
               <!-- <span style="color:#e6e6e6;">|</span>
               <el-button type="text"  @click="auth(scope)">授权范围</el-button> -->

            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableQuery.page"
            :page-sizes="[50, 100, 500, 1000]"
            :page-size="tableQuery.pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div v-show="areaManAddVisible">
          <areaManAdd ref="child"></areaManAdd>
      </div>
    </div>
  </div>
</template>

<script>
import areaManAdd from "./areaManAdd"
  export default {
    name: "areaMan",
    components:{
        areaManAdd
    },
    data() {
      return {
        total:0,//数据总数
        tableShow: true,
        tableQuery:{
          page:1,
          pageCount:50
        },
        maxHeight:0,
        appServerData:[],
        showSelectIndex:-1,
        formData:{
          "areaNo":"",
          "areaName":"",
          "status":"",
          "comments":"",
        },
        crumbsData :{  //面包屑
            titleList:[
                {title:'基础信息',path:'/ChangeTables'},
                {title:'片区管理',method:()=>{window.histroy.back()}}
            ],
            
        },
        areaManShow:true,
        areaManAddVisible:false,
      }
    },
    mounted() {
      this.selectTSubSystem()
    },
    methods: {
       //保存数据
      submitForm(formName){
        let type = this.crumbsData.titleList[2].title;
        this.$refs.child.submitForm(formName,type);
        // this.selectTSubSystem();
        // this.$refs.child.submitForm()
      },
      clear(){
        this.formData.areaNo = "";
        this.formData.areaName = '';
        this.formData.status = 1;
        this.formData.comments = '';
      },
      // 格式化状态
      formatStatus(row) {
        return row.status === 1 ?"启用" : "停用"
      },
      // 添加按钮点击事件
      appAdd(val) {
        this.clear();
        // sessionStorage.setItem('formData',JSON.stringify(this.formData));
        if(val==='add'){
          this.$set(this.crumbsData.titleList,"2",{title:'新建',method:()=>{window.histroy.back()}});
          this.$refs.child.editData(this.formData)
          this.common.chargeObjectEqual(this,this.formData,'set','childAreaMan');
        }else{
          this.$set(this.crumbsData.titleList,"2",{title:'编辑',method:()=>{window.histroy.back()}});
          let _this = this;
          let params = {
              "busicode": "CompanyAreaQuery",
              "data": {
                companyAreaId:val.row.companyAreaId
              },
          }
          this.$api.fetch({
            params,//参数
          }).then(res => {
            this.$refs.child.editData(res);
            sessionStorage.setItem('formData',JSON.stringify(this.formData));
            this.common.chargeObjectEqual(this,res,'set','childAreaMan');
          })
        }
        this.areaManShow = false;
        this.areaManAddVisible = true;
      },
      // 展示单元格内部选项框
      showSelect(scope) {
        this.showSelectIndex = scope.$index
      },
      // 单元格内下拉框点击事件
      editor(scope){
        this.formData = scope.row
        // this.$store.commit('saveFormData',this.formData)
        // sessionStorage.setItem('formData',JSON.stringify(this.formData));
        this.parentAppDialogVisible = true
      },
      indexMethod(index) {
        return (this.tableQuery.page - 1)*(this.tableQuery.pageCount) + index + 1;
        // return index + 1
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
      //初始化数据
      selectTSubSystem() {
        let _this = this
        let params = {
            "busicode": "CompanyAreaList",
            "data": _this.tableQuery,
            "token": "krrjdev123",
            "sysType": "001"
        }
        this.$api.fetch({
            params: params,//参数
          }).then(res => {
              _this.$set(_this.appServerData,'list',res.list)
              // _this.appServerData.list = res.data
              _this.total = res.total;
              //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
              // _this.$changeTable(_this,'.areaMan .kl-table',['.areaMan .toolbar','.areaMan .block','.areaMan .tab-title'])
              _this.common.changeTable(this,'.areaMan .kl-table',['.areaMan .block'])
          })
      },
      closeDialog(){
        this.areaManShow = true;
        this.areaManAddVisible = false;
        this.crumbsData.titleList.pop();
        this.$refs.child.resetForm();
      },
      handleClose() {
        this.$refs.child.handleClose();
      },
    },
    watch:{
      maxHeight(){
        this.tableShow = false
        this.$nextTick(()=>{
          this.tableShow = true
        })
      }
    }
  }
</script>

<style lang="scss">
.areaMan{
  width: 100%;
  height: 100%;
  .main-content{
    height: 100%;
  }
}
</style>

