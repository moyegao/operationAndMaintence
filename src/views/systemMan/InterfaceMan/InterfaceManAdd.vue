<template>
  <div class="InterfaceManAdd">
    <el-form :model="formDataService" :rules="rules" ref="formDataInterfaceManAdd" label-width="120px" class="formInterfaceManAdd">
      <el-form-item label="服务标识：" prop="serviceCode">
        <el-input v-model="formDataService.serviceCode"></el-input>
      </el-form-item>
      <el-form-item label="服务类名：" prop="className" class="mark">
        <el-input v-model="formDataService.className"></el-input>
      </el-form-item>
      <el-form-item label="服务描述：" prop="comments" class="remark">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="500" clearable show-word-limit v-model="formDataService.comments"></el-input>
      </el-form-item>
      <el-form-item label="输入参数样例：" prop="importExample" class="remark">
        <el-input type="textarea" :rows="2" maxlength="200" clearable show-word-limit v-model="formDataService.importExample"></el-input>
      </el-form-item>
      <el-form-item label="输出参数样例：" prop="outputExample" class="remark">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="500" clearable show-word-limit v-model="formDataService.outputExample"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-select v-model="formDataService.status" placeholder="选择状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子系统：">
        <el-button-group>
          <el-button size="mini" type="info" icon="el-icon-minus" @click="delRow"></el-button>
          <el-button size="mini" type="info" icon="el-icon-plus" @click="addRow"></el-button>
          <!--<el-button type="primary" icon="el-icon-delete" @click="delAll"></el-button>-->
        </el-button-group>

      </el-form-item>

    </el-form>
    <div class="kl-table form-table">
      <el-table :data="formDataService.tServiceDetails" border v-if="tableShow" :max-height="maxHeight" :highlight-current-row="true" ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%" class="tableTSer">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="systemCode" label="子系统" min-width="100px">
          <template slot-scope="scope">
            <el-select v-model="formDataService.tServiceDetails[scope.$index].systemCode" placeholder="请选择子系统" @change="changeCode(scope,scope.$index)">
              <el-option v-for="item in appServerData" :key="item.systemCode" :label="item.systemName" :value="item.systemCode">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="moduleName" label="归属模块" min-width="200px">
          <template slot-scope="scope">
            <el-cascader placeholder="请选择模块" @change="handleChange" v-model="formDataService.tServiceDetails[scope.$index].moduleId" :options="optionsTest[scope.$index]" :props="props" :show-all-levels="false" clearable></el-cascader>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="operation" label="归属操作">
                <template slot-scope="scope">
                    <el-select 
                            v-model="formDataService.tServiceDetails[scope.$index].operation" 
                            multiple placeholder="请选择归属操作">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </template>
                </el-table-column> -->

      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "InterfaceManAdd",
  data() {
    return {
      formDataService: {
        "serviceCode": "",
        "className": "",
        "comments": "",
        "importExample": "",
        "outputExample": "",
        "status": 1,
        "tServiceDetails": []

      },
      funcData: [],
      appServerData: [],
      optionsTest: [],
      options: [{
        value: "1",
        label: '增'
      }, {
        value: "2",
        label: '删'
      }, {
        value: "3",
        label: '改'
      }, {
        value: "4",
        label: '查'
      }, {
        value: "5",
        label: '导出'
      }],
      rules: {
        serviceCode: [
          { required: true, message: '请输入服务标识', trigger: 'blur' },
        ],
        className: [
          { required: true, message: '请输入服务类名', trigger: 'blur' }
        ],
        ipAddr: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入编号ip地址', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
      },
      props: {
        label: 'name',
        children: 'children',
        value: 'code',
        checkStrictly: true,
      },
      multipleSelection: "",
      maxHeight: 0,
      tableShow: false,
    }
  },
  mounted() {
    // console.log(this.maxHeight)
    this.getData();
    this.$nextTick(() => {
      this.common.changeTable(this, '.InterfaceManAdd', ['.InterfaceManAdd .formInterfaceManAdd']);
    });

  },
  methods: {
    getData() {
      let _this = this
      let params = {
        "busicode": "TSubSystemList",
        "data": {},
      }
      this.$api.fetch({
        params: params,//参数

      }).then(res => {
        _this.appServerData = res;

      })
    },
    // 表格选择框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取归属模块
    changeCode(val, num) {
      let _this = this;
      let systemCodes = val.row.systemCode;
      let params = {
        "busicode": "ServiceModuleList",
        "data": {
          "systemCodes": [systemCodes]
        },
      }
      this.$api.fetch({
        params: params,//参数

      }).then(res => {

        if (JSON.stringify(res) == "{}") {
          _this.$set(_this.optionsTest, num, [])
        } else {

          // this.formDataService.tServiceDetails[num].moduleId = [];
          _this.$set(_this.optionsTest, num, _this.treeData(res[systemCodes].children))
        }
        _this.$set(_this.formDataService.tServiceDetails[num], 'moduleId', [])
      })

    },


    //  行政区域数据处理 显示值
    treeData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children) {
          if (data[i].children.length === 0) {
            data[i].children = undefined
          } else {
            this.treeData(data[i].children)
          }
        }

      }
      return data
    },
    //  编辑-初始化-归属模块数据处理 显示值
    handleDataChange(value, data, code) {
      let result = {
        arr: [],
        name: ""
      };
      for (let i = 0; i < data.length; i++) {
        // let index = code[i]
        let val = data[i]
        result.arr[i] = [];
        for (let k = 0; k < val.length; k++) {
          if (val[k].code == value[i]) {//第一层寻找

            result.arr[i].push(val[k].code);
            break
          } else {
            if (val[k].children !== undefined) {//第二层寻找
              let d = val[k].children;

              for (let j = 0; j < d.length; j++) {

                if (d[j].code == value[i]) {
                  result.arr[i].push(val[k].code);
                  result.arr[i].push(d[j].code);
                  break
                } else {
                  if (d[j].children !== undefined) {//第三层寻找
                    let e = d[j].children

                    for (let y = 0; y < e.length; y++) {

                      if (e[y].code == value[i]) {
                        result.arr[i].push(val[k].code);
                        result.arr[i].push(d[j].code);
                        result.arr[i].push(e[y].code);
                        break
                      }
                    }
                  }
                }
              }
            }
          }

        }
      }
      return result
    },
    //  提交-归属模块数据处理 显示值
    handleDataChange1(value, data) {
      let result = {
        arr: [],
        name: ""
      };
      for (let i = 0; i < data.length; i++) {
        result.arr[i] = [];
        if (data[i].code == value[i]) {//第一层寻找

          result.arr[i].push(data[i].code);
          result.name = data[i].name;
          break
        } else {
          if (data[i].children !== undefined) {//第二层寻找
            let d = data[i].children;

            for (let j = 0; j < d.length; j++) {

              if (d[j].code == value[i]) {
                result.arr[i].push(data[i].code);
                result.arr[i].push(d[j].code);
                result.name = d[j].name;
                break
              } else {
                if (d[j].children !== undefined) {//第三层寻找
                  let e = d[j].children

                  for (let y = 0; y < e.length; y++) {

                    if (e[y].code == value[i]) {
                      result.arr[i].push(data[i].code);
                      result.arr[i].push(d[j].code);
                      result.arr[i].push(e[y].code);
                      result.name = e[y].name;
                      break
                    }
                  }
                }
              }
            }
          }
        }
      }
      return result
    },


    /**
   * 表格操作事件
   * delRow删除选中行
   * addRow添加行
   * delAll删除全部行
   * */
    delRow() {
      for (let i in this.formDataService.tServiceDetails) {
        if (this.multipleSelection.length === 0) {
          this.$message({
            showClose: true,
            message: '请选择要移除的数据'
          })
        } else {
          for (let j in this.multipleSelection) {
            if (this.formDataService.tServiceDetails[i] == this.multipleSelection[j]) {
              this.formDataService.tServiceDetails.splice(i, 1);
              this.optionsTest.splice(i, 1);
            }
          }
        }
      }
    },
    addRow() {
      this.formDataService.tServiceDetails.push(
        {
          // "serviceCode": "",//not null
          "systemCode": "", //not null
          "moduleId": [], //not null
          // "operation": [], //not null
          // "systemName": "",//not null
          "moduleName": null,
        }
      )
      this.optionsTest.push([])//optionsTest添加一个数组
    },
    delAll() {
      this.formDataService.tServiceDetails = []
    },
    submitForm(formName, type) {

      if (this.formDataService.tServiceDetails.length !== 0) {
        for (let i in this.formDataService.tServiceDetails) {
          // if(typeof(this.formDataService.tServiceDetails[i].operation)!=='string'){
          // this.formDataService.tServiceDetails[i].serviceCode = this.formDataService.serviceCode
          // this.formDataService.tServiceDetails[i].operation = JSON.stringify(this.formDataService.tServiceDetails[i].operation);

          // }

          if (Object.prototype.toString.call(this.formDataService.tServiceDetails[i].moduleId) == '[object Array]') {
            if (this.formDataService.tServiceDetails[i].moduleId.length > 0) {
              let leng = this.formDataService.tServiceDetails[i].moduleId.length;



              let currentData = this.handleDataChange1(this.formDataService.tServiceDetails[i].moduleId, this.optionsTest[i]);
              // console.log(currentData)
              this.formDataService.tServiceDetails[i].moduleName = currentData.name;
              this.formDataService.tServiceDetails[i].moduleId = this.formDataService.tServiceDetails[i].moduleId[leng - 1];
            } else {
              this.formDataService.tServiceDetails[i].moduleId = "";
            }
          }
          // this.formDataService.tServiceDetails[i].moduleId = this.formDataService.tServiceDetails[i].code;



        }
      }
      // console.log(this.formDataService.tServiceDetails);
      let _this = this;
      let params = {};
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === '添加') {
            params = {
              "busicode": "ServiceAdd",
              "data": this.formDataService
            }

          } else {
            params = {
              "busicode": "ServiceUpdate",
              "data": this.formDataService
            };
          }
          this.$api.fetch({
            apiUrl: 'interface.api',//路径
            method: 'post',//请求方法
            params: params,//参数
          }).then(res => {
            _this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success',
            });
            _this.$parent.getData();
            _this.$parent.handleClose();
            _this.formDataService.tServiceDetails = [];
          })

        } else {
          return false;
        }
      });
    },
    // 返回
    handleClose() {
      this.common.chargeObjectEqual(this, this.formDataService, 'get', 'InterfaceForm', this.boforeClose);
    },
    boforeClose() {
      this.$parent.handleClose();
    },
    handleOptionsTest(val, code) {
      let Curr = Object.getOwnPropertyNames(val);
      let handleData = [];
      let dataChange = [];
      code.forEach((item, index) => {
        if (Curr.includes(item)) {
          dataChange = this.treeData(val[item].children)
          handleData.push(dataChange);
        } else {
          dataChange = this.treeData([])
          handleData.push(dataChange);
        }
      });
      return handleData
    },
    editData(val, type) {
      this.formDataService = val;
      let systemCode = [];
      if (!this.formDataService.tServiceDetails) {
        this.formDataService.tServiceDetails = [];
      }
      if (this.formDataService.tServiceDetails.length === 0) {
        return
      }
      this.formDataService.tServiceDetails.forEach((item, index) => {
        systemCode.push(item.systemCode);
      });
      if (type === 'edit') {
        let _this = this
        let params = {
          "busicode": "ServiceModuleList",
          "data": {
            "systemCodes": systemCode
          },
        }
        this.$api.fetch({
          params: params,//参数

        }).then(res => {
          let id = [], currentData = [];
          _this.formDataService.tServiceDetails.forEach((item) => {
            id.push(item.moduleId)
          })

          _this.optionsTest = _this.handleOptionsTest(res, systemCode);
          currentData = _this.handleDataChange(id, _this.optionsTest, systemCode);
          _this.formDataService.tServiceDetails.forEach((item, index) => {
            item.moduleId = currentData.arr[index];
          })

        })
      }

    },
    getcascader(val) {

    },
    handleChange(value) {
      // console.log(value);
    }
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true;
      });
    },
  }
}
</script>
<style lang="scss">
.InterfaceManAdd {
  width: 100%;
  height: 100%;
  .formInterfaceManAdd {
    width: 80%;
    margin: 5px auto;
    .el-form-item__label {
      font-size: 14px;
    }
    .select-member {
      font-size: 14px;
    }
    .el-form-item {
      width: 90%;
      margin-right: 0px;
      margin-bottom: 0px;
      .el-form-item__content {
        width: calc(100% - 120px);
        .el-select {
          width: 100%;
        }
        .el-input__inner {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .remark {
      margin-bottom: 10px;
    }
    .mark {
      margin-bottom: 5px;
    }
  }
  .form-table {
    width: 80%;
    margin: 10px auto;
    padding: 0px;
    .el-input__inner,
    .el-input,
    .el-cascader {
      height: 30px;
      line-height: 30px;
    }
    .el-input__icon {
      line-height: 30px;
    }
  }
}
</style>
