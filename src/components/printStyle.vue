<template>
  <div class="printStyle">
    <el-dialog
      title="选择打印样式"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose"
      :close-on-click-modal="false">
      <div class="kl-table">
        <el-table
           border
          :data="selServicesData"
          highlight-current-row
          @row-dblclick="view"
          @row-click="cellClick"
          @current-change="currentChange"
          ref="printStyleTable"
          >
          <el-table-column
            type="index"
            label="NO."
            width="50"
            fixed="left"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="name"
            label="模板名称"
            min-width="150"

          >
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="print('print')">打印</el-button>
        <el-button size="mini" type="primary" @click="print('view')" >预览</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>
<script>
  export default {
    name: "printStyleDialog",
    data() {
      return {
        dialogVisible: true,
        selServicesData:[],
        printStyle:"",
        currentRow:{},   //当前高亮的行
      };
    },
    props:{
      companyNo:{
        type:String,
      },
      printStyleData:{

      }
    },
    mounted(){
      this.getData();
      let _this = this;
      document.onkeydown = function(event){
    　　event=event||window.event;
        if(event.keyCode==38){  //上
          let num = _this.handleTableData(_this.currentRow);
          if(num===0){
            return
          }else{
            num = num-1
             _this.$refs.printStyleTable.setCurrentRow( _this.selServicesData[num]);
             _this.currentRow =  _this.selServicesData[num];
             _this.printStyle = _this.selServicesData[num].id;
          }
          
        }else if(event.keyCode==40){  //下
        let num = _this.handleTableData(_this.currentRow);
          if(num===_this.selServicesData.length-1){
            return
          }else{
            num = num+1
             _this.$refs.printStyleTable.setCurrentRow( _this.selServicesData[num]);
             _this.currentRow =  _this.selServicesData[num];
             _this.printStyle = _this.selServicesData[num].id;
          }
        }
    　　event.stopPropagation();

      }
      
    },
    destroyed(){
      document.onkeydown = undefined;
    },
    methods: {
      // 获取列表数据
      getData(){
        let _this = this;
        let params = {
            "busicode": "PrintTemplateUserList",
            "data":{
              code:this.printStyleData.printBusinessCode,
              companyNo:this.companyNo
            }
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          _this.selServicesData = res;
          this.printStyle = res[0].id;
          this.$refs.printStyleTable.setCurrentRow(res[0]);
          this.currentRow = res[0];
        })
      },
      // 关闭弹窗
      handleClose(){
        this.$parent.close();
      },
      // 列表的NO列
      indexMethod(index) {
        return index+1 ;
      },
      //打印
      print(val){
        let _this = this;
        this.$api.fetch({
          params: this.printStyleData.printDataParams,//参数
        }).then(res => {
          _this.common.print(val,_this.companyNo,_this.printStyleData.printBusinessCode,_this.printStyle,res,_this);
          if(val==="print"){
            this.$parent.close();
          }
          
        })
      },
      // 双击预览
      view(row, column, event){
        this.printStyle = row.id;
        this.print('view');
      },
      //单击某一行
      cellClick(row, column, event){
        this.printStyle = row.id;

      },
      //当表格的当前行发生变化
      currentChange(currentRow, oldCurrentRow){
        this.currentRow = currentRow;
      },
      handleTableData(val){
        let num = '';
        this.selServicesData.forEach((item,index)=>{
          if(item.id===val.id){
            num = index;
          }
        })
        return num;
      }
    }
  };
</script>

<style lang="scss">
.printStyle{
  width: 100%;
  height: 100%;
  .el-dialog{
    height: 45%;
    margin-top: 15% !important;
    .el-dialog__body{
      width: calc(100% - 20px);
      margin: 10px auto;
    }
  }

}
</style>


