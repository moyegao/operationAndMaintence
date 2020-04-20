


<template>
  <!-- 银行接口 -->
  <div class="bankInterfaceMan">
    <div class="main-content">
      <div class="bread-contain">
          <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
          <div class="bread-contain-right" v-show="bankInterfaceManShow">
              <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">新建</el-button>
          </div>
          <div class="bread-contain-right" v-show="bankInterfaceManAddVisible">
            <el-button size="mini" type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button  icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
          </div>
      </div>
      <div class="kl-table" v-show="bankInterfaceManShow">
        

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
            prop="bankInterfaceNo"
            label="接口编号"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="bankInterfaceName"
            label="接口名称"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="driverClass"
            label="驱动类地址"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="jarFile"
            label="JAR包文件"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            min-width="80"
            label="状态">
          </el-table-column>
          

          <el-table-column label="操作"  width="80px" fixed="right">
            <template slot-scope="scope">
              
              <el-button type="text" @click="appAdd(scope)">编辑</el-button>

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
      <div v-show="bankInterfaceManAddVisible">
          <bankInterfaceManAdd ref="child"></bankInterfaceManAdd>
      </div>
    </div>
  </div>
</template>

<script>
import bankInterfaceManAdd from "./bankInterfaceManAdd"
  export default {
    name: "bankInterfaceMan",
    components:{
      bankInterfaceManAdd
    },
    data() {
      return {
        total:0,//数据总数
        tableShow: true,
        tableQuery:{
          page:1,
          pageCount:50
        },
        formData:{
          "bankInterfaceNo":"",
          "bankInterfaceName":"",
          "driverClass":"",
          "jarFile":{},
          "status":1,
          "bankInterfaceId":'',
        },
        maxHeight:0,
        appServerData:[],
        showSelectIndex:-1,
        // formData:'',
        crumbsData :{  //面包屑
          titleList:[
            {title:'基础信息',path:'/ChangeTables'},
            {title:'银行驱动',method:()=>{window.histroy.back()}}
          ],
        },
        bankInterfaceManShow:true,
        bankInterfaceManAddVisible:false,
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
      },
      // 格式化状态
      formatStatus(row) {
        return row.status === 0 ?"启用" : "停用"
      },
      clear(){
        this.formData.bankInterfaceNo = "";
        this.formData.bankInterfaceName = '';
        this.formData.driverClass = '';
        this.formData.jarFile = {};
        this.formData.status = 1;
        this.formData.bankInterfaceId = '';
        // this.$refs.child.file = {};
      },
      // 添加按钮点击事件
      appAdd(val) {
        this.clear();
        // sessionStorage.setItem('formData',JSON.stringify(this.formData));
        if(val==='add'){
            this.$set(this.crumbsData.titleList,"2",{title:'新建',method:()=>{window.histroy.back()}});
            this.$refs.child.editData(this.formData)
            this.common.chargeObjectEqual(this,this.formData,'set','childBankInfo');
        }else{
          this.$set(this.crumbsData.titleList,"2",{title:'编辑',method:()=>{window.histroy.back()}});
          let _this = this;
          let params = {
              "busicode": "BankInterfaceQuery",
              "data": {
                bankInterfaceId:val.row.bankInterfaceId
              },
          }
          this.$api.fetch({
            params,//参数
          }).then(res => {
            let row = this.formData;
            row.jarFile = res.jarFile;
            row.bankInterfaceName = res.bankInterfaceName;
            row.bankInterfaceNo = res.bankInterfaceNo;
            row.driverClass = res.driverClass;
            row.status = res.status;
            row.bankInterfaceId = res.bankInterfaceId;
            this.$refs.child.editData(row);
            this.common.chargeObjectEqual(this,row,'set','childBankInfo');
          })
        }
        this.bankInterfaceManShow = false;
        this.bankInterfaceManAddVisible = true;
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
        // return index + 1
        return (this.tableQuery.page - 1)*(this.tableQuery.pageCount) + index + 1;
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
            "busicode": "BankInterfaceList",
            "data": _this.tableQuery,
        }
        this.$api.fetch({
            params,//参数
          }).then(res => {
            _this.$set(_this.appServerData,'list',res.list)
            _this.total = res.total;
            // _this.appServerData.list = res.data
            //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
            // _this.$changeTable(_this,'.bankInterfaceMan .kl-table',['.bankInterfaceMan .toolbar','.bankInterfaceMan .block','.bankInterfaceMan .tab-title'])
            _this.common.changeTable(this,'.bankInterfaceMan .kl-table',['.bankInterfaceMan .block'])
          })
      },
      closeDialog(){
        this.bankInterfaceManShow = true;
        this.bankInterfaceManAddVisible = false;
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
.bankInterfaceMan{
  width: 100%;
  height: 100%;
  .main-content{
    height: 100%;
  }
}
</style>

