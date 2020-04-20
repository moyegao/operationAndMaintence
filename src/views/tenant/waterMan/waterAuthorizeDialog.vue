<template>
	<div class="auth-dialog">

	  <div class="water-authorize">
	    <h2 class="tab-title">选择授权水司：{{waterCompony}}
	      <!--<el-select v-model="waterCompony" placeholder="请选择来源模版公司..." size="small">-->
	        <!--<el-option label="水司1" value="1"></el-option>-->
	        <!--<el-option label="水司2" value="2"></el-option>-->
	      <!--</el-select>-->
	    </h2>
	    <div class="auth-box clearfix" v-loading="loading">
	      <div class="left-side">
	        <el-input
	          placeholder="输入关键字进行过滤"
	          v-model="filterText">
	        </el-input>
	        <el-tree class="filter-tree"
	                 :data="data0"
	                 :props="defaultProps"
	                 @node-click="handleNodeClick"
	                 :filter-node-method="filterNode"
	                 ref="tree2"></el-tree>
	      </div>
	      <div class="right-side" >
	        <!--<p style="text-align: center; margin: 50px 0 20px">使用 scoped-slot 自定义数据项</p>-->
	        <div>
	          <el-transfer
	            style="text-align: left; display: inline-block"
	            v-model="value4"
	            filterable
	            :left-default-checked="[]"
	            :right-default-checked="[]"
	            :titles="transfTitles"
	            :button-texts="[ '删除','授权']"
	            :format="{noChecked: '${total}', hasChecked: '${checked}/${total}'}"
	            @change="handleChange"
	            :data="data1"
	            v-if="getedAuth"
	          >
	            <span slot-scope="{ option }">{{ option.label }}</span>
	          </el-transfer>
	        </div>
	      </div>
	    </div>

	
	  </div>

	</div>
</template>

