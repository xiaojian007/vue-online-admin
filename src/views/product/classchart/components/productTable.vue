<template>
<div class="table">
  <el-table
    :data="tableCommodity"
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column label="查看" type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称：">
            <span>{{ props.row.imgName }}</span>
          </el-form-item>
          <el-form-item label="商品数量：">
            <span>{{ props.row.weight }}</span>
          </el-form-item>
          <el-form-item label="关 键 字：">
            <span>{{ props.row.keyword }}</span>
          </el-form-item>
          <el-form-item label="内容细节：">
            <span>{{ props.row.abstract }}</span>
          </el-form-item>
          <el-form-item label="图片展示：">
            <img class="showImg" v-for="(item, value, index) in props.row.imgBold" :key="index" :src="item" alt="">
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="产品编号"
      width="100px"
      align="center"
      prop="id">
    </el-table-column>
    <el-table-column
      label="产品简称"
      :show-overflow-tooltip="true"
      align="center"
      prop="abbreviation">
    </el-table-column>
    <el-table-column
      label="原价格"
      align="center"
      :show-overflow-tooltip="true"
      prop="marketPrice">
    </el-table-column>
    <el-table-column
      label="现价格"
      align="center"
      :show-overflow-tooltip="true"
      prop="price">
    </el-table-column>
    <el-table-column
      label="产地"
      align="center"
      :show-overflow-tooltip="true"
      prop="address">
    </el-table-column>
    <el-table-column
      label="加入时间"
      align="center"
      sortable
      width="100px"
      :show-overflow-tooltip="true"
      prop="entryTime">
    </el-table-column>
    <el-table-column label="审核状态" align="center">
      <template slot-scope="scope">
        <span :class="scope.row.state==1 ? 'Success' : 'Info'">{{ scope.row.state==1 ? '开启' : '关闭' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="280px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          :type="scope.row.state==1 ? 'success' : 'info'"
          icon="el-icon-check"
          @click="handleState(scope.$index, scope.row)"
        >状态</el-button>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="handleEdit(scope.$index, scope.row)"
        >编辑</el-button>
        <el-button
          size="mini"
          type="warning"
          icon="el-icon-delete"
          @click="handleDelete(scope.$index, scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</div>
</template>

<script>
  import { getCommodityList } from '@/api/index'

  export default {
    data() {
      return {
        total: 150,
        tableCommodity: []
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      handleState(index, row) {
        console.log(index, row)
      },
      gitList() {
        var _this = this
        const para = {}
        getCommodityList(para).then((res) => {
          console.log(res)
          _this.tableCommodity = res.data.tableCommodity
          _this.total = res.data.total
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      handleSelectionChange(val) {
        console.log(val)
      }
    },
    mounted() {
      this.gitList()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .table .el-table .cell{
    font-size: 22px;
    color: #000;
  }
  .table{
    flex: 1;
    border: 1px solid #ccc;
    margin-left: 10px;
    overflow: auto;
    .demo-table-expand {
      font-size: 0;
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
      label {
        width: 90px;
        color: #99a9bf;
      }
    }
    .showImg{
      width: 150px;
      display: inline-block;
      height: 150px;
      margin-right: 10px;
    }
    .pagination{
      width: 100%;
      margin: 20px 0;
      text-align: right;
    }
    .Success{
      color: #fff;
      display: inline-block;
      padding: 2px 5px;
      background: #87b87f;
      border-radius: 5px;
    }
    .Info{
      color: #fff;
      display: inline-block;
      padding: 2px 5px;
      border-radius: 5px;
      background: #abbac3;
    }
  }
</style>
