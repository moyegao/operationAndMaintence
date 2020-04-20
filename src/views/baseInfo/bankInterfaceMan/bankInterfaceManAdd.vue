

<template>
  <div class="bankInterfaceManAdd">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="formBill" :inline="true">

        <el-form-item label="驱动编号：">
          <el-input v-model="ruleForm.bankInterfaceNo"></el-input>
        </el-form-item>

        <el-form-item label="驱动名称：">
          <el-input v-model="ruleForm.bankInterfaceName"></el-input>
        </el-form-item>

        <el-form-item label="驱动类名：">
          <el-input v-model="ruleForm.driverClass"></el-input>
        </el-form-item>

        <el-form-item label="JAR包文件：">
          <input type="file" style="font-size:12px" @change="getFile($event)"/>
          <!-- <el-input type="file" style="font-size:12px" @change="getFile($event)" v-model="ruleForm.jarFile"></el-input> -->
        </el-form-item>

        <el-form-item label="状态：">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="停用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "bankInterfaceManAdd",
    data() {
      return {
        databaseData:[],
        ruleForm:{
          bankInterfaceNo: "",
          bankInterfaceName: "",
          driverClass: "",
          jarFile: {},
          status: 1,
          bankInterfaceId:'',
        },
        // rules: {
        //   kpiUnique: [
        //     { required: true, message: '请输入指标维键', trigger: 'blur' },
        //   ],
        //   kpiName: [
        //     { required: true, message: '请输入指标名称', trigger: 'blur' }
        //   ],
        //   kpiComments: [
        //     { required: true, message: '请输入指标描述', trigger: 'blur' }
        //   ],
        //   kpiLevel: [
        //     { required: true, message: '请输入指标级别', trigger: 'blur' }
        //   ],
        //   subThemeUnique: [
        //     {  message: '请输入所属子主题维键', trigger: 'blur', required: true },
        //   ],
        // },
      }
    },
    mounted(){
    },
    methods: {
      getFile(e){
        this.ruleForm.jarFile = e.target.files[0]
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      //保存按钮
      submitForm(formName,type){
        let _this = this
        let params
        let url
        let formData = new FormData()
        formData.append("file", _this.ruleForm.jarFile)
        formData.append("bankInterfaceNo", _this.ruleForm.bankInterfaceNo)
        formData.append("bankInterfaceName", _this.ruleForm.bankInterfaceName)
        formData.append("driverClass", _this.ruleForm.driverClass)
        formData.append("status", _this.ruleForm.status)
        formData.append("sysType", "001")
        formData.append("token", localStorage.getItem('token'))
        
        if(type === '新建'){
          // url = 'http://localhost:8080/BankInterfaceAdd.htm'
          url = '/BankInterfaceAdd.htm'
        }else {
          url = '/BankInterfaceUpdate.htm'
          formData.append("bankInterfaceId", _this.ruleForm.bankInterfaceId)
        }
        _this.$refs.ruleForm.validate((valid) => {
          if (valid){
            _this.$axios({
              method: "post",
              url,
              data: formData,
              headers: { 'Content-Type': 'multipart/form-data'}
            }).then(res=>{
              if(res.data.code===0){
                _this.$message({
                  type:'success',
                  message:'操作成功'
                })
                _this.$parent.selectTSubSystem();
                _this.$parent.closeDialog();
                _this.resetForm();
              }else{
                _this.$message({
                  type:'warning',
                  message:res.data.description
                })
              }
            })
          } else {
            return false
          }
        })
      },
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','childBankInfo',this.$parent.closeDialog);
      },
      editData(val){
        let row = this.ruleForm;
        row.bankInterfaceNo = val.bankInterfaceNo;
        row.bankInterfaceName = val.bankInterfaceName;
        row.driverClass = val.driverClass;
        row.status = val.status;
        row.jarFile = val.jarFile;
        row.bankInterfaceId = val.bankInterfaceId
      }
    },

  }
</script>