<script>
  export default {
    name: "water-authorize",
    props:['appDialog','waterCom'],
    data() {
      return {
        waterCompony:'',
        appDialogVisible:false,
        url: process.env.baseUrl,
        // 添加form表单
        // 表单验证规则
        loading:false,
        getedAuth:true,
        clickedData: {},
        data1: [],
        transfTitles:['组织','已授权'],
        value4: [],
        staffActive:true,
        inputActive:true,
        outsidersData: [],//账单数据
        filterText: '',
        data0:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        activeName2: 'first'
      }
    },

    mounted() {
      this.randerTree();
    },
    methods: {

      // 重置input组件
      reload () {
        this.inputActive = false;
        this.$nextTick(() => (this.inputActive = true))
      },
      // 授权事件
      saveCanteenAuth(params) {
        let _this = this;
        let data = {
            "busicode": "TAuthorizationAdd",
            "data": params,
        };
        this.$api.fetch({
          params: data,//参数
        }).then(res => {
          _this.$message({
            showClose: true,
            message: '添加授权成功！',
            type: 'success'
          });
          _this.handleNodeClick(_this.clickedData);
          _this.staffActive = true;
          this.loading = false;
        }).catch((err)=>{
          // _this.$router.replace({path: '/'})
        })

      },
      // 禁用事件
      delCanteenAuth(params) {
        let _this = this;
        let data = {
            "busicode": "TAuthorizationDelete",
            "data": params,
        };
        this.$api.fetch({
          params: data,//参数
        }).then(res => {
          _this.$message({
            showClose: true,
            message: '删除授权成功！',
            type: 'success'
          });
          _this.handleNodeClick(_this.clickedData);
          _this.staffActive = true;
          this.loading = false;
        })
        // .catch((err)=>{
        //   _this.handleNodeClick(_this.clickedData);
        //   _this.staffActive = true;
        //   this.loading = false;
        // })

      },
      // 穿梭框禁用和授权事件
      handleChange(value, direction, movedKeys) {
        this.getedAuth = false;
        this.loading = false;
        let dealParams = {
          'companyId' : this.waterCom.companyId
        };
        this.staffActive = false;
        if(direction === 'right'){
          dealParams.tAuthorizationBeans = [];
          for(let i in movedKeys) {
            dealParams.tAuthorizationBeans[i] = {};
            for (let j in this.data1) {
              if (movedKeys[i] === this.data1[j].key) {

                if(this.data1[j].type === 1){
                  dealParams.tAuthorizationBeans[i].department = this.data1[j].parentDepart;
                  dealParams.tAuthorizationBeans[i].userName = this.data1[j].info.name;
                  dealParams.tAuthorizationBeans[i].authorizationValue = this.data1[j].info.code;
                  dealParams.tAuthorizationBeans[i].authorizationType = this.data1[j].type;

                }
                else if(this.data1[j].type === 2) {
                  dealParams.tAuthorizationBeans[i].department = this.data1[j].parentDepart;
                  dealParams.tAuthorizationBeans[i].authorizationType = this.data1[j].type;
                  dealParams.tAuthorizationBeans[i].authorizationValue = this.data1[j].info.code;
                  dealParams.tAuthorizationBeans[i].userName = this.data1[j].info.name;
                  // dealParams.tAuthorizationBeans[i].userCode = this.data1[j].info.code;
                }
              }
            }
          }
          this.saveCanteenAuth(dealParams)
        }else if(direction === 'left'){
          dealParams.authorizationValue = [];
          for(let x in movedKeys) {
            for (let y in this.data1) {
              if (movedKeys[x] === this.data1[y].key) {
                dealParams.authorizationValue[x] = this.data1[y].key;
              }
            }
          }
          this.delCanteenAuth(dealParams)
        }
      },


      // 处理树标题的展示
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // tree函数
      handleNodeClick(data) {
        // this.loading=true;
        this.getedAuth = false;
        let _this = this;
        this.data1=[];
        this.value4=[];
        this.clickedData = data;
        this.transfTitles = [data.name,data.name+'已授权'];
        // this.staffActive = false;
        this.getStaff(data.code).then(res=>{
          let d = JSON.parse(res.data.depOfDepartment);
          let s = JSON.parse(res.data.staffOfDepartment);
          _this.data1 = [];
          for (let i = 0; i <  d.length; i++) {
            _this.data1.push({
              key: d[i].id,
              label: d[i].name,
              info: d[i],
              type: 2,
              parentDepart:data.code
            });
          }
          for (let j = 0; j <  s.length; j++) {
            _this.data1.push({
              key: s[j].id,
              label: s[j].name,
              info :s[j],
              type: 1,
              parentId :data.id,
              parentDepart:data.code
            });
          }
          _this.getAutorized({department:data.id,companyCode:this.waterCom.companyId})
        })
      },
      // 获取历史账单表展示条数
      handleSizeChange(val) {
        this.outsidersQuery.pageSize =val
      },
      // 账单页面的页码
      handleCurrentChange(val) {
        this.outsidersQuery.currentPage =val
      },
      // 数组去重
      distinct (arr){
        var i, obj = {}, result = [], len = arr.length;
        for(i = 0; i< arr.length; i++){
          if(!obj[arr[i]]){ //如果能查找到，证明数组元素重复了
            obj[arr[i]] = 1;
            result.push(arr[i]);
          }
        }
        return result;
      },
      //处理总数据
      dealData(data) {
        let parentData = [];
        let parentId = [];
        for(let i of data){
          parentId.push(i.parentId)
        }
        parentId = this.distinct(parentId);

        for(let j of parentId){
          for(let k in data){
            if(data[k].id===j){
              if(typeof data[k].children === 'undefined'){
                data[k].children= []
              }
              parentData.push(data.splice(k,1)[0])
            }
          }
        }
        for(let n in parentData){
          for(var m=0;m<data.length; m++){
            if(parentData[n].id===data[m].parentId){
              parentData[n].children.push(data.splice(m,1)[0]);
              m--
            }
          }
        }
        return parentData
      },
      // 生成组织结构数
      randerTree() {
        this.$axios({
          url:'/dep/json.htm',
          method: 'get',
          params: {id:-1}
        }).then(res =>{
          let data = res.data;
          do{
            data = this.dealData(data);
          }while(data.length>1);
          this.data0 = data;
          this.data0[0].name = '粤海水资源'
        })
      },
      // 获取职员列表
      getStaff(code) {
        return new Promise(resolve => {
          this.$axios({
            url:'/dep/staff.htm',
            method: 'post',
            params:{
              code : code
            },
            headers : {
              "returntype" : "ajax/json"
            },
          }).then(res =>{
            resolve(res.data)
          })
        })
      },
      // 获取授权名单
      getAutorized(params) {
        let _this = this;
        params = {
            "busicode": "TAuthorizationList",
            "data": {
              "department":1
            },
        };
        this.$api.fetch({
          params: params,//参数
        }).then(res => {
          let authorized = res;
          _this.value4 = [];
          if(authorized.length!==null){
            for (let i = 0; i< authorized.length; i++) {
              _this.data1.push({
                key: authorized[i].authorizationValue,
                label: authorized[i].userName,
                info: authorized[i],
              });
              _this.value4.push(
               authorized[i].authorizationValue
              )
            }
          }
          _this.getedAuth = true;
          _this.loading = false;
        })

        // this.$axios({
        //   url:'/TAuthorization/selectTAuthorizationByName.api',
        //   method: 'post',
        //   data: params,
        // }).then(res =>{
        //   let authorized = res.data.data;
        //   _this.value4 = [];
        //   if(authorized.length!==null){
        //     for (let i = 0; i< authorized.length; i++) {
        //       _this.data1.push({
        //         key: authorized[i].authorizationValue,
        //         label: authorized[i].userName,
        //         info: authorized[i],
        //       });
        //       _this.value4.push(
        //        authorized[i].authorizationValue
        //       )
        //     }
        //   }
        //   _this.getedAuth = true;
        //   _this.loading = false;
        // });
      },
      dataInit(companyId){
      	this.$axios({
          url:'/dep/json.htm',
          method: 'get',
          params: {id:-1}
        }).then(res =>{
          let data = res.data;
          do{
            data = this.dealData(data);
          }while(data.length>1);
          this.data0 = data;
          this.data0[0].name = '粤海水资源'
          let _this = this
          this.getStaff(data[0].code).then(res=>{
	          let d = JSON.parse(res.data.depOfDepartment);
	          let s = JSON.parse(res.data.staffOfDepartment);
	          _this.data1 = [];
	          for (let i = 0; i <  d.length; i++) {
	            _this.data1.push({
	              key: d[i].id,
	              label: d[i].name,
	              info: d[i],
	              type: 2,
	              parentDepart:data[0].code
	            });
	          }
	          for (let j = 0; j <  s.length; j++) {
	            _this.data1.push({
	              key: s[j].id,
	              label: s[j].name,
	              info :s[j],
	              type: 1,
	              parentId :data[0].id,
	              parentDepart:data[0].code
	            });
	          }
	          _this.getAutorized({department:data[0].id,companyCode:companyId})
	        })
          
        })
      }
    },
    watch: {
      appDialog() {
        this.appDialogVisible = this.appDialog
      },
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      waterCom(a,b){
      	this.dataInit(a.companyId)
        this.waterCompony = this.waterCom.shortName;
      }
    }

  }
