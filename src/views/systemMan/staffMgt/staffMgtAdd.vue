


<template>
  <div class="staffMgtAdd">
      <el-form :model="ruleForm" :rules="rules" ref="staffMgtAddRuleForm" label-width="100px" class="formBill-One" :inline="true">

        <el-form-item label="姓名：" prop="matrNo">
          <el-input v-model="ruleForm.matrNo" maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="帐号：" prop="matrNo">
          <el-input v-model="ruleForm.matrNo" maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓别：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "staffMgtAdd",
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
        this.$refs.staffMgtAddRuleForm.resetFields();
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','staffMgtAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },

  }
</script>

<style lang="scss">
.staffMgtAdd{
}
</style>


