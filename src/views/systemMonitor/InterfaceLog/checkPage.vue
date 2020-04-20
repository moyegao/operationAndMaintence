<template>
  <div class="checkPage">
    <el-form :model="formData" ref="checkPage" label-width="120px" class="formInterfaceManAdd">
      <el-form-item label="水司名称：" prop="shortName" class="mark">
        <span>{{formData.shortName}}</span>
      </el-form-item>
      <el-form-item label="服务标识：" prop="serviceCode" class="mark">
        <span>{{formData.serviceCode}}</span>
      </el-form-item>
      <el-form-item label="操作人：" prop="createName" class="mark">
        <span>{{formData.createName}}</span>
      </el-form-item>
      <el-form-item label="操作时间：" prop="createTime" class="mark">
        <span>{{formData.createTime}}</span>
      </el-form-item>
      <el-form-item label="请求数据：" prop="requestJson" class="remark">
        <el-input type="textarea" disabled :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.requestJson"></el-input>
      </el-form-item>    
      <el-form-item label="应答结果：" prop="responseJson" class="remark">
        <el-input type="textarea" disabled :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.responseJson"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    name:"checkPage",
    data(){
        return{
          formData:{
            "shortName": "",
            "serviceCode": "",
            "createName":"",
            "createTime":"",
            "requestJson": "",
            "responseJson":"",
          },
        }
    },
    mounted() {
        
    },
    methods: {

    },
    watch:{

    }
}
</script>
<style lang="scss">
.checkPage{
  width: 100%;
  height: 100%;
  .formInterfaceManAdd{
      width: 80%;
      margin: 10px auto;
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
}

</style>