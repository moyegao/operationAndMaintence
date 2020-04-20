


<template>
  <div class="engMaterManAdd">
      <el-form :model="ruleForm" :rules="rules" ref="engMaterManAddRuleForm" label-width="100px" class="formBill" :inline="true">

        <el-form-item label="材料编号：" prop="matrNo">
          <el-input v-model="ruleForm.matrNo" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="材料名称：" prop="matrName">
          <el-input v-model="ruleForm.matrName" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="材料规格：" prop="matrMode">
          <el-input v-model="ruleForm.matrMode" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="材料数量：" prop="matrNum">
          <el-input v-model.number="ruleForm.matrNum" maxlength="10" clearable></el-input>
        </el-form-item>

        <el-form-item label="材料单位：" prop="matrUnit">
          <el-input v-model="ruleForm.matrUnit" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="材料单价：" prop="matrPrice">
          <el-input v-model.number="ruleForm.matrPrice" maxlength="10" clearable></el-input>
        </el-form-item>
      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "engMaterManAdd",
    data() {
      return {
        databaseData:[],
        ruleForm:{
          matrNo: "",
          matrName: "",
          matrMode: "",
          matrNum: "",
          matrUnit: "",
          matrPrice: "",
        },
        rules: {
          matrNo: [
            { required: true, message: '请输入材料编号', trigger: 'blur' },
          ],
          matrName: [
            { required: true, message: '请输入材料名称', trigger: 'blur' }
          ],
          matrMode: [
            { required: true, message: '请输入材料规格', trigger: 'blur' }
          ],
          matrNum: [
            { required: true, message: '请输入材料数量' },
             { type: 'number', message: '材料数量必须为数字值'}
          ],
          matrUnit: [
            {  message: '请输入材料单位', trigger: 'blur', required: true },
             
          ],
          matrPrice: [
            {  message: '请输入材料单价', trigger: 'blur', required: true },
            { type: 'number', message: '材料单价必须为数字值'}
          ],
        },
      }
    },
    mounted(){
    },
    methods: {
      //保存按钮
      resetForm() {
        this.$refs.engMaterManAddRuleForm.resetFields();
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '添加'){
               params = {
                  "busicode": "MatrTemplateAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                  "busicode": "MatrTemplateUpdate",
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','engMaterManAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },

  }
</script>