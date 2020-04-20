

<template>
  <div class="areaManAdd">
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="formBill" :inline="true">

      <el-form-item label="片区编号：">
        <el-input v-model="ruleForm.areaNo" clearable></el-input>
      </el-form-item>

      <el-form-item label="片区名称：">
        <el-input v-model="ruleForm.areaName" clearable></el-input>
      </el-form-item>

      <el-form-item label="状态：">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注:" class="f2">
        <el-input type="textarea" v-model="ruleForm.comments" maxlength="50" show-word-limit></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "areaManAdd",
  data() {
    return {
      databaseData: [],
      ruleForm: {
        areaNo: "",
        areaName: "",
        status: 1,
        comments: "",
      },
      // rules: {
      //   kpiUnique: [
      //     { required: true, message: '请输入指标维键', trigger: 'blur' },
      //   ],
      //   kpiName: [
      //     { required: true, message: '请输入指标名称', trigger: 'blur' }
      //   ],
      //   kpiComments: [
      //     { required: true, message: '请输入指标描述', trigger: 'blur' }
      //   ],
      //   kpiLevel: [
      //     { required: true, message: '请输入指标级别', trigger: 'blur' }
      //   ],
      //   subThemeUnique: [
      //     {  message: '请输入所属子主题维键', trigger: 'blur', required: true },
      //   ],
      // },
    }
  },
  mounted() {
  },
  methods: {
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    //保存按钮
    submitForm(formName, type) {
      let _this = this;
      let message = '';
      let params = {};
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === '新建') {
            params = {
              "busicode": "CompanyAreaAdd",
              "data": this.ruleForm
            }
            message = "新建成功"
          } else {
            params = {
              "busicode": "CompanyAreaUpdate",
              "data": this.ruleForm
            };
            message = "保存成功"
            // sessionStorage.setItem('formData',JSON.stringify(this.ruleForm));
          }
          this.$api.fetch({
            apiUrl: 'interface.api',//路径
            method: 'post',//请求方法
            params: params,//参数
          }).then(res => {
            _this.$message({
              showClose: true,
              message,
              type: 'success',
            });
            _this.$parent.selectTSubSystem();
            // _this.$parent.closeDialog();
            _this.resetForm();
            _this.$parent.areaManAddVisible = false;
            _this.$parent.areaManShow = true;
            _this.$parent.crumbsData.titleList.pop();
          })

        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.common.chargeObjectEqual(this, this.ruleForm, 'get', 'childAreaMan', this.$parent.closeDialog);
    },
    editData(val) {
      this.ruleForm = val;
    }
  },

}
</script>