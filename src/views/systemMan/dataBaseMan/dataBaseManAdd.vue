

<template>
  <div class="dataBaseManAdd">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormDataBaseManAdd" label-width="120px" class="formBill" :inline="true">

        <el-form-item label="服务器编号：" prop="serverNo">
          <el-input v-model="ruleForm.serverNo" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="服务器名称：" prop="serverName">
          <el-input v-model="ruleForm.serverName" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="数据库类型：" prop="dbType">
            <el-select v-model="ruleForm.dbType" placeholder="请选择">
                <el-option v-for="(item, index) in dbTypeOptions" :key="index" :label="item.name" :value="item.value" ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="数据库IP：" prop="dbIp">
          <el-input v-model="ruleForm.dbIp" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="数据库端口：" prop="dbPort">
          <el-input v-model="ruleForm.dbPort" maxlength="50" clearable></el-input>
        </el-form-item>

        <!-- <el-form-item label="数据库实例名：" prop="dbSchema">
          <el-input v-model="ruleForm.dbSchema" maxlength="50" clearable></el-input>
        </el-form-item> -->

        <el-form-item label="管理员账号：" prop="managerAccount">
          <el-input v-model="ruleForm.managerAccount" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="管理员密码：" prop="managerPassword">
          <el-input v-model="ruleForm.managerPassword" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述:" class="f2" clearable>
          <el-input type="textarea" v-model="ruleForm.comments" maxlength="500" show-word-limit></el-input>
        </el-form-item>
      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "dataBaseManAdd",
    data() {
      return {
        databaseData:[],
        ruleForm:{
          serverNo:'' ,
          serverName: "",
          dbType: 1,
          dbIp: "",
          dbPort: "",
          dbSchema: "",
          managerAccount: "",
          managerPassword: "",
          comments: "",
          status:1
        },
        dbTypeOptions:[],  //数据库类型下拉框
        rules: {
          serverNo: [
            { required: true, message: '请输入服务器编号', trigger: 'blur' },
          ],
          serverName: [
            { required: true, message: '请输入服务器名称', trigger: 'blur' }
          ],
          dbType: [
            { required: true, message: '请选择数据库类型', trigger: 'blur' }
          ],
          dbIp: [
            { required: true, message: '请输入数据库IP', trigger: 'blur' }
          ],
          dbPort: [
            {  message: '请输入数据库端口', trigger: 'blur', required: true },
          ],
          // dbSchema: [
          //   { required: true, message: '请输入数据库实例名', trigger: 'blur' }
          // ],
          managerAccount: [
            { required: true, message: '请输入管理员账号', trigger: 'blur' }
          ],
          managerPassword: [
            { required: true, message: '请输入管理员密码', trigger: 'blur' }
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
        let _this = this;
        let params = {
            "busicode": "DictionarySelect",
            "data":"PDB"
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          debugger
          _this.dbTypeOptions = res.PDB;
        })
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '添加'){
               params = {
                  "busicode": "DbServerAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                  "busicode": "DbServerUpdate",
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
        this.common.chargeObjectEqual(this,this.ruleForm,'get','dataBaseAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    },

  }
</script>

<style lang="scss">
.dataBaseManAdd{
}
</style>


