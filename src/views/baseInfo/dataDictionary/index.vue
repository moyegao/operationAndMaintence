
<template>
  <div class="dataDictionary">
    <div class="bread-contain">
      <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
    </div>
    <div class="main-content" v-show="dataDictionaryShow">
      <!-- 弹出表单 组修改、添加 -->
      <el-dialog width="60%" :title="titleEquipparam" :close-on-click-modal='false' :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">

          <el-form-item label="组编号:" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>

          <el-form-item label="组名称:" prop="name">
            <el-input type="text" v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
        <br />
        <div slot="footer" class="dialog-footer" ref="ruleForm">
          <el-button type="info" size="mini" plain @click="submit('ruleForm');">确 定</el-button>
          <el-button type="" size="mini" plain @click="handleClose">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 弹出表单 组明细修改、添加 -->
      <el-dialog width="60%" :title="titleGroup" :close-on-click-modal='false' center :visible.sync="dialogGroup" :before-close="handleCloseGroup">
        <el-form :model="ruleFormGroup" :rules="rulesGroup" ref="ruleFormGroup" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="参数名:" prop="name">
            <el-input v-model="ruleFormGroup.name"></el-input>
          </el-form-item>

          <el-form-item label="参数值:" prop="value">
            <el-input type="text" v-model="ruleFormGroup.value"></el-input>
          </el-form-item>
          <br />
        </el-form>

        <div slot="footer" class="dialog-footer" ref="ruleFormGroup">
          <el-button type="info" size="mini" plain @click="submitGroup('ruleFormGroup');">确 定</el-button>
          <el-button type="" size="mini" plain @click="handleCloseGroup">取 消</el-button>
        </div>
      </el-dialog>
      <div class="kl-table">
        <el-row :gutter="20">
          <!--组按钮、列表-->
          <el-col :span="12">
            <!-- 工具栏 -->
            <div class="toolbar">
              <el-form :inline="true" class="demo-form-inline" size="mini">

                <div class="toolbar-right">
                  <el-form-item class="button-group">
                    <el-button :disabled="redelBtn" id="b0t0n0" size="mini" class="remove el-icon-edit" type="primary" @click.native="handleEdit">修改</el-button>
                    <el-button :disabled="redelBtn" id='b1t1n1' size="mini" class="remove el-icon-delete" type="primary" @click.native="del">删除</el-button>
                    <el-button size="mini" class="remove el-icon-plus" type="primary" @click="add">添加</el-button>
                  </el-form-item>
                </div>

              </el-form>
            </div>
            <!-- 表格 -->
            <el-table id="kr-table1" stripe center border :data="equipparamData" @row-click="demand" :row-class-name="GroupClassName" :row-style="GroupHighlight">

              <el-table-column type="index" label="NO." width="80" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="code" label="域编码"></el-table-column>

              <el-table-column prop="name" label="域名称"></el-table-column>

            </el-table>
          </el-col>

          <!--参数按钮、列表-->
          <el-col :span="12">
            <!-- 工具栏 -->
            <div class="toolbar">
              <el-form :inline="true" :model="tableQuery" class="demo-form-inline" size="mini">
                <div class="toolbar-right">
                  <el-form-item class="button-group">
                    <el-button :disabled="redelParamBtn" id="b3t3n3" size="mini" class="remove el-icon-edit" type="primary" @click.native="handleEditGroup">修改</el-button>
                    <el-button :disabled="redelParamBtn" id="b4t4n4" size="mini" class="remove el-icon-delete" type="primary" @click.native="delGroup">删除</el-button>
                    <el-button :disabled="redelBtn" id="b2t2n2" class="remove el-icon-plus" type="primary" @click="addGroup" size="mini">添加</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <!-- 表格 -->
            <el-table id="kr-table2" stripe center border :data="groupData" @row-click="demandgroup" :row-class-name="GroupClassNameCh" :row-style="GroupHighlightCh">

              <el-table-column type="index" label="NO." width="80" :index="indexMethod">
              </el-table-column>

              <el-table-column prop="name" label="参数名称"></el-table-column>

              <el-table-column prop="value" label="参数值"> </el-table-column>

            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataDictionary",
  data() {
    return {
      tableShow: true,
      maxHeight: 0,
      dialogFormVisible: false, //表单是否显示
      dialogGroup: false,
      titleEquipparam: '数据字典组-添加',
      titleGroup: '分组参数-添加',
      titleGroupName: '',
      titleGroupChName: '',
      ruleForm: { //父表单数据
        code: '',
        name: '',
        id: '',
      },
      rules: {  //表单验证规则
        code: [
          { message: '请输入组编号', trigger: 'blur', required: true }//required: true,是否必填
        ],
        name: [
          { message: '请输入组名称', trigger: 'blur', required: true }//required: true,是否必填
        ]
      },
      ruleFormGroup: { //子表单数据
        name: '',
        value: '',
        dictId: '',
        id: '',
      },
      rulesGroup: {  //表单验证规则
        name: [
          { message: '请输入组名', trigger: 'blur', required: true }//required: true,是否必填
        ],
        value: [
          { message: '请输入值', trigger: 'blur', required: true }//required: true,是否必填
        ]
      },
      tableQuery: { //查询表单数据
        page: 1,
        pageCount: 20,
      },
      historyData: {},
      equipparamData: [],//父/组列表数据
      groupData: [],//子/参数列表数据
      redelParamBtn: true,// 子/参数列表 修改删除按钮 当选中时子列表某行出现false 父修改后不消失false 父添加后为新添加那行的数据为ture 子删除后true 子修改后为false
      redelBtn: true,// 父/组列表、修改删除按钮 子/参数列表 添加按钮 当选中时父列表某行出现false 修改后不消失false 添加后为新添加那行的数据为false 父删除后为true/取消列高亮
      rowData: {},//父 选中行的数据 保存
      rowGroupData: {},//子 选中行数据 保存
      getGroup: '',//父 高亮
      getGroupCh: '',//子 高亮
      dataDictionaryShow: true,
      dataDictionaryAddVisible: false,
      crumbsData: {  //面包屑
        titleList: [
          { title: '基础信息', path: '/ChangeTables' },
          { title: '数据字典', method: () => { window.histroy.back() } }
        ],

      },
    }

  },
  mounted() {
    this.init()
    if (this.redelBtn) {
      $('#b0t0n0').css({
        'background': '#a0cfff',
        'border': '1px solid #a0cfff'
      })
      $('#b1t1n1').css({
        'background': '#a0cfff',
        'border': '1px solid #a0cfff'
      })
      $('#b2t2n2').css({
        'background': '#a0cfff',
        'border': '1px solid #a0cfff'
      })
      if (this.redelParamBtn) {
        $('#b3t3n3').css({
          'background': '#a0cfff',
          'border': '1px solid #a0cfff'
        })
        $('#b4t4n4').css({
          'background': '#a0cfff',
          'border': '1px solid #a0cfff'
        })
      }
    }
    //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
  },
  methods: {
    add() {
      this.ruleForm.code = ''
      this.ruleForm.name = ''
      this.ruleForm.id = ''
      this.titleEquipparam = '数据字典组-添加',
        this.dialogFormVisible = true
      this.common.chargeObjectEqual(this, this.ruleForm, 'set', 'childDataDictionary');
    },
    handleClose() {
      this.common.chargeObjectEqual(this, this.ruleForm, 'get', 'childDataDictionary', this.closeDialog);
    },
    closeDialog() {
      this.ruleForm.code = ''
      this.ruleForm.name = ''
      this.ruleForm.id = ''
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false
    },
    addGroup() {
      this.ruleFormGroup.name = ''
      this.ruleFormGroup.value = ''
      this.ruleFormGroup.id = ''
      this.titleGroup = this.titleGroupName + '组-参数添加',
        this.dialogGroup = true
      this.common.chargeObjectEqual(this, this.ruleFormGroup, 'set', 'childDataDictionary2');
    },
    GroupClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    GroupHighlight({ row, rowIndex }) {//组高亮
      if ((this.getGroup) === rowIndex) {
        // return {
        //   "background-color": "rgb(187, 216, 245)"
        // }
        $("#kr-table1 tbody").children(".el-table__row:odd").addClass('el-table__row--striped')
        $("#kr-table1 tbody").children(".el-table__row").eq(this.getGroup).addClass("is-active").removeClass('el-table__row--striped').siblings().removeClass('is-active')
      }
    },
    GroupClassNameCh({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex
    },
    GroupHighlightCh({ row, rowIndex }) {
      if ((this.getGroupCh) === rowIndex) {
        // return {
        //   "background-color": "rgb(187, 216, 245)"
        // }
        $("#kr-table2 tbody").children(".el-table__row:odd").addClass('el-table__row--striped')
        $("#kr-table2 tbody").children(".el-table__row").eq(this.getGroupCh).addClass("is-active").removeClass('el-table__row--striped').siblings().removeClass('is-active')
      }
    },
    handleCloseGroup() {
      this.common.chargeObjectEqual(this, this.ruleFormGroup, 'get', 'childDataDictionary2', this.closeDialogGroup);
    },
    closeDialogGroup() {
      this.ruleFormGroup.name = ''
      this.ruleFormGroup.value = ''//清空数据
      this.ruleFormGroup.dictId = ''
      this.$refs.ruleFormGroup.resetFields()//清空校验
      this.dialogGroup = false//隐藏表单
    },
    indexMethod(index) {//获取表格序号
      return (this.tableQuery.page - 1) * this.tableQuery.pageCount + (index + 1)
    },
    init() {//父表初始化获取数据
      let _this = this
      let params = {
        "busicode": "DictionaryTypeList",
        "data": {}
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        _this.$set(_this, 'equipparamData', res)
      })
    },
    initGroup() {//子表初始化数据
      let that = this
      let params = {
        "busicode": "DictionaryParamInfoList",
        "data": { dictId: that.rowData.id }
      }
      this.$api.fetch({
        params,//参数
      }).then(res => {
        that.groupData = res
      })
    },
    demand(row, event, column) {//父点击
      let that = this
      this.rowGroupData = {};
      this.redelParamBtn = true;
      this.getGroupCh = '';
      this.$nextTick(() => {
        $('#kr-table2').find('.is-active').removeClass('is-active')
      })

      $('#b3t3n3').css({
        'background': 'rgb(160, 207, 255)',
        'border': 'rgb(160, 207, 255)',
        'color': '#fff',
      })
      $('#b4t4n4').css({
        'background': 'rgb(160, 207, 255)',
        'border': 'rgb(160, 207, 255)',
        'color': '#fff',
      })
      this.redelBtn = false
      $('#b0t0n0').css({
        'background': '#409eff',
        'border': '1px solid #409eff'
      })
      $('#b1t1n1').css({
        'background': '#409eff',
        'border': '1px solid #409eff'
      })
      $('#b2t2n2').css({
        'background': '#409eff',
        'border': '1px solid #409eff'
      })
      this.rowData.code = row.code;
      this.rowData.name = row.name;
      this.rowData.id = row.id;
      this.ruleFormGroup.dictId = row.id;
      this.getGroup = row.index;
      this.titleGroupName = row.name;
      this.initGroup()
    },
    demandgroup(row, event, column) {//子点击
      this.redelParamBtn = false
      $('#b3t3n3').css({
        'background': '#409eff',
        'border': '1px solid #409eff'
      })
      $('#b4t4n4').css({
        'background': '#409eff',
        'border': '1px solid #409eff'
      })

      this.rowGroupData.name = row.name//点击后获取行数据
      this.rowGroupData.value = row.value
      this.rowGroupData.dictId = row.dictId
      this.rowGroupData.id = row.id
      this.getGroupCh = row.index
      this.titleGroupChName = row.name
    },
    handleEdit() { //表格编辑
      this.dialogFormVisible = true
      this.titleEquipparam = '数据字典组-修改'
      let row = this.ruleForm;
      row.name = this.rowData.name;
      row.code = this.rowData.code;
      row.id = this.rowData.id;
      // for(var i in this.rowData){
      //     this.ruleForm[i] = this.rowData[i]
      // }
      this.common.chargeObjectEqual(this, row, 'set', 'childDataDictionary');
    },
    handleEditGroup() {
      if (this.rowGroupData.length != 0) {
        this.dialogGroup = true;
        this.titleGroup = this.titleGroupName + '组-参数修改';
        this.ruleFormGroup.name = this.rowGroupData.name;//点击后获取行数据
        this.ruleFormGroup.value = this.rowGroupData.value;
        this.ruleFormGroup.dictId = this.rowGroupData.dictId;
        this.ruleFormGroup.id = this.rowGroupData.id;
        // this.ruleFormGroup.dictId = '';
        // for(var i in this.rowGroupData){//点击行获取的数据 赋值给表单
        //     this.ruleFormGroup[i] = this.rowGroupData[i]
        // }
        this.common.chargeObjectEqual(this, this.ruleFormGroup, 'set', 'childDataDictionary2');
      } else {
        this.$message('请选择需要修改的行！');
      }
    },
    //弹出框
    submit(formName) {	//提交
      let that = this
      let params
      let message
      delete this.ruleForm.index
      if (this.titleEquipparam === '数据字典组-添加') {
        params = {
          "busicode": "DictionaryTypeAdd",
          "data": this.ruleForm
        }
        message = '数据添加成功！'
      } else {
        params = {
          "busicode": "DictionaryTypeUpdate",
          "data": this.ruleForm
        }
        message = '数据修改成功！'
      }
      that.$refs[formName].validate((valid) => {//表单验证
        if (valid) {
          //判断新建
          that.$api.fetch({
            params,//参数
          }).then(res => {
            that.$message({
              showClose: true,
              message,
              type: 'success'
            });
            that.init()
            that.dialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    del() {
      let val = '该操作将删除\"' + this.titleGroupName + '\"分组以及分组下的所有参数信息,是否确定删除?'
      this.$confirm(val, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this
        let params = {
          "busicode": "DictionaryTypeDelete",
          "data": { "id": this.rowData.id }
        }
        that.$api.fetch({
          params,//参数
        }).then(res => {
          that.init()
          that.groupData = []
          that.redelBtn = true


          that.rowData = {}
          that.redelParamBtn = true

          that.rowGroupData = {}
          that.getGroupCh = ''//行高亮 为空则不高亮
          that.getGroup = ''//参数 行高亮 为空则不高亮
        })
      }).catch(() => { })
    },
    submitGroup() {
      let that = this
      let params//
      let message
      delete this.ruleFormGroup.index
      if (this.titleGroup === this.titleGroupName + '组-参数添加') {
        // this.ruleFormGroup.dictId = this.rowData.id
        params = {
          "busicode": "DictionaryParamInfoAdd",
          "data": this.ruleFormGroup
        }
        message = '组-参数添加成功！'
      } else {
        // this.ruleFormGroup.dictId = this.rowData.id
        params = {
          "busicode": "DictionaryParamInfoUpdate",
          "data": this.ruleFormGroup
        }
        message = '组-参数修改成功！'
      }
      this.$refs.ruleFormGroup.validate((valid) => {//表单验证
        if (valid) {
          that.$api.fetch({
            params,//参数
          }).then(res => {
            that.$message({
              showClose: true,
              message,
              type: 'success'
            });
            that.dialogGroup = false
            that.titleGroup = ''
            this.titleGroupName = ''
            that.initGroup()
          })
        } else {
          return false
        }
      })
    },
    delGroup(index, row) {
      let val = '该操作将删除\"' + this.titleGroupName + '-' + this.titleGroupChName + '\"参数，是否确定删除?'
      this.$confirm(val, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this
        let params = {
          "busicode": "DictionaryParamInfoDelete",
          "data": {
            "id": that.rowGroupData.id,
            // dictId: this.rowGroupData.dictId
          }
        }
        that.$api.fetch({
          params,//参数
        }).then(res => {
          that.redelParamBtn = true
          that.$message({
            showClose: true,
            message: "删除成功！",
            type: 'success'
          });
          setTimeout(() => {
            $('#b3t3n3').css({
              'background': '#a0cfff !important',
              'border': '1px solid #a0cfff !important'
            })
            $('#b4t4n4').css({
              'background': '#a0cfff !important',
              'border': '1px solid #a0cfff !important'
            })
          }, 0)
          that.rowGroupData = {}
          that.initGroup()
          // that.closeDialogGroup()
          that.getGroupCh = ''//父组 行高亮 为空则不高亮
          // that.getGroup = ''//参数 行高亮 为空则不高亮
        })
      }).catch(() => { })
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
    rowData(val, oldVal) {
      this.rowGroupData = ''
      this.getGroupCh = ''
      this.redelParamBtn = true
      setTimeout(() => {
        $('#b3t3n3').css({
          'background': '#a0cfff !important',
          'border': '1px solid #a0cfff !important'
        })
        $('#b4t4n4').css({
          'background': '#a0cfff !important',
          'border': '1px solid #a0cfff !important'
        })
      }, 0)
    }
  }
}
</script>

<style lang="scss" >
.dataDictionary {
  height: 100%;
  .main-content {
    height: calc(100% - 50px);
  }
  .kl-table {
    .el-row {
      height: 100%;
      .el-col {
        height: 100%;
      }
    }
    .el-table {
      height: 100%;
      overflow-y: auto;
    }
    .dataDictionary-solid {
      border: 1px solid red;
      width: 100%;
      height: 100%;
    }
  }
  .is-active {
    background-color: rgb(187, 216, 245);
  }
  .el-table__body {
    tr {
      td:nth-child(2) {
        div {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .el-dialog__body {
    width: calc(100% - 20px);
    height: calc(100% - 156px);
    padding: 10px;
  }
}
</style>
