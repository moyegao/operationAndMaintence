<template>
  <div class="water-dialog">
      <el-form :model="ruleForm" :rules="rules" ref="waterRuleForm" label-width="120px" class="demo-form" :inline="true">

        <el-form-item label="水司编号：" prop="companyNo">
          <el-input v-model="ruleForm.companyNo"  maxlength="50" clearable :disabled="isEdit"></el-input>
        </el-form-item>

        <el-form-item label="简化编号：" prop="simplifyNo">
          <el-input v-model="ruleForm.simplifyNo" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="水司简称：" prop="shortName">
          <el-input v-model="ruleForm.shortName" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="模板水司：" prop="sourceCompany">
 
          <el-select v-model="ruleForm.sourceCompany" :disabled="isEdit">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in sourceCompanyOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="省份：" prop="adminArea">
          <el-select v-model="ruleForm.adminArea">
            <el-option :label="item.name" :value="item.code" v-for="(item, index) in adminAreaOptions" :key="index"></el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.adminArea" maxlength="50" clearable></el-input> -->
        </el-form-item>

        <el-form-item label="片区：" prop="companyArea">
          <el-select v-model="ruleForm.companyArea">
            <el-option :label="item.name" :value="item.code" v-for="(item, index) in companyAreaOptions" :key="index"></el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.companyArea" maxlength="50" clearable></el-input> -->
        </el-form-item>
        
        <el-form-item label="应用程序版本：" prop="appVersion">
          <el-select v-model="ruleForm.appVersion">
            <el-option :label="item.versionName" :value="item.versionId" v-for="(item, index) in appVersionOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据库服务器：" prop="dbId">
          <el-select v-model="ruleForm.dbId">
            <el-option :label="item.name" :value="item.id" v-for="(item, index) in dbIdOptions" :key="index"></el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.companyArea" maxlength="50" clearable></el-input> -->
        </el-form-item>

        <el-form-item label="数据库名称：" prop="databaseAccount">
          <el-input v-model="ruleForm.databaseAccount" maxlength="50" clearable></el-input>
        </el-form-item>

        <!-- Oracle有用 <el-form-item label="数据库密码:" prop="databasePassword">
          <el-input v-model="ruleForm.databasePassword" maxlength="50" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="最大空闲连接：" prop="maxIdle">
          <el-input v-model.number="ruleForm.maxIdle" maxlength="2" clearable></el-input>
        </el-form-item>

        <el-form-item label="最大连接数:" prop="maxTotal">
          <el-input v-model.number="ruleForm.maxTotal" maxlength="2" clearable></el-input>
        </el-form-item>

        <el-form-item label="流程平台应用信息:" prop="workflowApp">
          <el-input v-model="ruleForm.workflowApp" maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" class="remark">
          <el-input type="textarea" v-model="ruleForm.comments" maxlength="150" clearable show-word-limit></el-input>
        </el-form-item>
      </el-form>
          
    <div :class="{'select-tree':true,'hide-tree':!authTreeShow,'show-tree':authTreeShow}">
      <authTree ref="authTree" @treeClick="getAddData"></authTree>
    </div>
  </div>
</template>

