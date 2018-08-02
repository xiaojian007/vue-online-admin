<template>
  <div class="user-list" ref="userList" :style="{height:objHeight+'px'}">
    <h4 class="title">管理员分类列表</h4>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
// 获取dom距离底部的高度
import { ObtainBottom } from '@/utils'

export default {
  data() {
    return {
      objHeight: 0,
      data: [{
        label: '超级管理员',
        children: [{
          label: '管理员1'
        }, {
          label: '管理员2'
        }]
      }, {
        label: '商务编辑管理员',
        children: [{
          label: '商务编辑管理员1'
        }, {
          label: '商务编辑管理员2'
        }]
      }, {
        label: '产品编辑管理员',
        children: [{
          label: '产品编辑管理员1'
        }, {
          label: '产品编辑管理员2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    obt() {
      console.log(this.$refs.userList)
      console.log(this.$refs.userList.offsetWidth)
      this.objHeight = ObtainBottom(this.$refs.userList)
    }
  },
  mounted() {
    this.obt()
  },
  beforeDestroy() {
  }
}
</script>

<style lang="scss">
  .user-list .el-tree .el-tree-node .el-tree-node__content{
    height: 40px;
  }
</style>


<style lang="scss" scoped>
  .user-list{
    border-left: 1px solid #CCC;
    border-right:  1px solid #CCC;
    border-top:  1px solid #CCC;
    .title{
      margin: 0;
      background: #62A8D1;
      color: #fff;
      box-sizing: content-box;
      line-height: 38px;
      border-bottom: 1px solid #DDD;
      padding-left: 12px;
    }
    
  }
</style>
