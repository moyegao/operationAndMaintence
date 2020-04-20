<template>
  <div class="printBusinessMan">
    <div class="main-content">
        <div class="bread-contain">
            <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
            <div class="bread-contain-right" v-show="printBusinessManShow">
                <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
            </div>
            <div class="bread-contain-right" v-show="printBusinessManAddVisible">
                <el-button size="mini" type="primary" @click="submitForm('formDataprintBusinessManAdd')">保存</el-button>
                <el-button  icon="el-icon-caret-left" size="mini" @click="close">返回</el-button>
            </div>
        </div>
      <div class="kl-table" v-show="printBusinessManShow">
        
        <div class="toolbar">
          <el-form :inline="true" :model="tableQuery" class="demo-form-inline" size="mini">
 
            <div class="toolbar-left">
              <el-form-item label="打印业务编号：">
                    <el-input class="default_class" v-model="tableQuery.code" size="mini" @keyup.enter.native="search" clearable></el-input>
              </el-form-item>
              <el-form-item label="打印业务名称：">
                    <el-input class="default_class" v-model="tableQuery.name" size="mini" @keyup.enter.native="search" clearable></el-input>
              </el-form-item>
              <el-form-item class="button-group">
                <el-button class="compile" type="primary el-icon-search"  @click="search" size="mini"></el-button>
              </el-form-item>
            </div>

            <div class="toolbar-right">
           
            </div>

          </el-form>
        </div>
        <el-table
          stripe center border
          :data="selServicesData.list"
          v-if="tableShow"
          :max-height="maxHeight"
          style="width: 100%">
          <el-table-column
            type="index"
            label="NO."
            width="50"
            fixed="left"
            :index="indexMethod">
          </el-table-column>

          <el-table-column
            prop="code"
            label="业务编码"
            width="200"

          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="业务名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="业务描述">
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
                <el-button type="text"  @click="appAdd(scope)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableQuery.page"
            :page-sizes="[50, 100, 500, 1000]"
            :page-size="tableQuery.pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="selServicesData.total">
          </el-pagination>
        </div>
      </div>
      <div v-if="printBusinessManAddVisible" class="printBusinessAdd">
          <printBusinessManAdd ref="printBusinessManAdd"></printBusinessManAdd>
      </div>
    </div>
  </div>
</template>

<script>
import printBusinessManAdd from "./printBusinessManAdd"
  export default {
    name: "printBusinessMan",
    components:{
        printBusinessManAdd
    },
    data() {
      return {
        tableShow: false,
        tableQuery:{
          name:'',
          code:'',
          page:1,
          pageCount:50
        },
        maxHeight:0,
        selServicesData:{
            
        },
        printBusinessManAddVisible:false,
        printBusinessManShow:true,
        crumbsData :{  //面包屑
            titleList:[
                {title:'基础信息',path:'/baseInfo'},
                {title:'打印业务配置',method:()=>{window.histroy.back()}}
            ],
            
        },
        formData:{
                "id": "",
                "code": "",
                "name": "",
                "remark": ""
            },
        formDataService:{}
      }
      
    },
    mounted() {
      this.getData();
    },
    methods: {
      // 初始化列表数据
        getData() {
            let _this = this;
            
            let params = {
              "busicode": "PrintBusinessList",
              "data": this.tableQuery,
          }
            this.$api.fetch({
            params: params,//参数
            }).then(res => {
                _this.selServicesData = res;
                //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
                _this.common.changeTable(_this,'.printBusinessMan .kl-table',['.printBusinessMan .toolbar','.printBusinessMan .block'])

            })
        },
        // 搜索
      search(){
        this.tableQuery.page = 1;
        this.getData()
      },
      // 添加按钮点击事件
      appAdd(val) {
        this.printBusinessManAddVisible =  true;
        this.printBusinessManShow = false;
        this.$nextTick(()=>{
          if(val==='add'){
            this.$set(this.crumbsData.titleList,"2",{title:'添加',method:()=>{window.histroy.back()}});
            this.$refs.printBusinessManAdd.editData({
                "code": "",
                "name": "",
                "remark": "",
                "fieldsList": []
                
            });
            this.common.chargeObjectEqual(this,this.formData,'set','printBusinessForm');
          }else{
              this.$set(this.crumbsData.titleList,"2",{title:'编辑',method:()=>{window.histroy.back()}});           
              let _this = this
              let arr = [val];
              let params = {
                  "busicode": "PrintBusinessQuery",
                  "data": {
                      "id": val.row.id
                  },
              }
              this.$api.fetch({
                params: params,//参数
              }).then(res => {
                  _this.formDataService = res;
                  
                  _this.$refs.printBusinessManAdd.editData(_this.formDataService,'edit');
                  _this.common.chargeObjectEqual(_this,res,'set','printBusinessForm');
              })

          }
        });
      },
      // 列表的NO列
      indexMethod(index) {
        return (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      },
      handleSizeChange(val) { //显示多少数据一页
        this.tableQuery.pageCount = val
        this.tableQuery.page = 1
        this.getData()
      },
      handleCurrentChange(val) {  //页码点击
        this.tableQuery.page = val
        this.getData()
      },

      handleClose() {

        this.printBusinessManAddVisible = false;
        this.printBusinessManShow = true;
        this.crumbsData.titleList.pop();
      },
      close(){//返回
        this.$refs.printBusinessManAdd.handleClose();
      },
 
      
      submitForm(formName) {
        let type = this.crumbsData.titleList[2].title;
        this.$refs.printBusinessManAdd.submitForm(formName,type);
      },
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
.printBusinessMan{
    width: 100%;
    height: 100%;
    .main-content{
      width: 100%;
      height: 100%;
      .printBusinessAdd{
        width: 100%;
        height: calc(100% - 50px);
      }
    }
}
</style>

