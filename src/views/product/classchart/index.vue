<template>
  <div class="app-container">
    <!-- 搜索查询 -->
    <div class="search-style">
      <div class="title-names">搜索查询</div>
      产品名称：
      <el-input 
        placeholder="请输入内容" 
        v-model="filterText" 
        >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <!-- 新增+删除 -->
    <add-delete v-on:add="addproduct"></add-delete>
    <!-- 列表树状图 -->
    <div class="list">
      <Tree v-show="!addOn" :filterText="filterText"></Tree>
      <add v-show="addOn" v-on:back="back"></add>
      <product-table></product-table>
    </div>
  </div>
</template>

<script>
import Tree from './components/productList'
import productTable from './components/productTable'
import addDelete from './components/adddelete'
import add from './components/add'

export default {
  components: { Tree, addDelete, add, productTable },
  watch: {
    filterText(val) {
      console.log(val)
      this.filterText = val
    }
  },

  methods: {
    addproduct(childValue) {
      this.addOn = childValue
    },
    back(childValue) {
      this.addOn = childValue
    }
  },

  data() {
    return {
      filterText: '',
      addOn: false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  .search-style{
    border: 1px solid #ddd;
    padding: 30px 20px;
    position: relative;
    margin-top: 20px;
    .title-names{
      position: absolute;
      top: -20px;
      font-size: 18px;
      background-color: #ffffff;
      padding: 5px 20px;
      left: 10px;
    }
    .el-input--prefix{
      width: 300px;
    }
  }
  .list{
    display: flex;
  }
}
</style>