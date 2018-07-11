<template>
  <div class="product-list">
    <h3 class="type">选择产品类型</h3>
    <el-tree 
      class="filter-tree" 
      :data="productList" 
      :props="defaultProps" 
      default-expand-all 
      :filter-node-method="filterNode" 
      ref="tree2"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    filterText: String
  },

  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      console.log(value)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('蔬菜水果') === -1
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '台式机') {
        return type !== 'inner'
      } else {
        return true
      }
    }
  },

  data() {
    return {
      productList: [{
        id: 1,
        label: '商城分类列表',
        children: [{
          id: 2,
          label: '蔬菜水果',
          children: [{
            id: 6,
            label: '蔬菜'
          }, {
            id: 7,
            label: '苹果'
          }, {
            id: 8,
            label: '大蒜'
          }, {
            id: 9,
            label: '白菜'
          }, {
            id: 10,
            label: '青菜'
          }]
        }, {
          id: 3,
          label: '手机数码',
          children: [{
            id: 11,
            label: '手机'
          }, {
            id: 12,
            label: '照相机'
          }]
        }, {
          id: 4,
          label: '电脑配件',
          children: [{
            id: 13,
            label: '手机'
          }, {
            id: 14,
            label: '笔记本电脑'
          }, {
            id: 15,
            label: '台式机'
          }, {
            id: 16,
            label: 'iPad'
          }]
        }, {
          id: 5,
          label: '服装鞋帽',
          children: [{
            id: 17,
            label: '手机'
          }, {
            id: 18,
            label: '照相机'
          }]
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .product-list{
    border: 1px solid #ccc;
    width: 220px;
    float: left;
    .type{
      line-height: 36px;
      height: 36px;
      margin: 0;
      background: #62A8D1;
      font-size: 18px;
      color: #fff;
      padding-left: 5px;
    }
  }
</style>
