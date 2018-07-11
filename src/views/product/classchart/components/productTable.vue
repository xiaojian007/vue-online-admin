<template>
<div class="table">
  <el-table
    :data="tableCommodity"
    style="width: 100%">
    <el-table-column type="expand">
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
            <img class="showImg" v-for="(item, value) in props.row.imgBold" :src="item" alt="">
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
      :show-overflow-tooltip="true"
      prop="entryTime">
    </el-table-column>
    <el-table-column
      label="审核状态"
      align="center"
      sortable
      prop="state">
    </el-table-column>
    <el-table-column 
      label="操作"
      align="center"
      width="280px"      
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
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
        tableCommodity: [{
          id: '12987122',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987123',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987125',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987126',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987126',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987126',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987126',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987126',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987126',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }, {
          id: '12987126',
          imgName: '巧乐兹巧乐兹巧乐大闯关游戏',
          abbreviation: '巧乐兹',
          keyword: '小霞姐小香蕉行加哦',
          weight: '105',
          price: '55.5元',
          marketPrice: '66.5元',
          address: '云南大理',
          entryTime: '2017-8-15',
          state: '通过',
          imgBold: ['http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg', 'http://www.bitauto.com/topics/ad_topic/xtlcx/images/edit/01.jpg'],
          abstract: '啵啵啵啵啵啵不恶口教我减肥人口为热裤我'
        }]
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
  }
</style>
