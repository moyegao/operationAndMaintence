
<template>
  <div class="billTypeManAdd">
      <el-form :model="ruleForm" :rules="rules" ref="billTypeManAddRuleForm" label-width="100px" class="formBill-One" :inline="true">

        <el-form-item label="单据编号：" prop="receiptNo">
          <el-input v-model="ruleForm.receiptNo" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="单据名称：" prop="receiptName">
          <el-input v-model="ruleForm.receiptName" maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="流程接口：" prop="workflowInterface">
          <el-input v-model="ruleForm.workflowInterface" maxlength="100" clearable></el-input>
          <font style="text-align: left;width: 100%;display: block;color: rgb(134, 140, 134);">
            如单据启用审批流，这里可配置审批流接口，以执行特殊操作</font>
        </el-form-item>
        <el-form-item label="URL地址：" prop="url">
          <el-input v-model="ruleForm.url" maxlength="100" clearable></el-input>
          <font style="text-align: left;width: 100%;display: block;color: rgb(134, 140, 134);">
            VUE开发的项目为路由地址</font>
        </el-form-item>
      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "billTypeManAdd",
    data() {
      return {
        ruleForm:{
          receiptNo: "",
          receiptName: "",
          workflowInterface: "",
          url: "",
        },
        rules: {
          receiptNo: [
            { required: true, message: '请输入单据编号', trigger: 'blur' },
          ],
          receiptName: [
            { required: true, message: '请输入单据名称', trigger: 'blur' }
          ],
        },
      }
    },
    mounted(){
    },
    methods: {
      //保存按钮
      resetForm() {
        this.$refs.billTypeManAddRuleForm.resetFields();
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '添加'){
               params = {
                  "busicode": "ReceiptAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                  "busicode": "ReceiptUpdate",
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
                this.resetForm();      
              })
              
          } else {
            return false;
          }
        });
      },
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','billTypeManAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },

  }
</script>