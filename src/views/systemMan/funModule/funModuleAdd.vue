
<template>
  <div class="funModuleAdd">
      <el-form :model="funModuleAddruleForm" :rules="rules" ref="funModuleAddruleForm" label-width="100px" class="demo-form" :inline="true">

        <el-form-item label="模块名称:" prop="moduleName">
            <el-input v-model="funModuleAddruleForm.moduleName" maxlength="50" clearable placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="页面路径:">
            <el-input type="text" v-model="funModuleAddruleForm.pageAddr" maxlength="100" clearable placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="排序:">
            <el-input type="text" v-model="funModuleAddruleForm.sort" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="状态:" prop="status">
             <el-select v-model="funModuleAddruleForm.status" placeholder="请选择">
              <el-option v-for="item in optionStatus"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
             	</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注:" class="remark">
            <el-input type="textarea" v-model="funModuleAddruleForm.comments" maxlength="500" clearable show-word-limit placeholder="请输入"></el-input>
          </el-form-item>
      </el-form>
          
  </div>
</template>

<script>
  export default {
    name: "funModuleAdd",
    data() {
      return {
        funModuleAddruleForm: { 
            moduleName:'',
            pageAddr:'',
            sort:'',
            status:1,
            comments:'' 
          },
          optionStatus:[{value: 0,label: '停用'},{value: 1,label: '启用'}],
        rules: {
          moduleName: [
            { required: true, message: '请输入模块名称', trigger: 'blur' },
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
      submitForm(formName,type,parent) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
             if(type === '添加'){
               this.funModuleAddruleForm.parent = parent;
               params = {
                  "busicode": "SysModuleAdd",
                  "data": this.funModuleAddruleForm
              }

             }else{
               params = {
                  "busicode": "SysModuleUpdate",
                  "data": this.funModuleAddruleForm
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
      handleClose() {
        this.common.chargeObjectEqual(this,this.funModuleAddruleForm,'get','funModuleForm',this.boforeClose);
      },
      boforeClose(){
        this.$parent.callBack();
      },
      editData(val){
        this.funModuleAddruleForm = val;
      },
    },

  }
</script>

<style lang="scss">
.funModuleAdd{
    .demo-form{
      .el-form-item__label{
        font-size: 12px
      }
      .select-member{
        font-size: 12px;
      }
      .el-form-item{
        width: 24%;
        margin-right: 0px;
        .el-form-item__content{
          width: calc(100% - 120px);
          .el-select{
            width: 100%;
          }
          .el-input__inner{
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .remark{
        width: 48%;
      }

  }
}
</style>


