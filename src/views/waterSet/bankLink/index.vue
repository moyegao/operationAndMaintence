
<template>
  <div class="bankLink">
    <div class="main-content">
      <div class="bread-contain">
          <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
          <div class="bread-contain-right" v-show="bankLinkShow">
              <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
          </div>
          <div class="bread-contain-right" v-show="bankLinkAddVisible">
              <el-button size="mini" type="primary" @click="submitForm('bankLinkAddRuleForm')">保存</el-button>
              <el-button  icon="el-icon-caret-left" size="mini" @click="handleClose">返回</el-button>
          </div>
      </div>
      <div class="company-content" v-show="bankLinkShow">
        <div class="company-left">
          <company-tree :treeData="treeDatas" @sendTreeData="backTreeData"></company-tree>
        </div>
        <div class="kl-table company-right">
          

          <el-table
            stripe border
            :data="appServerData"
            v-if="tableShow"
            :max-height="maxHeight">
            <el-table-column
              type="index"
              label="NO."
              width="50"
              fixed="left"
              :index="indexMethod">
            </el-table-column>

            <el-table-column
              prop="bankId"
              label="银行名称"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="configName"
              min-width="100"
              label="银行驱动">
            </el-table-column>
            <el-table-column
              prop="configPort"
              min-width="80"
              label="配置端口"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="communicationType"
              label="通讯类型"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="connectThread"
              label="连接线程数"
              min-width="120">
            </el-table-column>
            <el-table-column
              prop="workThread"
              min-width="120"
              label="工作线程数">
            </el-table-column>
            <el-table-column
              prop="status"
              min-width="80"
              label="状态">
            </el-table-column>


            <el-table-column label="操作"  width="80px" fixed="right">
              <template slot-scope="scope">
                
                <el-button type="text" @click="appAdd(scope)">编辑</el-button>
                <!-- <span style="color:#e6e6e6;">|</span>
                <el-button type="text"  @click="auth(scope)">授权范围</el-button> -->

              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      
      <div v-show="bankLinkAddVisible">
          <bankLinkAdd ref="bankLinkAdd"></bankLinkAdd>
      </div>
    </div>
  </div>
</template>

<script>
import bankLinkAdd from "./bankLinkAdd"
  export default {
    name: "bankLink",
    components:{
        bankLinkAdd
    },
    data() {
      return {
        tableShow: true,
        maxHeight:0,
        appServerData:[],
        formData:{
          bankInterfaceId:'' ,
          bankId: "",
          configName: '',
          configPort: "",
          configParam: "",
          communicationType: "",
          connectThread: "",
          workThread: 1,
          status: "",
        },
        crumbsData :{  //面包屑
            titleList:[
                {title:'水司配置',path:'/waterSet'},
                {title:'银行直联',method:()=>{window.histroy.back()}},
                {title:'根目录',method:()=>{window.histroy.back()}}
            ],
            
        },
        bankLinkShow:true,
        bankLinkAddVisible:false,
        treeDatas: {
          tree: [
            { 
              shortName: '根目录', 
              id: '2', 
              children: [
              ] 
            }
          ],
          defaultProps: {
            label: 'shortName',
            children: 'children'
          },
          inputProp: {
            showSearch: false,
            Inp_placeholder: '请输入节点'
          },
          sendTreeProp: ['code', 'shortName', 'districtArr', 'children', 'companyNo', 'group', 'isLeaf','isParent','parent','name'],
          rootName: '根目录',
          defaultOpen: {
            nodeKey: 'id',
            // nodeItem:164
          }
        },
        treeParantId:"",
        companyNo:"C021028",
      }
    },
    mounted() {
      this.getTreeDatas();
      this.selectTSubSystem();
    },
    methods: {
      // 添加按钮点击事件
      appAdd(val) {
        this.bankLinkShow = false;
        this.bankLinkAddVisible = true;
        if(val==='add'){
            this.$refs.bankLinkAdd.editData({
            bankInterfaceId:'' ,
            bankId: "",
            configName: '',
            configPort: "",
            configParam: "",
            communicationType: "",
            connectThread: "",
            workThread: 1,
            status: "",
          });
          this.$set(this.crumbsData.titleList,"3",{title:'添加',method:()=>{window.histroy.back()}});
          this.common.chargeObjectEqual(this,this.formData,'set','bankLinkAdd');
        }else{
            this.$set(this.crumbsData.titleList,"3",{title:'编辑',method:()=>{window.histroy.back()}});
            let _this = this;
            let params = {
                "busicode": "BankInterfaceConfigQuery",
                "data": {
                  configId:val.row.configId,
                  companyNo:this.companyNo
                },
            }
            this.$api.fetch({
              params: params,//参数
            }).then(res => {
              this.$refs.bankLinkAdd.editData(res);
              this.common.chargeObjectEqual(this,res,'set','bankLinkAdd');
            })
        }
        
      },
      // 列表的NO列
      indexMethod(index) {
        return index+1 ;
      },
      selectTSubSystem() {
        let _this = this;
        
        let params = {
            "busicode": "BankInterfaceConfigList",
            "data": {companyNo:this.companyNo},
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
            _this.appServerData = res      
            //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
            _this.common.changeTable(_this,'.bankLink .kl-table',[]);
          
        }).catch((err)=>{
          _this.common.changeTable(_this,'.bankLink .kl-table',[]);
        })
       
      },
      // 获取树的数据
      getTreeDatas(){
        let _this = this
        let params = {
          "busicode": "CompanyNameList",
          "data": {},
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          _this.treeDatas.tree[0].children = res;
          _this.treeDatas.tree[0].companyNo = res[0].companyNo;
          _this.companyNo = res[0].companyNo;
          this.$set(this.crumbsData.titleList,"2",{title:'根目录',method:()=>{window.histroy.back()}});
        })
      },
      closeDialog(){
        this.bankLinkShow = true;
        this.bankLinkAddVisible = false;
        this.crumbsData.titleList.pop();
      },
      // 返回
      handleClose() {
        
        this.$refs.bankLinkAdd.handleClose();
      },
      // 树的点击
      backTreeData(val) { 
        let _this = this;
        // this.treeParantId = val.id;
        this.companyNo = val.companyNo;
        this.$set(this.crumbsData.titleList,"2",{title:val.shortName,method:()=>{window.histroy.back()}});
        let params = {
            "busicode": "BankInterfaceConfigList",
            "data":  {companyNo:this.companyNo},
        }
        this.$api.fetch({
          params: params,//参数
        }).then(res => {

          _this.appServerData = res;

        })
      },
      //保存按钮
      submitForm(formName) {
        let type = this.crumbsData.titleList[3].title;
        this.$refs.bankLinkAdd.submitForm(formName,type,this.companyNo);
      },
    },
    watch:{
      maxHeight(){
        this.tableShow = false
        this.$nextTick(()=>{
          this.tableShow = true
        })
      }
    }
  }
</script>

<style lang="scss">
.bankLink{
  width: 100%;
  height: 100%;
  .main-content{
    width: 100%;
    height: 100%;
  }
}
</style>

