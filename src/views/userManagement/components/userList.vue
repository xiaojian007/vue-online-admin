<template>
  <div class="user-list">
    <h4 class="title">管理员分类列表</h4>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        label: '超级管理员',
        children: [{
          label: '管理员1'
        }, {
          label: '管理员2'
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1'
        }, {
          label: '二级 2-2'
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1'
        }, {
          label: '二级 3-2'
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-list .el-tree-node__content{
    padding: 10px 0;
  }
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
