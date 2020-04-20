<template>
  <div class="InterfaceLog">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
      <div class="bread-contain-right" v-show="isCheckPage">
        <el-button icon="el-icon-caret-left" size="mini" @click="close">返回</el-button>
      </div>
    </div>
    <div class="kl-table" v-show="!isCheckPage">
      <!-- 工具栏 -->
      <div class="toolbar">
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <div class="toolbar-left">
            <el-form-item label="日期:">
              <el-date-picker class="mydinner-range default_date" v-model="dateRange" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable :picker-options="pickerOptions" :default-time="['08:00:00', '07:59:59']">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="水司名称:">
              <el-input class="default_class" v-model="tableQuery.waterGroup" placeholder="水司名称" clearable></el-input>
            </el-form-item>
            <!--  -->
            <el-form-item>
              <el-button class="compile" type="primary el-icon-search" @click="demand" size="mini"></el-button>
            </el-form-item>
          </div>

          <div class="toolbar-right">
          </div>

        </el-form>
      </div>
      <!-- 表格 -->
      <el-table stripe center border v-if="tableShow" :max-height="maxHeight" :data="historyData.list">
        <el-table-column fixed="left" type="index" width="80" label="NO." :index="indexMethod"></el-table-column>

        <el-table-column prop="shortName" label="水司名称">
        </el-table-column>

        <el-table-column prop="serviceCode" label="服务标识">
        </el-table-column>

        <el-table-column prop="createName" label="操作人">
        </el-table-column>

        <el-table-column prop="createTime" label="操作时间">
        </el-table-column>

        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="checkOut(scope)">查看</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="tableQuery.page" :page-sizes="[50, 100, 500, 1000]" :page-size="tableQuery.pageCount" layout="total, sizes, prev, pager, next, jumper" :total="historyData.total">
        </el-pagination>
      </div>
    </div>
    <div v-show="isCheckPage">
      <checkPage ref="child"></checkPage>
    </div>
  </div>
</template>
<script>
import checkPage from "./checkPage"
export default {
  name: "InterfaceLog",
  components: {
    checkPage
  },
  data() {
    return {
      isCheckPage: false,
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/systemMan' },
          { title: '接口调用日志', method: () => { window.histroy.back() } }
        ],

      },
      dateRange: [],
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      tableShow: false,
      maxHeight: 0,
      ruleForm: { //表单数据
        time: '',
        fileTitle: '',
        comment: '',
        totalPrice: 0,
      },
      rules: {  //表单验证规则
        fileTitle: [
          { message: '请输入标题', trigger: 'blur' }//required: true,是否必填
        ],
      },
      tableQuery: { //查询表单数据
        beginTime: '',
        endTime: '',
        waterGroup: '',
        page: 1,
        pageCount: 50,
      },
      historyData: {},
    }
  },
  mounted() {
    this.getData()

  },
  methods: {

    // 初始化列表数据
    getData() {
      let _this = this;
      // 点击日期清除按钮dateRange值为null需要处理
      if (this.dateRange === null) {
        this.dateRange = ['', '']
      }
      this.tableQuery.beginTime = this.dateRange[0];
      this.tableQuery.endTime = this.dateRange[1];
      let params = {
        "busicode": "ServiceLogList",
        "data": this.tableQuery,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {

        // _this.$set(_this.tableData,'list',res.data)
        _this.historyData = res;
        //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
        _this.common.changeTable(_this, '.InterfaceLog .kl-table', ['.InterfaceLog .toolbar', '.InterfaceLog .block'])

      })
    },
    //弹出框
    // 工具栏
    demand() {  //查询
      this.tableQuery.page = 1
      this.getData()
    },
    checkOut(e) {//查看
      let _this = this
      let params = {
        "busicode": "ServiceLogQuery",
        "data": e.row.logId,
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        let child = _this.$refs.child.formData;
        child.shortName = res.shortName;
        child.serviceCode = res.serviceCode;
        child.createName = res.createName;
        child.createTime = res.createTime;
        child.requestJson = JSON.stringify(res.requestJson);
        child.requestJson = eval("(" + child.requestJson + ")");
        child.responseJson = JSON.stringify(res.responseJson);
        child.responseJson = eval("(" + child.responseJson + ")");
      })
      this.$set(this.crumbsData.titleList, "2", { title: '查看', method: () => { window.histroy.back() } });
      this.isCheckPage = true;
    },
    close() {
      this.crumbsData.titleList.pop();
      this.isCheckPage = false;
    },
    indexMethod(index) {//获取表格序号
      return (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1);
    },
    formatOrderDate(row) { //转义
      return row.uploadTime.substring(0, 10)
    },
    //分页
    handleSizeChange(val) { //显示多少数据一页
      this.tableQuery.pageCount = val
      this.tableQuery.page = 1
      this.getData()
    },
    handleCurrentChange(val) {  //显示多少页码
      this.tableQuery.page = val
      this.getData()
    },


  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    }
  }
}
</script>
<style lang="scss">
.InterfaceLog {
  width: 100%;
  height: 100%;
}
</style>
