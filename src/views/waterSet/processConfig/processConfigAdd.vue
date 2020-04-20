


<template>
  <div class="processConfigAdd">
    <!-- demo-form  -->
    <el-form :model="modelData" ref="processConfigAddForm" :rules="rules" label-width="100px" class="formBill-One" :inline="true">
      <el-form-item label="单据类型：" prop="receiptType">
        <el-select v-model="modelData.receiptType" placeholder="请选择">
          <el-option v-for="item in receiptTypeData" :key="item.receiptNo" :label="item.receiptName" :value="item.receiptNo">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流程编号：" prop="platId">
        <el-input v-model="modelData.platId" maxlength="50" clearable></el-input>
      </el-form-item>
      <el-form-item label="流程标识：" prop="processCode">
        <el-input v-model="modelData.processCode" maxlength="50" clearable></el-input>
      </el-form-item>
      <el-form-item label="流程名称：" prop="processName">
        <el-input v-model="modelData.processName" maxlength="50" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="modelData.status" placeholder="请选择">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div id="workflowDiv">

    </div>
  </div>
</template>

<script>
export default {
  name: "processConfigAdd",
  data() {
    return {
      receiptTypeData: [],
      modelData: {
        id: "",
        processCode: '',
        platId: '',
        processName: "",
        receiptType: '',
        status: "",
        tenantId: "",
        companyNo: "",
        processInstanceId: "",
        processState: "",
      },
      formData: {
        id: "",
        processCode: '',
        platId: '',
        processName: "",
        receiptType: '',
        status: "",
        tenantId: "",
        companyNo: "",
        processInstanceId: "",
        processState: "",
      },
      rules: {
        processCode: [
          { required: true, message: '请输入流程标识', trigger: 'blur' },
        ],
        platId: [
          { required: true, message: '请输入流程编号', trigger: 'blur' },
        ],
        processName: [
          { required: true, message: '请输入流程名称', trigger: 'blur' },
        ],
        receiptType: [
          { required: true, message: '请输入单据类型', trigger: 'blur' },
        ],
      },
    }
  },
  mounted() {
    this.getBusinessData();
  },
  methods: {
    //保存按钮
    resetForm() {
      this.$refs.processConfigAddForm.resetFields();
    },
    //查询所有的业务，用于下拉选择
    getBusinessData() {
      let _this = this;
      let params = {
        "busicode": "ReceiptList",
        "data": {
          page: 1,
          pageCount: 50000        },
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {
        _this.receiptTypeData = res.list
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
              "busicode": "processConfigAdd",
              "data": this.modelData
            }
          } else {
            params = {
              "busicode": "processConfigUpdate",
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
      this.common.chargeObjectEqual(this, this.modelData, 'get', 'processConfigAdd', this.$parent.closeDialog);
    },
    editData(val) {
      this.modelData = val;
      let _this = this;
      //************启用流程代码************** */
      this.common.getProcessShowView("BASE_PROCESS_CONFIG",
        "审批流配置:" + this.modelData.processName + "(" + this.modelData.processCode + ")",
        this.modelData.id, this.modelData.processInstanceId, "workflowDiv", this.modelData.companyNo, this, () => {
          _this.$parent.getData();
          _this.$parent.closeDialog();
        });
    }
  },

}
</script>