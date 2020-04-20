
<template>
  <div class="water-manage">
    <div class="main-content">
      <div class="kl-table">

        <el-table
          stripe border
          :data="appServerData.list"
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
            prop="companyNo"
            label="姓名"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="simplifyNo"
            label="帐号"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="shortName"
            min-width="100"
            label="姓别">
          </el-table-column>
          <el-table-column
            prop="adminArea"
            min-width="80"
            label="部门">
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
            :total="appServerData.total">
          </el-pagination>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: "staffView",
    components: {
    },
    data() {
      return {
        tableShow: true,
        tableQuery:{
          page:1,
          pageCount:50
        },
        appServerData:[],
        maxHeight:0,
      }
    },
    mounted() {
      this.selectTSubSystem()
    },
    methods: {
      // 格式化状态
      formatStatus(row) {
        return row.status == 1 ?"启用" : "禁用"
      },
      // 列表的NO列
      indexMethod(index) {
        return (this.tableQuery.page-1)*this.tableQuery.pageCount + (index+1) ;
      },
      handleSizeChange(val) { //显示多少数据一页
        this.tableQuery.pageCount = val
        this.tableQuery.page = 1
        this.selectTSubSystem()
      },
      handleCurrentChange(val) {  //显示多少页码
        this.tableQuery.page = val
        this.selectTSubSystem()
      },
      // 列表初始化
      selectTSubSystem() {
        let _this = this;
        // let params = {
        //     "busicode": "CompanyList",
        //     "data": this.tableQuery
        // }
        // this.$api.fetch({
        // params: params,//参数
        // }).then(res => {

        //     // _this.$set(_this.tableData,'list',res.data)
        //     _this.appServerData = res
        //     //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        //       _this.common.changeTable(_this,'.water-manage .kl-table',['.water-manage .block'])

        // })

      },
      handleClose() {
        this.staffViewShow = false
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
.water-manage{
    width: 100%;
    height: 100%;
    .main-content{
      width: 100%;
      height: 100%;
      .kl-table{
        height: calc(100% - 50px);
      }
    }
    
}
</style>

