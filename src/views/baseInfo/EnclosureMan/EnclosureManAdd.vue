


<template>
  <div class="EnclosureManAdd">
      <el-form :model="ruleForm" ref="EnclosureManAddRuleForm" :rules="rules" label-width="120px" class="formBill" :inline="true">

        <el-form-item label="附件编号：" prop="accessoryNo">
          <el-input v-model="ruleForm.accessoryNo" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="附件对象：" prop="accessoryObj">
          <el-input v-model="ruleForm.accessoryObj" maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="附件名称：" prop="accessoryName">
          <el-input v-model="ruleForm.accessoryName" maxlength="50" clearable></el-input>
        </el-form-item>

      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "EnclosureManAdd",
    data() {
      return {
        ruleForm:{
          accessoryNo: "",
          accessoryName: "",
          accessoryObj: "",
        },
        rules: {
          accessoryNo: [
            { required: true, message: '请输入附件编号', trigger: 'blur' },
          ],
          accessoryName: [
            { required: true, message: '请输入附件名称', trigger: 'blur' }
          ],
        },
      }
    },
    mounted(){
    },
    methods: {
      //保存按钮
      resetForm() {
        this.$refs.EnclosureManAddRuleForm.resetFields();
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '添加'){
               params = {
                  "busicode": "AccessoryTypeAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                  "busicode": "AccessoryTypeUpdate",
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','EnclosureManAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },

  }
</script>