<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="type"
        label="企业类型"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="企业名称"
        width="220">
      </el-table-column>
      <el-table-column
        align="center"
        prop="contacts"
        label="联系人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="number"
        label="联系号码">
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
import { getList } from '@/api/table'

export default {
  data() {
    return {
      tableData: [{
        type: '协议',
        name: '吴江市新宏业电器有限公司',
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

  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
