<template>
<div class="table">
  <el-table
    :data="tableCommodity"
    v-loading="loading"
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
        <span :class="scope.row.state==1 ? 'Success' : 'Info'">{{ scope.row.state==1 ? '已审核' : '未审核' }}</span>
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
        filters: {
          name: ''
        },
        loading: true,
        pagenub: 1,
        count: 10,
        total: 39,
        tableCommodity: []
      }
    },
    methods: {
      handleEdit(index, row) {
        // console.log(index, row)
        this.$emit('modify', row) // 向父级传递事件
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      handleState(index, row) {
        // console.log(index, row)
        if (this.tableCommodity[index].state === 1) {
          this.tableCommodity[index].state = 2
        } else {
          this.tableCommodity[index].state = 1
        }
      },
      gitList() {
        var _this = this
        const params = {
          pagenub: _this.pagenub,
          name: _this.filters.name
        }
        _this.loading = true // 打开加载图
        getCommodityList(params).then((res) => {
          // js处理mock模拟数据开始
          const _Users = res.data.tableCommodity
          const counts = _this.count // 一页展示多少条
          const { pagenub, name } = params // 获取第几页和名字过滤
          var tableList = _Users.filter(user => {
            if (name && user.abbreviation.indexOf(name) === -1) return false
            return true
          }) // 通过过滤把数据符合要求的 return 出来
          const total = tableList.length
          tableList = tableList.filter((u, index) => index < counts * pagenub && index >= counts * (pagenub - 1))
          // js处理mock模拟数据结束
          _this.tableCommodity = tableList
          _this.total = total
          _this.loading = false // 打开加载图
        })
      },
      handleCurrentChange(val) {
        this.pagenub = val
        this.gitList()
      },
      handleSelectionChange(val) {
        console.log(val)
      }
    },
    mounted() {
      this.gitList()
    },
    props: {
      filterText: String
    },
    watch: {
      filterText(val) {
        this.filters.name = val
        this.gitList()
      }
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
    overflow: auto;
    .el-table::before{
      background: #ccc;
    }
    .el-table{
      min-height: 600px;
        .demo-table-expand {
        font-size: 0;
        .el-form-item {
          margin-right: 0;
          margin-bottom: 0;
          width: 50%;
        }
        .el-form-item:last-child{
          width: 100%;
        }
        label {
          width: 90px;
          color: #99a9bf;
        }
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
