
<template>
    <div class="sysUserAdd">

        <el-form :model="ruleForm" :rules="rules" ref="sysUserAddRuleForm" label-width="100px" class="formBill-One">
        <el-form-item label="用户名："  prop="loginName">
            <el-input v-model="ruleForm.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        </el-form>
    

    </div>

</template>

<script>
  export default {
    name: "sysUserAdd",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass  !== '') {
            this.$refs.sysUserAddRuleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        appDialogVisible:false,
        moduData:[],
        databaseData:[],
        ruleForm:{
          "loginName": "",
          "password": "",
          "checkPass": ""
        },
        rules: {
          loginName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true,validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    mounted(){

    },
    methods: {
      // 保存
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '添加'){
               params = {
                  "busicode": "SysUserAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                "busicode": "SysUserUpdate",
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
                _this.$parent.getData();
                _this.$parent.callBack();
              })
              // .catch(err=>{
              //   _this.$message({
              //     showClose: true,
              //     message: err,
              //     type: 'warning'
              //   });
              // })
              
          } else {
            return false;
          }
        });
      },
      // 返回
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','sysUser',this.boforeClose);
      },
      boforeClose(){
        this.$parent.callBack();
      },
      // 初始化数据
      editData(val){
        this.ruleForm = val;
      }
    },

  }
</script>

<style lang="scss" >
  .sysUserAdd{
      .sysUserAddruleForm{
          width: 60%;
          margin:10px auto;
      }
    .el-form-item__label{
    font-size: 12px
    }
  }
</style>
