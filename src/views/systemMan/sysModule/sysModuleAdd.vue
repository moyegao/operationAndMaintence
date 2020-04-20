


<template>
  <div class="sysModuleAdd">
      <el-form :model="ruleForm" :rules="rules" ref="sysModuleAddRuleForm" label-width="100px" class="formBill-One" :inline="true">

        <el-form-item label="模块路径：" prop="matrNo">
          <el-input v-model="ruleForm.matrNo" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="模块名称：" prop="matrName">
          <el-input v-model="ruleForm.matrName" maxlength="50" clearable></el-input>
        </el-form-item>
      
        <el-form-item label="模块类型：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按扭" :value="0"></el-option>
          </el-select>
        </el-form-item>   
      </el-form> 
  </div>
</template>

<script>
  export default {
    name: "sysModuleAdd",
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
        this.$refs.sysModuleAddRuleForm.resetFields();
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','sysModuleAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },

  }
</script>

<style lang="scss">
.sysModuleAdd{
    .demo-form{
      .el-form-item__label{
        font-size: 12px
      }
      .select-member{
        font-size: 12px;
      }
      .el-form-item{
        width: 54%;
        margin-right: 0px;
        .el-form-item__content{
          width: calc(100% - 100px);
          .el-select{
            width: 100%;
          }
          .el-input__inner{
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .remark{
        width: 48%;
      }

  }
}
</style>


