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
        label: '超级管理员',
        children: [{
          id: 5,
          label: '小贱1'
        }, {
          id: 6,
          label: '小贱2'
        }]
      }, {
        id: 2,
        label: '华东组',
        children: [{
          id: 7,
          label: '陈云花'
        }, {
          id: 7,
          label: '贾瑞'
        }, {
          id: 7,
          label: '李昌隆'
        }, {
          id: 7,
          label: '李健'
        }, {
          id: 7,
          label: '刘虎'
        }, {
          id: 7,
          label: '王海龙'
        }, {
          id: 7,
          label: '王娟'
        }, {
          id: 7,
          label: '杨文豪'
        }, {
          id: 7,
          label: '叶登'
        }, {
          id: 7,
          label: '周文涛'
        }]
      }, {
        id: 3,
        label: '华北组',
        children: [{
          label: '陈璐'
        }, {
          label: '陈明辉'
        }, {
          label: '韩晓微'
        }, {
          label: '刘传征'
        }, {
          label: '刘家利'
        }, {
          label: '马洁萌'
        }, {
          label: '王蒙蒙'
        }, {
          label: '王艳'
        }, {
          label: '姚晟晨'
        }]
      }, {
        id: 4,
        label: '华南组',
        children: [{
          label: '蔡耿真'
        }, {
          label: '黄宝儿'
        }, {
          label: '赖光耀'
        }, {
          label: '梁瑞洁'
        }, {
          label: '李玲'
        }, {
          label: '林晓添'
        }, {
          label: '刘付龙晖'
        }]
      }, {
        id: 5,
        label: '电商组',
        children: [{
          label: '樊搏'
        }, {
          label: '高嘉树'
        }, {
          label: '韩群'
        }, {
          label: '郝奕'
        }, {
          label: '刘梦岩'
        }, {
          label: '李卫'
        }, {
          label: '杨亚男'
        }, {
          label: '袁巧'
        }, {
          label: '张淼'
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
