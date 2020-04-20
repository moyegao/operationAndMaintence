

<template>
  <div class="saleSetAdd">
    <el-form :model="ruleForm" ref="saleSetAddRuleForm" :rules="rules" label-width="120px" class="formBill" :inline="true">

      <el-form-item label="营业网点：">
        <el-input v-model="ruleForm.businessBranch" prop="businessBranch" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="收费类型：" prop="chargingType">
        <el-select v-model="ruleForm.chargingType" placeholder="请选择">
          <el-option label="代扣" :value="1"></el-option>
          <el-option label="托收" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出盘银行：" prop="outBank">
        <el-input v-model="ruleForm.outBank" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="导出sql：" prop="expSql">
        <el-input v-model="ruleForm.expSql"></el-input>
      </el-form-item>

      <el-form-item label="导出文件类型：" prop="expFileType">
        <el-select v-model="ruleForm.expFileType" placeholder="请选择">
          <el-option label="txt" :value="1"></el-option>
          <el-option label="excel" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="回盘账期列：" prop="monthidIdx">
        <el-input v-model.number="ruleForm.monthidIdx" maxlength="2" clearable></el-input>

      </el-form-item>

      <el-form-item label="回盘用户编号列：" prop="returnUserNoColumn">
        <el-input v-model.number="ruleForm.returnUserNoColumn" maxlength="2" clearable></el-input>
      </el-form-item>

      <el-form-item label="回盘金额列：" prop="returnMoneyColumn">
        <el-input v-model.number="ruleForm.returnMoneyColumn" maxlength="2" clearable></el-input>
      </el-form-item>

      <el-form-item label="回盘结果列：" prop="returnResultColumn">
        <el-input v-model.number="ruleForm.returnResultColumn" maxlength="2" clearable></el-input>
      </el-form-item>

      <el-form-item label="回盘结果说明列：" prop="descIdx">
        <el-input v-model.number="ruleForm.descIdx" maxlength="2" clearable></el-input>
      </el-form-item>

      <el-form-item label="扣款成功标记：" prop="successFlag">
        <el-input v-model="ruleForm.successFlag" maxlength="50" clearable></el-input>
      </el-form-item>

      <el-form-item label="状态：" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="停用" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注：" class="remark f3">
        <el-input v-model="ruleForm.comments" type="textarea" show-word-limit maxlength="150" clearable></el-input>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "saleSetAdd",
  data() {
    return {
      databaseData: [],
      ruleForm: {
      },
      formData: {
        bankConfigId: "",
        companyNo: "",
        businessBranch: '',
        chargingType: "",
        outBank: '',
        expSql: "",
        expFileType: "",
        monthidIdx: "",
        returnUserNoColumn: "",
        returnMoneyColumn: "",
        returnResultColumn: "",
        descIdx: "",
        successFlag: "",
        status: "",
        comments: ""
      },
      rules: {
        businessBranch: [
          { required: true, message: '请输入营业网点', trigger: 'blur' },
        ],
        chargingType: [
          { required: true, message: '请输入收费类型', trigger: 'blur' }
        ],
        outBank: [
          { required: true, message: '请输入出盘银行', trigger: 'blur' }
        ],
        expSql: [
          { required: true, message: '请输入导出sql', trigger: 'blur' }
        ],
        expFileType: [
          { required: true, message: '请输入导出文件类型', trigger: 'blur' },
        ],
        monthidIdx: [
          { required: true, message: '请输入回盘账期列', trigger: 'blur' },
          { type: 'number', message: '回盘账期列必须为数字值' }
        ],
        returnUserNoColumn: [
          { required: true, message: '请输入回盘用户编号列', trigger: 'blur' },
          { type: 'number', message: '回盘用户编号列必须为数字值' }
        ],
        returnMoneyColumn: [
          { required: true, message: '请输入回盘金额列', trigger: 'blur' },
          { type: 'number', message: '回盘金额列必须为数字值' }
        ],
        returnResultColumn: [
          { required: true, message: '请输入回盘结果列', trigger: 'blur' },
          { type: 'number', message: '回盘结果列必须为数字值' }
        ],
        descIdx: [
          { required: true, message: '请输入回盘结果说明列', trigger: 'blur' },
          { type: 'number', message: '回盘结果说明列必须为数字值' }
        ],
        successFlag: [
          { required: true, message: '请输入扣款成功标记', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入状态', trigger: 'blur' }
        ],
        // subThemeUnique: [
        //   { required: true, message: '请输入备注', trigger: 'blur' },
        // ],
      },
    }
  },
  mounted() {
  },
  methods: {
    //保存按钮
    resetForm() {
      this.$refs.saleSetAddRuleForm.resetFields();
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
              "busicode": "BankConfigAdd",
              "data": this.ruleForm
            }

          } else {
            params = {
              "busicode": "BankConfigUpdate",
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
            this.resetForm();
          })

        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.common.chargeObjectEqual(this, this.ruleForm, 'get', 'saleSetAdd', this.$parent.closeDialog);
    },
    editData(val) {
      this.ruleForm = val;
    }
  },

}
</script>

<style lang="scss">
.saleSetAdd {
  width: 100%;
  height: 100%;
  .el-form-item__label {
    font-size: 12px;
  }
}
</style>