</script>

<style lang="scss">
  @import "../../../assets/styles/scss/base/fn";
  
  .auth-dialog{
    width: 100%;
    height: calc(100% - 40px);
  	.button-group{
	    float: right;
	  }
	  .kl-block{
	    width: 260px;
	    display: inline-block;
	  }
	  .water-authorize{
      height: calc(100% - 10px);
      width: 100%;
	    .tab-title{
        padding: 10px;
        width: 100%;
	    }
	    .auth-box{
	      height: calc(100% - 40px);
	      .left-side{
	        float: left;
          width: calc(25% - 42px);
	        box-sizing: border-box;
          margin: 10px;
          padding:10px;
	        height: calc(100% - 20px);
	        border: 1px solid #ccc;
	        .el-tree{
	          padding-top: 10px;
	          height: calc(100% - 50px);
	          overflow-y: scroll;
	        }
	        // @media (max-width: 1366px){
	        //   &{
	        //     width: calc(25% - 30px);
	        //   }
	        // }
	      }
	      .right-side{
	        float: left;
	        width: calc(75% - 40px);
	        height: calc(100% - 40px);
	        border: 1px solid #ccc;
          margin: 10px;
          padding:10px;
	        // @media (max-width: 1366px){
	        //   &{
	        //     width: calc(75% - 20px);
	        //   }
	        // }
	        &>div{
	          text-align: center;
	          height: 100%;
	          .el-transfer{
	            width: 100%;
	            height: 100%;
	            .el-transfer-panel {
	              height: 100%;
	              width:calc(50% - 62px) ;
	              .el-transfer-panel__body {
	                height: calc(100% - 40px);
	                .el-transfer-panel__list{
	                  height: calc(100% - 65px);
	                }
	              }
	            }
	          }
	        }
	      }
	    }
	  }
  }

</style>