<script>
	import authTree from './authTree'
  export default {
    name: "water-dialog",
    components: { authTree },
    props:['isEdit'],
    data() {
      return {
        databaseData:[],
        formData:{
          companyId:"",
          companyNo:'' ,
          simplifyNo: "",
          shortName: '',
          // oaName: 10,
          // oaCode: 10,
          adminArea: "",
          companyArea: "",
          databaseAccount: "",
          databasePassword: "",
          maxIdle: "",
          maxTotal:"",
          workflowApp:"",
          comments: "",
          sourceCompany:"",
          dbId:"",
          appVersion:'',
          status:1,
        },
        ruleForm:{

        },
        rules: {
          companyNo: [
            { required: true, message: '请输入水司编号', trigger: 'blur' },
          ],
          simplifyNo: [
            { required: true, message: '请输入简化编号', trigger: 'blur' }
          ],
          companyShortName: [
            { required: true, message: '请输入水司简称', trigger: 'blur' }
          ],
          oaName: [
            { required: true, message: '请选择水司OA名称', trigger: 'blur' }
          ],
          // managerStaff: [
          //   {  message: '请选择水司管理员', trigger: 'blur', required: true },
          // ],
          oaCode: [
            { required: true, message: '请选择水司OA编号', trigger: 'blur' },
          ],
          adminArea: [
            { required: true, message: '请选择省份', trigger: 'blur' }
          ],
          companyArea: [
            { required: true, message: '请选择片区', trigger: 'blur' }
          ],
          databaseAccount: [
            { required: true, message: '请输入数据库名称', trigger: 'blur' }
          ],
          databasePassword: [
            {  message: '请输入数据库密码', trigger: 'blur', required: false },
          ],
          workflowApp: [
            {  message: '请输入流程平台应用信息', trigger: 'blur', required: true },
          ],
          maxIdle: [
            {  message: '请输入最大空闲连接', trigger: 'blur', required: true },
            { type: 'number', message: '最大空闲连接必须为数字值'}
          ],
          maxTotal: [
            {  message: '请输入最大连接数', trigger: 'blur', required: true },
            { type: 'number', message: '最大连接数必须为数字值'}
          ],
          sourceCompany: [
            {  message: '请选择模板水司', trigger: 'blur', required: true },
          ],
        },
        authTreeShow: false, // 组织树展示状态
        activeShow: false, // 输入框激活展示状态
        RepastMember: [],
        amend:true,
        disa:false,
        selectAmend:true,
        oaNameOptions:[],//水司OA名称
        oaCodeOptions:[],//水司OA编号
        adminAreaOptions:[],//省份
        companyAreaOptions:[],//片区
        sourceCompanyOptions:[],//模板水司
        dbIdOptions:[],//数据库名称
        appVersionOptions:[],//程序版本
      }
    },
    mounted(){
      this.selectTDbServer();
      // this.ruleForm = this.appFromData;
    },
    methods: {
      // 获取下拉框数据
      selectTDbServer() {
        let _this = this;
        let params = {
            "busicode": "DbServerSelect",  //数据库名称
            "data": {
            },
        };
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          _this.dbIdOptions = res;
        })
        let vparams = {
            "busicode": "AppVersionList",  //应用程序版本
            "data": {
            },
        };
        this.$api.fetch({
          params: vparams,//参数
        }).then(res => {
          _this.appVersionOptions = res;
        })
        let data = {
            "busicode": "CompanySelect",   //模板水司
            "data": {
            },
        };
        this.$api.fetch({
          params: data,//参数
        }).then(res => {
          _this.sourceCompanyOptions = res;  
        })
        // 片区
        this.$api.fetch({
          params: {
            "busicode": "CompanyAreaSelect",   
            "data": {
            }
          }
        }).then(res => {
          _this.companyAreaOptions = this.handledata(res);  
        })
        // 省份
        this.$api.fetch({
          params: {
            "busicode": "ProvinceSelect",   
            "data": {
            }
          }
        }).then(res => {
          _this.adminAreaOptions = this.handledata(res);  
        })
        
      },
      handledata(val){
        let res = [];
        val.forEach((item)=>{
          if(item!==null){
            res.push(item);
          }
        })
        return res;
      },
      //关闭
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','waterManAdd',this.activeBlur);

        this.authTreeShow = false
        this.$refs.authTree.department = '组织人员';
        this.$refs.authTree.data2 = [];
      },
      activeBlur() {
        this.$parent.closeDialog();
        this.activeShow = false
        this.authTreeShow = false
      },
      // 输入框点击控制组织树展示
      treeToggle() {
          this.activeShow = true
          this.authTreeShow = true
      },
      delMember(row,index) {
        this.RepastMember.splice(index,1)
      },
      // 获取子组件添加人员信息数据
      getAddData(data) {
        let canteenManages = this.RepastMember
        let addManages = data
        let added =''
        let adding = ''
        for(let i in addManages){
          let item = {};
          let count =0;
          item = JSON.stringify(addManages[i]);
          item = JSON.parse(item)
          for(let j in canteenManages){
            if(addManages[i].id ===canteenManages[j].id){
              added+=item.name+','
              count++
            }
          }
          let arr = []
          for (let i in item) {
              arr.push(item[i]); //属性
          }
  
          if(count === 0){
            canteenManages.push(item);
            adding+=item.name+',';
          }
   

        }
        if(adding==='' && added===''){
          this.$message({
            showClose: true,
            message: `请选择添加人员`
          });
        }else if(adding===''&& added !==''){
          this.$message({
            showClose: true,
            message: `${added} 重复添加！`,
            type: 'error'
          });
        }else if(adding!==''&& added ==='') {
          this.$message({
            showClose: true,
            message: `${adding} 已经添加！`,
            type: 'success'
          });
          this.RepastMember = canteenManages;
        }else {
          this.$message({
            showClose: true,
            message: `${adding} 已经添加！，${added} 重复添加！`,
            type: 'warning'
          });
        }
        this.$refs.member.validate();
      },
      editData(val){

        this.ruleForm = val;
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm = this.common.handleData(this.ruleForm,this.formData);
             if(type === '添加'){
               params = {
                  "busicode": "CompanyAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                "busicode": "CompanyUpdate",
                "data": this.ruleForm
            };
             }
              this.$api.fetch({
                params: params,//参数
              }).then(res => {
                _this.$message({
                  showClose:true,
                  message:'保存成功',
                  type:'success',
                });
                _this.$parent.selectTSubSystem();
                _this.$parent.closeDialog();
              })
              
          } else {
            return false;
          }
        });
      }
    },

    watch: {
      RepastMember(curVal,oldVal){
        this.ruleForm.managerStaff=[]
        for (let i in this.RepastMember) {
          this.ruleForm.managerStaff.push(this.RepastMember[i].loginid)
        }
      }
    }
  }
