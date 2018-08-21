<template>
  <div class="user-list" ref="userList" :style="{height:objHeight+'px'}">
    <h4 class="title" @click="obt()">管理员分类列表</h4>
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
        id: 1,
        label: '超级管理员'
      }, {
        id: 2,
        label: '华东组'
      }, {
        id: 3,
        label: '华北组'
      }, {
        id: 4,
        label: '华南组'
      }, {
        id: 5,
        label: '电商组'
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
      // console.log(this.$refs.userList.getBoundingClientRect().top)
      this.objHeight = ObtainBottom(this.$refs.userList)
    }
  },
  mounted() {
    var _this = this
    this.$nextTick(() => {
      _this.obt()
    })
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
