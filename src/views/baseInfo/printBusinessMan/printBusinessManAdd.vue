<template>
    <div class="printBusinessManAdd">
        <el-form :model="formDataService" :rules="rules" ref="formDataprintBusinessManAdd" label-width="120px" class="formprintBusinessManAdd">
            <el-form-item label="打印业务编号：" prop="code">
              <el-input v-model="formDataService.code"></el-input>
            </el-form-item>
            <el-form-item label="打印业务名称：" prop="name" class="mark">
              <el-input v-model="formDataService.name"></el-input>
            </el-form-item>
            <el-form-item label="打印业务描述：" prop="remark" class="remark">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="500" clearable show-word-limit v-model="formDataService.remark"></el-input>
            </el-form-item>
            <el-form-item label="子系统：">
              <el-button-group>
                <el-button size="mini"  type="info" icon="el-icon-minus" @click="delRow"></el-button>
                <el-button size="mini" type="info" icon="el-icon-plus" @click="addRow"></el-button>
                <!--<el-button type="primary" icon="el-icon-delete" @click="delAll"></el-button>-->
              </el-button-group>
            </el-form-item>
        </el-form>
        <div class="kl-table form-table">
            <el-table
                :data="formDataService.fieldsList"
                border
                v-if="tableShow"
                :max-height="maxHeight"
                :highlight-current-row="true"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                style="width: 100%"
                class="tableTSer">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column prop="fieldCode" label="字段标识" min-width="100px">
                <template slot-scope="scope">
                    <el-input v-model="formDataService.fieldsList[scope.$index].fieldCode" controls-position="right" style="width: 100%" class="inputClass"></el-input>
                </template>
                </el-table-column>
                <el-table-column prop="fieldName" label="字段名称" min-width="100px">
                <template slot-scope="scope">
                    <el-input v-model="formDataService.fieldsList[scope.$index].fieldName" controls-position="right" style="width: 100%" class="inputClass"></el-input>
                    
                </template>
                </el-table-column>

                <el-table-column prop="fieldType" label="字段类型" min-width="200px">
                <template slot-scope="scope">
                    <el-select 
                            v-model="formDataService.fieldsList[scope.$index].fieldType" 
                            placeholder="请选择字段类型">
                    <el-option
                        v-for="item in fieldTypesData"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type">
                    </el-option>
                    </el-select>
                </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name:"printBusinessManAdd",
    data(){
        return{
            formDataService:{
                "id": "",
                "code": "",
                "name": "",
                "remark": "",
                "fieldsList":[]
            },
            fieldTypesData:[
                {type:1,name:"数字"},
                {type:2,name:"字符串"},
                {type:13,name:"图片"}],
            rules: {
                code: [
                    { required: true, message: '请输入打印业务编号', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入打印业务名称', trigger: 'blur' }
                ]
            },
            multipleSelection:"",
            maxHeight: 0,
            tableShow: false,
        }
    },
    mounted(){
        this.$nextTick(()=>{
           this.common.changeTable(this, '.printBusinessManAdd', ['.printBusinessManAdd .formprintBusinessManAdd']);
        });

    },
    methods:{
        // 表格选择框选中事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /**
       * 表格操作事件
       * delRow删除选中行
       * addRow添加行
       * delAll删除全部行
       * */
        delRow(){
            for(let i in this.formDataService.fieldsList){
                if(this.multipleSelection.length === 0){
                    this.$message({
                    showClose: true,
                    message: '请选择要移除的数据'
                    })
                }else {
                    for(let j in this.multipleSelection){
                        if (this.formDataService.fieldsList[i] == this.multipleSelection[j]){
                            this.formDataService.fieldsList.splice(i,1);
                        }
                    }
                }
            }
        },
        addRow(){
            this.formDataService.fieldsList.push(
            {
                "fieldCode": "", //not null
                "fieldName": "", //not null
                "fieldType": "",
            }
            )
        },
        delAll(){
            this.formDataService.fieldsList = []
        },
        submitForm(formName,type) {
            

            let _this = this;
            let params = {};
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(type === '添加'){
                params = {
                    "busicode": "PrintBusinessAdd",
                    "data": this.formDataService
                }

                }else{
                params = {
                    "busicode": "PrintBusinessUpdate",
                    "data": this.formDataService
                };
                }
                this.$api.fetch({
                    method: 'post',//请求方法
                    params: params,//参数
                }).then(res => {
                        _this.$message({
                        showClose:true,
                        message:'保存成功',
                        type:'success',
                        });
                        _this.$parent.getData();
                        _this.$parent.handleClose();
                        _this.formDataService.fieldsList = [];
                })
                
            } else {
                return false;
            }
        });
      },
      // 返回
      handleClose() {
        this.common.chargeObjectEqual(this,this.formDataService,'get','printBusinessForm',this.boforeClose);
      },
      boforeClose(){
        this.$parent.handleClose();
      },
      editData(val,type){
        this.formDataService = val;
        if(!this.formDataService.fieldsList){
           this.formDataService.fieldsList = [];
        }
        if(type==='edit'){
            let _this = this
        }
        
      }
    },
    watch:{
        maxHeight(){
        this.tableShow = false;
        this.$nextTick(()=>{
          this.tableShow = true;
        });
      },
    }
}
</script>
<style lang="scss">
.printBusinessManAdd{
    width: 100%;
    height: 100%;
    .formprintBusinessManAdd{
        width: 80%;
        margin: 5px auto;
        .el-form-item__label{
            font-size: 14px
        }
        .select-member{
            font-size: 14px;
        }
        .el-form-item{
            width: 90%;
            margin-right: 0px;
            margin-bottom: 0px;
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
            margin-bottom: 10px;
        }
        .mark{
            margin-bottom: 5px;
        }
    }
    .form-table{
        width: 80%;
        margin: 10px auto;
        padding: 0px;
        .el-input__inner,.el-input,.el-cascader{
            height: 30px;
            line-height: 30px;
        }
        .el-input__icon{
            line-height: 30px;
        }
    }

}

</style>