</script>

<style lang="scss">
  .water-dialog{
    .demo-form{
      .el-form-item__label{
        font-size: 12px
      }
      .select-member{
        font-size: 12px;
      }
      .el-form-item{
        width: 32%;
        margin-right: 0px;
        .el-form-item__content{
          width: calc(100% - 120px);
          .el-select{
            width: 100%;
          }
          .el-input__inner{
            height: 30px !important;
            line-height: 30px;
          }
        }
      }
      .remark{
        width: 48%;
      }
	    .input{
	      overflow: scroll;
	      vertical-align: middle;
	      display: inline-block;
	      border: 1px solid #ccc;
	      width: 100%;
        min-height: 30px;
        line-height: 30px;
	      overflow: hidden;
	      -webkit-border-radius: 4px;
	      -moz-border-radius: 4px;
	      border-radius: 4px;
	      position: relative;
	      .select-member{
	        box-sizing: border-box;
	        border-color: transparent;
	        margin: 2px 0 2px 6px;
	        background-color: #f0f2f5;
	        display: inline-block;
	        height: 24px;
	        padding: 0 8px;
	        line-height: 22px;
	        color: #909399;
	        border-radius: 4px;
	        i{
	          color:  #c0c4cc;
	          cursor: pointer;
	        }
	      }
	      &.active{
	        border:1px solid #409EFF;
	      }
        .disable{
          background-color: #f5f7fa;
          border-color: #e4e7ed;
          cursor: not-allowed;
        }
        .font-color{
          color: #c0c4cc;
        }
	    }
	    .upload-demo{
	      input{
	        display: none;
	      }
	    }
	  }
    .disable{
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      cursor: not-allowed;
    }
    .select-member-amend{
      margin: 0;
      background-color: #f0f2f500;
      color: #c0c4cc;
    }
    .select-tree{
	    z-index: 3000;
	    position: fixed;
	    right: 0;
	    top: 60px;
	    height: calc(100% - 60px);
	    transition: width 500ms linear;
	    box-shadow: 0 0 10px 0 #ccc;
	  }
	  .show-tree{
	    width: 300px;
	  }
	  .hide-tree{
	    width: 0px;
	  }
  }
</style>


