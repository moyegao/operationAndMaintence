


<template>
  <div class="printTemplateAdd">
    <el-form :model="modelData" ref="printTemplateAddForm" :rules="rules" label-width="100px" class="formBill" :inline="true">
      <el-form-item label="打印业务：" prop="businessId">
        <el-select v-model="modelData.businessId" placeholder="请选择">
          <el-option v-for="item in businessData" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="样式名称：" prop="name">
        <el-input v-model="modelData.name" maxlength="50" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否默认样式：" prop="status">
        <el-select v-model="modelData.defaultFlag" placeholder="请选择">
          <el-option label="默认" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限范围：" prop="scope" class="scope f3">
        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" rows="15" maxlength="3000" clearable show-word-limit v-model="modelData.scope"></el-input>
        <font style="color: #bdbdc5;">如果要限定此样式为少数用户使用，请将用户登录账号填在这里，以英文逗号分隔</font>
      </el-form-item>
      <el-form-item label="描述：" prop="remark" class="remark f3">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="500" clearable show-word-limit v-model="modelData.remark"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "printTemplateAdd",
  data() {
    return {
      businessData: [],
      modelData: {
        id: '',
        name: "",
        remark: '',
        businessId: "",
        defaultFlag: 0,
        scope: "",
        companyNo: "",
      },
      formData: {
        id: '',
        name: "",
        remark: '',
        businessId: "",
        defaultFlag: 0,
        scope: "",
        companyNo: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入样式名称', trigger: 'blur' },
        ]
      },
    }
  },
  mounted() {
    this.getBusinessData();
  },
  methods: {
    //保存按钮
    resetForm() {
      this.$refs.printTemplateAddForm.resetFields();
    },
    //查询所有的打印业务，用于下拉选择
    getBusinessData() {
      let _this = this;
      let params = {
        "busicode": "PrintBusinessList",
        "data": {          name: '',
          code: '',
          page: 1,
          pageCount: 50000        },
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.businessData = res.list
      })
    },
    submitForm(formName, type, id) {
      let _this = this;
      let params = {};
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.modelData = _this.common.handleData(_this.modelData, _this.formData);
          if (type === '添加') {

            params = {
              "busicode": "PrintTemplateAdd",
              "data": this.modelData
            }
          } else {
            params = {
              "busicode": "PrintTemplateUpdate",
              "data": this.modelData
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
            _this.$parent.getData();
            _this.$parent.closeDialog();
          })

        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.common.chargeObjectEqual(this, this.modelData, 'get', 'printTemplateAdd', this.$parent.closeDialog);
    },
    editData(val) {
      this.modelData = val;
    }
  },

}
</script>

<style lang="scss">
.printTemplateAdd {
  .el-form-item__label {
    font-size: 12px;
  }
}
</style>


