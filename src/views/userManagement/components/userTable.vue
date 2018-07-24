<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="type"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="手机号"
        width="220">
      </el-table-column>
      <el-table-column
        align="center"
        prop="contacts"
        label="用户名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="number"
        label="密码">
      </el-table-column>
      <el-table-column
        align="center"
        prop="state"
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="contacts"
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [{
        type: '111',
        name: '姓名',
        contacts: '黄晓明',
        number: '021-65221564',
        state: 1
      }, {
        type: '协议',
        name: '吴江市新宏业电器有限公司',
        contacts: '黄晓明',
        number: '021-65221564',
        state: 1
      }, {
        type: '合同',
        name: '吴江市新宏业电器有限公司',
        contacts: '黄晓明',
        number: '021-65221564',
        state: 1
      }, {
        type: '合同',
        name: '吴江市新宏业电器有限公司',
        contacts: '黄晓明',
        number: '021-65221564',
        state: 1
      }]
    }
  },
  filters: {

  }
}
</script>
