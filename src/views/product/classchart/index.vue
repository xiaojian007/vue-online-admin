<template>
  <div class="app-container">
    <!-- 搜索查询 -->
    <div class="search-style">
      <div class="title-names">搜索查询</div>
      产品名称：
      <!-- <el-input 
        placeholder="请输入内容" 
        v-model="filterText">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input> -->
      <el-autocomplete
        v-model="filterText"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
    <!-- 新增+删除 -->
    <add-delete v-show="!addOn" v-on:add="addproduct"></add-delete>
    <!-- 列表树状图 -->
    <div class="list">
      <!-- <Tree v-show="!addOn" :filterText="filterText"></Tree> -->
      <add v-show="addOn" v-on:back="back" :modifyData="modifyData"></add>
      <product-table v-show="!addOn" v-on:modify="modify" :filterText="filterText"></product-table>
    </div>
  </div>
</template>

<script>
// 组件
import Tree from './components/productList'
import productTable from './components/productTable'
import addDelete from './components/adddelete'
import add from './components/add'
// function
import { getLabelList } from '@/api/index'

export default {
  components: { Tree, addDelete, add, productTable },
  watch: {
    filterText(val) {
      this.filterText = val
    }
  },

  methods: {
    modify(row) {
      console.log(row)
      this.addOn = true
    },
    // 新增
    addproduct(childValue) {
      this.addOn = childValue
    },
    // 返回
    back(childValue) {
      this.addOn = childValue
    },
    // input输入框下拉查询开始
    loadAll() {
      var _this = this
      getLabelList().then((res) => {
        _this.restaurants = res.data.label
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    }
    // input输入框下拉查询结束
  },
  mounted() {
    this.loadAll()
  },

  data() {
    return {
      filterText: '',
      addOn: false,
      restaurants: [],
      timeout: null,
      modifyData: ''
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