
<template>
    <div class="waterOperation">

         <div class="backfillSubmitForm">
        <el-form  :inline="true" class=" " size="mini" :model="waterOperationForm"  label-width="150px" ref="ruleForm" :rules="rules">
            <el-tree
                :data="waterOperationForm.treeData"
                show-checkbox
                node-key="id"
                default-expand-all
                highlight-current
                :expand-on-click-node=false
                :check-on-click-node=true
                :check-strictly=true
                :props="waterOperationForm.defaultProps">
                <!-- TODO ***父级节点被点击取消时，要可以自动选择取消所有他的子节点，但是子节点被取消时不可以取消父节点*** -->
                </el-tree>
        </el-form>
        </div>

    </div>
</template>
<script>
export default {
    name:"waterOperation",
    components:{
    },
    data(){
        return{
            waterOperationForm:{
                treeData: [{
                    id: 1,
                    label: '首页',
                    children: []
                    },
                    {
                    id: 1,
                    label: '工作台',
                    children: []
                    }, {
                    id: 2,
                    label: '流程审批',
                    children: [{
                            id: 5,
                            label: '待审'
                        }, {
                            id: 6,
                            label: '已审'
                        }, {
                            id: 6,
                            label: '所有'
                        }, {
                            id: 6,
                            label: '我的申请'
                        }
                    ]
                    }, {
                    id: 3,
                    label: '业务管理',
                    children: [{
                            id: 7,
                            label: '工程管理',
                            children: [{
                                    id: 7,
                                    label: '用户工程',
                                    children: [{
                                            id: 7,
                                            label: '用水咨询',
                                            children: [{
                                                    id: 7,
                                                    label: '添加',
                                                },{
                                                    id: 7,
                                                    label: '修改',
                                                }
                                            ]
                                        },{
                                            id: 7,
                                            label: '用水安装',
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            },
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){

        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        

    }
}
</script>
<style lang="scss">
.waterOperation{
    
    height: 100%;
    width: 100%;
    margin: 0 auto;
    overflow-y:scroll;
    legend{
      background: #f5f5f5;
      font-weight: 700;
      font-size: 12px;
      padding: 5px 20px;
      font-size: 14px;
      margin-bottom: 5px;
      i{
        float:right;
        margin-top: 5px;
        cursor: pointer;
      }
  }
    fieldset .el-form-item {
        width:90% !important;
    }
    .basicInfoForm{
        margin: 10px 0px;
    }

    .backfillSubmitForm{
        // padding: 10px 20px;
        // width: 83%;
        // margin:10px auto;
        // .el-form-item{
        //     width: 100%;
        //     .el-form-item__content{
        //         width: 30%;
        //         .el-select{
        //             width: 100%;
        //         }
        //     }
        // }
        // .right-btn{
        //     text-align: right;
        //     width: 100%;
        // }
        .userAdress{
            width:100%;
            .el-form-item__content{
                width:calc(100% - 160px);
                .el-form-item__label{
                    width: 100px !important;
                }

            }
        }
        .selectClass{
            width:36.5% !important; 
        }

        .Btngroup{
            width: 100%;
            .el-form-item__content{
                width:calc(100% - 160px);
            }
        }
        .el-form-item{
            width: 60%;
            margin-top:20px;
            .el-form-item__content{
                width:calc(100% - 150px)
            }
            input{
                width:100%;
            }
        }
        .fixCheckbox{
            .el-checkbox{
                width:60px;
            }
        }
    }
    .el-steps--horizontal{
        margin: 0 auto;
        width: 50%;
        padding-bottom: 20px;
    }
    #editor{
        border:1px solid var(--ck-color-toolbar-border);
        height: 200px;
    }

}
</style>

