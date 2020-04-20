
<template>
  <div class="codeRuleAdd">
      <el-form :model="ruleForm" :rules="rules" ref="codeRuleAddRuleForm" label-width="100px" class="formBill-One" :inline="true">

        <el-form-item label="编号：" prop="ruleCode">
          <el-input v-model="ruleForm.ruleCode" maxlength="50" clearable></el-input>
        </el-form-item>

        <el-form-item label="名称：" prop="ruleName">
          <el-input v-model="ruleForm.ruleName" maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="编码规则：" prop="startSerialNumber" class="expClass">
          <el-input v-model="expForm.f1" maxlength="100"  class="expInputClass"></el-input>
          <el-select v-model="expForm.s1" placeholder="" style="width:17% !important">
            <el-option
              v-for="item in optionsRuleExp"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option> 
          </el-select>
          <el-input v-model="expForm.f2" maxlength="100"  class="expInputClass"></el-input>
          <el-select v-model="expForm.s2" placeholder=""  style="width:17% !important">
            <el-option
              v-for="item in optionsRuleExp"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="expForm.f3" maxlength="100"  class="expInputClass"></el-input>
          <el-select v-model="expForm.s3" placeholder=""  style="width:17%  !important">
            <el-option
              v-for="item in optionsRuleExp"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="expForm.f4" maxlength="100"  class="expInputClass"></el-input>
          <el-select v-model="expForm.s4" placeholder=""  style="width:17%  !important">
            <el-option
              v-for="item in optionsRuleExp"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始流水号：" prop="startSerialNumber">
          <el-input v-model="ruleForm.startSerialNumber" maxlength="100" clearable></el-input>
        </el-form-item>
        <el-form-item label="增量步长：" prop="serialNumberIncrement">
          <el-input v-model="ruleForm.serialNumberIncrement" maxlength="100" clearable></el-input>
        </el-form-item>
        <el-form-item label="重置周期：" prop="resetCycle">
          <el-select v-model="ruleForm.resetCycle" placeholder="请选择">
            <el-option
              v-for="item in optionsResetCycle"
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
    name: "codeRuleAdd",
    data() {
      return {
        ruleForm:{
          ruleCode: "",
          ruleName: "",
          ruleExp:"",
          ruleExpRemark:"",
          startSerialNumber: "1",
          serialNumberIncrement: "1",
          resetCycle:0,
        },
        expForm:{
          f1:"",
          s1:"",
          f2:"",
          s2:"",
          f3:"",
          s3:"",
          f4:"",
          s4:"",
        },
        optionsResetCycle: [{
            value: 0,
            label: '无'
          },{
            value: 1,
            label: '年'
          },{
            value: 2,
            label: '月'
          },{
            value: 3,
            label: '日'
          }],
        optionsRuleExp:[{
            value:"",
            label:""
          },{
            value:"{date yy}",
            label:"年年"
          },{
            value:"{date MM}",
            label:"月月"
          },{
            value:"{date dd}",
            label:"日日"
          },{
            value:"{date HH:mm:ss}",
            label:"时时:分分:秒秒"
          },{
            value:"{date HHmmss}",
            label:"时时分分秒秒"
          },{
            value:"{date yyyy}",
            label:"年年年年"
          },{
            value:"{date yyyyMMdd}",
            label:"年年年年月月日日"
          },{
            value:"{date yyyy-MM-dd}",
            label:"年年年年-月月-日日"
          },{
            value:"{date yyyy/MM/dd}",
            label:"年年年年/月月/日日"
          },{
            value:"{companySample}",
            label:"水司简化编号"
          },{
            value:"{company}",
            label:"水司编号"
          },{
            value:"{2serial}",
            label:"2位流水"
          },{
            value:"{3serial}",
            label:"3位流水"
          },{
            value:"{4serial}",
            label:"4位流水"
          },{
            value:"{5serial}",
            label:"5位流水"
          },{
            value:"{6serial}",
            label:"6位流水"
          },{
            value:"{7serial}",
            label:"7位流水"
          },{
            value:"{8serial}",
            label:"8位流水"
          },{
            value:"{9serial}",
            label:"9位流水"
          },{
            value:"{10serial}",
            label:"10位流水"
          }],
        rules: {
          code: [
            { required: true, message: '请输入编号', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
        },
      }
    },
    mounted(){
    },
    methods: {
      //保存按钮
      resetForm() {
        this.$refs.codeRuleAddRuleForm.resetFields();
      },
      getExpRemark(value){
        for(let i=0;i<this.optionsRuleExp.length;i++){
          if(value==this.optionsRuleExp[i].value){
            return this.optionsRuleExp[i].label;
          }
        }
        return "";
      },
      submitForm(formName,type) {
        let _this = this;
        let params = {};
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.ruleForm.ruleExp=this.expForm.f1+this.expForm.s1+this.expForm.f2+this.expForm.s2+
                this.expForm.f3+this.expForm.s3+this.expForm.f4+this.expForm.s4;
             this.ruleForm.ruleExpRemark=this.expForm.f1+this.getExpRemark(this.expForm.s1)+this.expForm.f2+this.getExpRemark(this.expForm.s2)+
                this.expForm.f3+this.getExpRemark(this.expForm.s3)+this.expForm.f4+this.getExpRemark(this.expForm.s4);
             if(type === '添加'){
               params = {
                  "busicode": "CodeRuleAdd",
                  "data": this.ruleForm
              }

             }else{
               params = {
                  "busicode": "CodeRuleUpdate",
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
                _this.$parent.selectList();
                _this.$parent.closeDialog();
                this.resetForm();      
              })
              
          } else {
            return false;
          }
        });
      },
      handleClose() {
        this.common.chargeObjectEqual(this,this.ruleForm,'get','codeRuleAdd',this.$parent.closeDialog);
      },
      editData(val){
        this.ruleForm = val;
        let valExp = val.ruleExp;
        //折分
        let i=1;
        while(valExp.indexOf("}")>-1){
          let exp = valExp.substring(0,valExp.indexOf("}")+1);
          let f = exp.substring(0,exp.indexOf("{"));
          let s = exp.substring(exp.indexOf("{"));
          this.expForm["f"+i]=f;
          this.expForm["s"+i]=s;
          i++;
          valExp = valExp.substring(valExp.indexOf("}")+1);
        }
        if(valExp.length > 0){
          this.expForm["f"+i]=valExp;
          i++;
        }
        for(let j=i;j<=4;j++){
          this.expForm["f"+j]="";
          this.expForm["s"+j]="";
        }
      }
    },

  }
</script>
<style lang="scss">
.formBill-One .el-form-item{
  padding:0 12%
}
.expClass {
  .expInputClass {
    width:6%;
  }
  .expInputClass input {
    padding:0 5px;
  }
}
</style>
