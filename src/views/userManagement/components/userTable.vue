<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="phoneNumber"
        label="手机号"
        width="220">
      </el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        align="center"
        prop="position"
        label="职位">
      </el-table-column>
      <el-table-column
        align="center"
        prop="state"
        label="操作">
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [{
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }, {
        phoneNumber: '15655223654',
        name: '李健',
        userName: 'lijian6',
        password: '123456',
        position: '前端工程师',
        state: 1
      }]
    }
  },
  filters: {

  }
}
</script>

<style lang="scss" scoped>
  .pages{
    padding: 20px 10px 20px 0;
    float: right;
  }
</style>

