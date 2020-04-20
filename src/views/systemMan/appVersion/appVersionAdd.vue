

<template>
  <div class="appVersionAdd"> 
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormappVersionAdd" label-width="150px" class="formBill-One" :inline="true">

        <el-form-item label="应用程序版本编号：" prop="versionCode">
          <el-input v-model="ruleForm.versionCode" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="应用程序版本名称：" prop="versionName">
          <el-input v-model="ruleForm.versionName" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述:" clearable>
          <el-input type="textarea" v-model="ruleForm.comments" maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "appVersionAdd",
    data() {
      return {
        databaseData:[],
        ruleForm:{
          versionNo:'' ,
          versionName: "",
          comments: "",
          status:1
        },
        rules: {
          versionNo: [
            { required: true, message: '应用程序版本编号', trigger: 'blur' },
          ],
          versionName: [
            { required: true, message: '应用程序版本名称', trigger: 'blur' }
          ],
          status: [
            {  message: '请输入状态', trigger: 'blur', required: true },
          ],
        },
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      // 获取下拉框数据
      getData(){
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '添加'){
               params = {
                  "busicode": "appVersionAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                  "busicode": "appVersionUpdate",
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
      },
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','appVersionAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },

  }
</script>

<style lang="scss">
.appVersionAdd{
  .formBill-One .el-form-item .el-form-item__content {
    width: calc(100% - 150px);
  }
}
</style>


