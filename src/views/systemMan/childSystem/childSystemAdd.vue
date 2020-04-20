


<template>
  <div class="childSystemAdd">
      <el-form :model="ruleForm" :rules="rules" ref="childSystemAddruleForm" label-width="130px" class="formBill" :inline="true">

        <el-form-item label="子系统编号：" prop="systemCode">
          <el-input v-model="ruleForm.systemCode" maxlength="20" clearable></el-input>
        </el-form-item>

        <el-form-item label="子系统名称：" prop="systemName">
          <el-input v-model="ruleForm.systemName" maxlength="20" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="2"></el-option>
          </el-select>
        </el-form-item><br>

        <el-form-item label="接口允许IP：" class="f2">
          <el-input type="textarea" maxlength="500" clearable show-word-limit :rows="3" v-model="ruleForm.allowIp" placeholder=
	          "可用逗号（,）、横杆（-）、星号（*）等分隔符，如192.168.1.1-192.168.1.100,192.168.1.200,192.168.4.*"></el-input>
        </el-form-item>

        <el-form-item label="接口禁止IP：" class="f2">
          <el-input type="textarea" maxlength="500" clearable show-word-limit :rows="3" v-model="ruleForm.forbidIp" placeholder=
	          "可用逗号（,）、横杆（-）、星号（*）等分隔符，如192.168.1.1-192.168.1.100,192.168.1.200,192.168.4.*"></el-input>
        </el-form-item>


        <el-form-item label="描述：" class="f2">
          <el-input type="textarea" maxlength="500" clearable show-word-limit v-model="ruleForm.comments"></el-input>
        </el-form-item>
      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "childSystemAdd",
    data() {
      return {
        databaseData:[],
        ruleForm:{
          systemCode:"",
          systemName:"",
          status:1,
          allowIp:"",
          forbidIp:"",
          comments:"",
        },
        rules: {
          systemCode: [
            { required: true, message: '请输入子系统编号', trigger: 'blur' },
          ],
          systemName: [
            { required: true, message: '请输入子系统名称', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请输入状态', trigger: 'blur' }
          ],

        },
      }
    },
    mounted(){
  
    },
    methods: {
      resetForm() {
        this.$refs.childSystemAddruleForm.resetFields();
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // var regAllowIp =/^([1-9]\d{0,2}.[0-9]\d{0,2}.[0-9]\d{0,2}.[0-9]\d{0,2}[,-])*[1-9]\d{0,2}.[0-9]\d{0,2}.[0-9]\d{0,2}.[0-9]\d{0,2}$/;
            // var regExpAllowIp = new RegExp(regAllowIp);
            // var reg =/^([1-9]\d{0,2}.[0-9]\d{0,2}.[0-9]\d{0,2}.[0-9]\d{0,2}[,-])*[1-9]\d{0,2}.[0-9]\d{0,2}.[0-9]\d{0,2}.[0-9]\d{0,2}$/;
            // var regExp = new RegExp(reg);
            // if (!regExpAllowIp.test(this.ruleForm.allowIp)||!regExp.test(this.ruleForm.forbidIp)) {
            //     // return callback(new Error('请输入正确的IP'));
            //     return this.$message({
            //           showClose: true,
            //           message: '请输入正确的IP',
            //           type: 'warning'
            //         });
            // }
             if(type === '添加'){
               params = {
                  "busicode": "TSubSystemAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                  "busicode": "TSubSystemUpdate",
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
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','childSystemAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
      }
    }
  }
</script>

<style lang="scss">
.childSystemAdd{
}
</style>


