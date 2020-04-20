
<template>
  <div class="indexManAdd">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="formBill" :inline="true">

      <el-form-item label="指标维键：" prop="kpiUnique">
        <el-input v-model="ruleForm.kpiUnique" clearable></el-input>
      </el-form-item>

      <el-form-item label="指标名称：" prop="kpiName">
        <el-input v-model="ruleForm.kpiName" clearable></el-input>
      </el-form-item>

      <el-form-item label="指标描述：" prop="kpiComments">
        <el-input v-model="ruleForm.kpiComments" clearable></el-input>
      </el-form-item>

      <el-form-item label="指标级别：" prop="kpiLevel">
        <el-tooltip class="item" effect="dark" content="指标级别为1~9" placement="top-start">
          <el-input v-model="ruleForm.kpiLevel" type="number" min="1" max="9" @blur="takeChange()"></el-input>
        </el-tooltip>
      </el-form-item>

      <el-form-item label="所属子主题维键：" prop="subThemeUnique">
        <el-input v-model="ruleForm.subThemeUnique" clearable></el-input>
      </el-form-item>

      <el-form-item label="所属子主题名称：" prop="subThemeName">
        <el-input v-model="ruleForm.subThemeName" clearable></el-input>
      </el-form-item>

      <el-form-item label="所属主题维键：" prop="themeUnique">
        <el-input v-model="ruleForm.themeUnique" clearable></el-input>
      </el-form-item>

      <el-form-item label="所属主题名称：" prop="themeName">
        <el-input v-model="ruleForm.themeName" clearable></el-input>
      </el-form-item>

      <el-form-item label="单位：" prop="unit">
        <el-input v-model="ruleForm.unit" clearable></el-input>
      </el-form-item>

      <el-form-item label="状态:" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注:" prop="comments" class="remark f2">
        <el-input clearable type="textarea" v-model="ruleForm.comments" maxlength="50" show-word-limit></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "indexManAdd",
  props: ['parentToChild'],
  data() {
    return {
      databaseData: [],
      ruleForm: {
        kpiUnique: '',
        kpiName: "",
        kpiComments: '',
        kpiLevel: "",
        subThemeUnique: "",
        subThemeName: "",
        themeUnique: "",
        themeName: '',
        unit: "",
        status: 1,
        comments: '',
      },
      rules: {
        kpiUnique: [
          { required: true, message: '请输入指标维键', trigger: 'blur' },
        ],
        kpiName: [
          { required: true, message: '请输入指标名称', trigger: 'blur' }
        ],
        kpiComments: [
          { required: true, message: '请输入指标描述', trigger: 'blur' }
        ],
        kpiLevel: [
          { required: true, message: '请输入指标级别', trigger: 'blur' }
        ],
        subThemeUnique: [
          { message: '请输入所属子主题维键', trigger: 'blur', required: true },
        ],
      },
    }
  },
  mounted() {
  },
  methods: {
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    takeChange() {
      let num = this.ruleForm.kpiLevel;
      if (num <= 1) num = 1;
      else if (num >= 9) num = 9;
      this.ruleForm.kpiLevel = num;
    },
    submitForm(formName, type) {
      let message = "";
      let _this = this;
      let params = {};
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === '新建') {
            params = {
              "busicode": "kpiAdd",
              "data": this.ruleForm
            }
            message = '新建成功';
          } else {
            params = {
              "busicode": "kpiUpdate",
              "data": this.ruleForm
            };
            message = '保存成功';
          }
          this.$api.fetch({
            params,//参数
          }).then(res => {
            _this.$message({
              showClose: true,
              message,
              type: 'success',
            });
            _this.$parent.selectTSubSystem();
            _this.$parent.closeDialog();
            this.resetForm();
          })

        } else {
          return false;
        }
        this.$parent.indexManShow = false;
        this.$parent.indexManAddVisible = true;
      });
    },
    // //弹出框
    // closeDialog(formName){ //关闭会话
    //   this.$refs[formName].resetFields(); //重置表单
    //   // this.dialogFormVisible = false; //关闭会话
    // },
    handleClose() {
      this.common.chargeObjectEqual(this, this.ruleForm, 'get', 'childIndexMan', this.$parent.closeDialog);
    },
    editData(val) {
      this.ruleForm = val;
    }
  },

}
</script>

<style lang="scss">
.indexManAdd {
  .el-form-item__label {
    font-size: 12px;
  }
}
</style>


