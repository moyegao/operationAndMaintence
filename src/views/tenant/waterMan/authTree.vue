<template>
  <div class="auth-tree">
    <div class="top">
      <h2>组织结构树</h2>
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree class="filter-tree department"
       :data="data"
       :props="defaultProps"
       @node-click="handleNodeClick"
       :filter-node-method="filterNode"
       ref="tree2">
      </el-tree>
    </div>

    <div class="bottom">
      <h2>{{department}}</h2>
      <el-tree
        :data="data2"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps2">
      </el-tree>
    </div>
    <div class="buttons">
        <el-button size="small" type="primary" @click="getCheckedNodes">添加</el-button>
        <el-button size="small" type="info" plain @click="resetChecked">退出</el-button>
    </div>

  </div>

</template>

<script>
	  import axios from 'axios'
    export default {
      name: "auth-tree",
      data(){
        return {
          filterText:'',
          data:[],
          defaultProps: {
            children: 'children',
            label: 'shortname'
          },
          data2: [],
          defaultProps2: {
            children: 'children',
            label: 'name'
          },
          department:'组织人员'
        }
      },
      mounted() {
        this.randerTree()
      },
      methods: {
        // 处理树标题的展示
        filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        // tree函数点击事件
        handleNodeClick(data) {
          this.department = data.name;
          let _this = this;
          // this.getStaff(data.code).then(res=>{
          //   _this.data2 = JSON.parse(res.data.staffOfDepartment)
          // })
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
        // 	axios({
				// 	    method: 'post',
				// 	    url:'/dep/json.htm',
				// 	    params: {
				// 	        id : -1
				// 	    },
				// 	    headers : {
	      //         "returntype" : "ajax/json"
	      //       },
				// 	}).then((res)=>{
				// 		let data = res.data
        //     do{
        //       data = this.dealData(data)
        //     }while(data.length>1)
        //     data[0].children.push(data[0].children.splice(0,1)[0])
        //     this.data = data[0].children
				// })
        },
        // 获取职员列表
        getStaff(code) {
          // return new Promise(resolve => {
          // 	axios({
					//     method: 'post',
					//     url:'/dep/staff.htm',
					//     params:{
          //       code : code
          //     },
          //     headers : {
          //       "returntype" : "ajax/json"
          //     },
					// 	}).then(res =>{
          //     resolve(res.data);
          //   });
          // })
        },


        getCheckedNodes() {
          this.$refs.tree.getCheckedNodes()
          this.$emit('treeClick',this.$refs.tree.getCheckedNodes())
          this.$refs.tree.setCheckedKeys([])
//        this.resetChecked()
        },
        getCheckedKeys() {
//        console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedNodes() {
          this.$refs.tree.setCheckedNodes([{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 9,
            label: '三级 1-1-1'
          }]);
        },
        setCheckedKeys() {
          this.$refs.tree.setCheckedKeys([3]);
        },
        resetChecked() {
          this.$refs.tree.setCheckedKeys([]);
          if(this.$parent.activeBlur){
            this.$parent.activeBlur()
          }
          if(this.$parent.showTreeClick){
            this.$parent.showTreeClick()
          }
        }
      },
      watch: {
        filterText(val) {
          this.$refs.tree2.filter(val)
        }
      }
    }
</script>

<style lang="scss" scoped>
  .auth-tree{
    background: #fff;
    h2{
      padding: 0;
      margin: 0;
      background: #3193f5;
      color: #fff;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
    }

    height: 100%;
    .top{
      height: calc(50% - 25px);
      .el-tree{
        height: calc(100% - 80px);
        overflow-y: scroll;
      }
    }
    .bottom{
      height: calc(50% - 25px);
      .el-tree{
        height: calc(100% - 40px);
        overflow-y: scroll;
      }
    }
    .buttons{
      padding: 5px;
      text-align: center;
    }
  }
</style>
