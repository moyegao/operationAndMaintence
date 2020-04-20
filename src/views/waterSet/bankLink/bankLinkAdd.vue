


<template>
  <div class="bankLinkAdd">
    <el-form :model="ruleForm" ref="bankLinkAddRuleForm" :rules="rules" label-width="100px" class="formBill" :inline="true">

      <el-form-item label="银行名称：" prop="bankId">
        <el-input v-model="ruleForm.bankId" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="银行驱动：" prop="configName">
        <el-input v-model="ruleForm.configName" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="驱动端口：" prop="configPort">
        <el-input v-model="ruleForm.configPort" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="配置参数：" class="remark f2" prop="configParam">
        <el-input type="textarea" v-model="ruleForm.configParam" show-word-limit maxlength="2000" clearable></el-input>
      </el-form-item>

      <el-form-item label="通讯类型：" prop="communicationType">
        <el-select v-model="ruleForm.communicationType" placeholder="请选择">
          <el-option label="tcp" :value="1"></el-option>
          <el-option label="http" :value="2"></el-option>
          <el-option label="ftp" :value="3"></el-option>
        </el-select>

      </el-form-item>

      <el-form-item label="连接线程数：" prop="connectThread">
        <el-input v-model.number="ruleForm.connectThread" maxlength="6" clearable></el-input>
      </el-form-item>

      <el-form-item label="工作线程数：" prop="workThread">
        <el-input v-model.number="ruleForm.workThread" maxlength="6" clearable></el-input>
      </el-form-item>

      <el-form-item label="状态：" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="停用" :value="0"></el-option>
        </el-select>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "bankLinkAdd",
  data() {
    return {
      databaseData: [],
      ruleForm: {
      },
      formData: {
        companyNo: "",
        configId: "",
        bankInterfaceId: "",
        bankId: "",
        configName: "",
        configPort: "",
        configParam: 1,
        communicationType: 1,
        connectThread: 6,
        workThread: 3,
        status: 1
      },
      rules: {
        bankInterfaceId: [
          { required: true, message: '请输入银行接口ID', trigger: 'blur' },
        ],
        bankId: [
          { required: true, message: '请输入直连银行', trigger: 'blur' }
        ],
        configName: [
          { required: true, message: '请输入配置名称', trigger: 'blur' }
        ],
        configPort: [
          { required: true, message: '请输入配置端口', trigger: 'blur' }
        ],
        configParam: [
          { required: true, message: '请输入配置参数', trigger: 'blur' },
        ],
        communicationType: [
          { required: true, message: '请输入通讯类型', trigger: 'blur' },
        ],
        connectThread: [
          { required: true, message: '请输入连接线程数', trigger: 'blur' },
          { type: 'number', message: '连接线程数必须为数字值' }
        ],
        workThread: [
          { required: true, message: '请输入工作线程数', trigger: 'blur' },
          { type: 'number', message: '工作线程数必须为数字值' }
        ],
        status: [
          { required: true, message: '请输入状态', trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
  },
  methods: {
    //保存按钮
    resetForm() {
      this.$refs.bankLinkAddRuleForm.resetFields();
    },
    submitForm(formName, type, id) {
      let _this = this;
      let params = {};
      this.ruleForm.companyNo = id;
      this.ruleForm = this.common.handleData(this.ruleForm, this.formData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === '添加') {

            params = {
              "busicode": "BankInterfaceConfigAdd",
              "data": this.ruleForm
            }
          } else {
            params = {
              "busicode": "BankInterfaceConfigUpdate",
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
            if (type === '添加') {
              _this.$parent.getTreeDatas();
            }
          })

        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.common.chargeObjectEqual(this, this.ruleForm, 'get', 'bankLinkAdd', this.$parent.closeDialog);
    },
    editData(val) {
      this.ruleForm = val;
    }
  },

}
</script>

<style lang="scss">
.bankLinkAdd {
  .el-form-item__label {
    font-size: 12px;
  }
}
</style>


