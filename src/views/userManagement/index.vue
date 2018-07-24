<template>
  <div class="user-container">
    <!-- 搜索查询 -->
    <div class="search-style">
      <div class="title-names">查找用户</div>
      请输入用户名：
      <el-autocomplete
        class="inline-input"
        v-model="username"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
    <div class="search-table">
      <el-row>
        <el-col :span="5" :xs="24">
          <user-list></user-list>
        </el-col>
        <el-col :span="19" :xs="24">
          <user-table></user-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import userTable from './components/userTable'
import userList from './components/userList'

export default {
  data() {
    return {
      tableData: [],
      restaurants: [],
      username: ''
    }
  },
  components: {
    userTable,
    userList
  },
  methods: {
    // input输入框下拉查询开始
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）' },
        { 'value': '新旺角茶餐厅' },
        { 'value': '泷千家(天山西路店)' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    }
    // input输入框下拉查询结束
  },
  filters: {

  },
  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>

<style lang="scss" scoped>
.user-container{
  padding: 20px;
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
  .search-table{
    width: 100%;
  }
}
</style>
