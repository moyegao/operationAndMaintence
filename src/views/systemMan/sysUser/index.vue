


<template>
  <div class="sysUser">
    <div class="main-content">
      <div class="bread-contain">
        <publicCrumbs :crumbsData="crumbsData"></publicCrumbs>
        <div class="bread-contain-right" v-show="sysUserShow">
          <el-button class="el-icon-plus" type="primary" @click="appAdd('add')" size="mini">添加</el-button>
        </div>
        <div class="bread-contain-right" v-show="sysUserAddVisible">
          <el-button size="mini" type="primary" @click="submitForm('sysUserAddRuleForm')">确定</el-button>
          <el-button icon="el-icon-caret-left" size="mini" @click="close">返回</el-button>
        </div>
      </div>
      <div class="kl-table" v-show="sysUserShow">

        <el-table stripe border :data="tableData" v-if="tableShow" :max-height="maxHeight">
          <el-table-column type="index" label="NO." width="50" fixed="left" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="loginName" label="登录名">
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="appAdd(scope)">编辑</el-button>
              <span style="color:#e6e6e6;">|</span>
              <el-button type="text" @click="del(scope)">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableQuery.page"
            :page-sizes="[20, 100, 500, 1000]"
            :page-size="tableQuery.pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.rowCount">
          </el-pagination>
        </div> -->
      </div>
      <div v-show="sysUserAddVisible">
        <sysUserAdd ref="sysUserAdds"></sysUserAdd>
      </div>
    </div>
  </div>
</template>

<script>
import sysUserAdd from "./sysUserAdd"
export default {
  name: "sysUser",
  components: {
    sysUserAdd
  },
  data() {
    return {
      tableShow: false,
      tableQuery: {
        page: 1,
        pageCount: 20
      },
      maxHeight: 0,
      tableData: [],
      formData: '',
      crumbsData: {  //面包屑
        titleList: [
          { title: '系统管理', path: '/systemMan' },
          { title: '系统用户', method: () => { window.histroy.back() } }
        ],

      },
      sysUserShow: true,
      sysUserAddVisible: false,
      formData: {
        "loginName": "",
        "password": "",
        "checkPass": ""
      },
    }
  },
  mounted() {
    this.getData();
    this.$nextTick(() => {
      //data 里面定义一个axHeight 用于设置table的高度，增加一个v-if事件用于渲染吗，监听maxHeight 的变化控制v-if的变量
      this.common.changeTable(this, '.sysUser .kl-table', []);
    })
  },
  methods: {
    // 初始化列表数据
    getData() {
      let _this = this
      let params = {
        "busicode": "SysUserList",
        "data": {
        },
      }
      this.$api.fetch({
        params: params,//参数
      }).then(res => {

        // _this.$set(_this.tableData,'list',res.data)
        _this.tableData = res;

      })
    },
    // 添加/编辑按钮点击事件
    appAdd(val) {
      if (val === 'add') {
        this.$set(this.crumbsData.titleList, "2", { title: '添加', method: () => { window.histroy.back() } });
        this.$refs.sysUserAdds.editData({
          "loginName": "",
          "password": "",
          "checkPass": ""
        });
        this.common.chargeObjectEqual(this, this.formData, 'set', 'sysUser');
      } else {
        this.$set(this.crumbsData.titleList, "2", { title: '编辑', method: () => { window.histroy.back() } });
        let _this = this;
        let params = {
          "busicode": "SysUserQuery",
          "data": {
            id: val.row.id
          },
        };
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          let data = res;
          data.checkPass = data.password;
          this.$refs.sysUserAdds.editData(data);
          this.common.chargeObjectEqual(this, data, 'set', 'sysUser');
        })

      }
      this.sysUserShow = false;
      this.sysUserAddVisible = true;

    },
    // 列表的NO列
    indexMethod(index) {
      return index + 1
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

    callBack() {
      this.sysUserShow = true;
      this.sysUserAddVisible = false;
      this.crumbsData.titleList.pop();
    },
    close() {//返回
      this.$refs.sysUserAdds.handleClose();
    },
    // 删除
    del(scope) {
      let _this = this;
      this.$confirm('确认删除？')
        .then(_ => {
          let _this = this
          let params = {
            "busicode": "SysUserDelete",
            "data": {
              "id": scope.row.id,
              "loginName": scope.row.loginName
            }
          }
          this.$api.fetch({
            params: params,//参数
          }).then(res => {
            _this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            _this.getData();

          })

        })

    },
    //保存按钮
    submitForm(formName) {
      let type = this.crumbsData.titleList[2].title;
      this.$refs.sysUserAdds.submitForm(formName, type);
    },
  },
  watch: {
    maxHeight() {
      this.tableShow = false;
      this.$nextTick(() => {
        this.tableShow = true
      });
    }
  }
}
</script>

<style lang="scss">
.sysUser {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
  }
}
</style>

