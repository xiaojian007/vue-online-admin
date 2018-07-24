<template>
  <div class="user-list">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      class="filter-tree"
      show-checkbox
      :data="userList"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="userList">
    </el-tree>
  </div>
</template>

<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.userList.filter(val)
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    },

    data() {
      return {
        filterText: '',
        userList: [{
          id: 1,
          label: '超级管理员',
          children: [{
            id: 4,
            label: '小贱'
          }]
        }, {
          id: 2,
          label: '文章上传组',
          children: [{
            id: 5,
            label: '小李'
          }, {
            id: 6,
            label: '小王'
          }]
        }, {
          id: 3,
          label: '视频上传部',
          children: [{
            id: 7,
            label: '小孙'
          }, {
            id: 8,
            label: '小周'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
