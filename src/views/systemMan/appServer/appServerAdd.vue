

<template>
  <div class="appServerAdd">
    <el-form :model="ruleForm" :rules="rules" ref="ruleFormappServerAdd" label-width="120px" class="formBill-One" :inline="true">

      <el-form-item label="服务器编号：" prop="serverCode">
        <el-input v-model="ruleForm.serverCode" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="服务器名称：" prop="serverName">
        <el-input v-model="ruleForm.serverName" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="应用程序版本：" prop="appVersion">
        <el-select v-model="ruleForm.appVersion" placeholder="请选择">
          <el-option v-for="(item, index) in appVersionOptions" :key="item.versionId" :label="item.versionName" :value="item.versionId"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服务器IP：" prop="appIp">
        <el-input v-model="ruleForm.appIp" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="服务器端口：" prop="appPort">
        <el-input v-model="ruleForm.appPort" maxlength="50" clearable></el-input>
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
  name: "appServerAdd",
  data() {
    return {
      databaseData: [],
      ruleForm: {
        serverCode: '',
        serverName: "",
        appVersion: '',
        appIp: "",
        appPort: "",
        comments: "",
        status: 1
      },
      appVersionOptions: [],  //服务器类型下拉框
      rules: {
        serverCode: [
          { required: true, message: '请输入服务器编号', trigger: 'blur' },
        ],
        serverName: [
          { required: true, message: '请输入服务器名称', trigger: 'blur' }
        ],
        appVersion: [
          { required: true, message: '请选择程序版本类型', trigger: 'blur' }
        ],
        appIp: [
          { required: true, message: '请输入服务器IP', trigger: 'blur' }
        ],
        appPort: [
          { message: '请输入服务器端口', trigger: 'blur', required: true },
        ],
        status: [
          { message: '请输入状态', trigger: 'blur', required: true },
        ],
      },
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取下拉框数据
    getData() {
      let _this = this;
      let params = {
        "busicode": "appVersionList",
        "data": {}
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.appVersionOptions = res;
      })
    },
    submitForm(formName, type) {
      let _this = this;
      let params = {};
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === '添加') {
            params = {
              "busicode": "appServerAdd",
              "data": this.ruleForm
            }

          } else {
            params = {
              "busicode": "appServerUpdate",
              "data": this.ruleForm
            };
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {

            _this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success',
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
      this.common.chargeObjectEqual(this, this.ruleForm, 'get', 'appServerAdd', this.$parent.closeDialog);
    },
    editData(val) {
      this.ruleForm = val;
    }
  },

}
</script>

<style lang="scss">
.appServerAdd {
}
</style>


