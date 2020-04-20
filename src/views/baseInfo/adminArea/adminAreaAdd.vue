
<template>
  <div class="adminAreaAdd">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="formBill" :inline="true">

        <el-form-item label="父级区域:">
          <el-input v-model="parentName" placeholder="请输入" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="区域名称:" prop="name">
          <el-input type="text" v-model="ruleForm.name" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="区域简称:" prop="sname">
          <el-input type="text" v-model="ruleForm.sname" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="状态:" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option v-for="item in optionStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
    </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "adminAreaAdd",
    props:["parentToChild"],
    data() {
      return {
        // databaseData:[],
        parentName:"根目录",
        ruleForm: { //表单数据
          id:'',
          parentId:'',
          code:'',//区域编号
          name:'',//区域名称
          sname:'',//简称
          status: 1,//区域状态
        },
        optionStatus:[{value: 0,label: '停用'},{value: 1,label: '启用'}],
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
    mounted(){
      
    },
    methods: {
      //保存按钮
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      //保存按钮
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        _this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '编辑'){
               params = {
                "busicode": "DistrictUpdate",
                "data": _this.ruleForm
              }
             }else{
               params = {
                "busicode": "DistrictAdd",
                "data": _this.ruleForm
              };
              // sessionStorage.setItem('formData',JSON.stringify(this.ruleForm));
             }
              _this.$api.fetch({
                params,//参数
              }).then(res => {
                _this.$message({
                  showClose:true,
                  message:'保存成功',
                  type:'success',
                });
                _this.$parent.selectTSubSystem();
                _this.$parent.selectTSubSystemTree();
                // _this.$parent.closeDialog();
                _this.resetForm();
                _this.$parent.enterMeterDataShow = false;
                _this.$parent.adminAreaShow = true;
                _this.$parent.crumbsData.titleList.pop();
              })
              
          } else {
            return false;
          }
        });
      },
      //弹出框
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','childAdminArea',this.$parent.closeDialog);
      },
      editData(val,name){
        this.ruleForm = val;
        // this.parentName = name;
      }
    },

  }
</script>