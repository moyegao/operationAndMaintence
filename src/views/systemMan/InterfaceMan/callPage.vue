<template>
    <div class="callPage">
        <el-card class="box-card">
            <div v-for="(item,index) in callPageData" :key="index"  class="text item">
                {{item.pageAddr }}
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name:"callPage",
    data(){
        return{
            callPageData:[]
        }
    },
    mounted(){
    },
    methods: {
      // 表格选择框选中事件
      selPageToServices(val) {
        let _this = this;
        let params = {
            "busicode": "ServicePageLogList",
            "data": {
                "serviceCode":val
            },
        };
        this.$api.fetch({
        params: params,//参数
        }).then(res => {
            _this.callPageData = res.list;

        })
      }
    }
}
</script>
<style lang="scss">
.callPage{
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
}
</style>
