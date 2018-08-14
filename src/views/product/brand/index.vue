<template>
  <div class="app-container">
    <!-- 搜索查询 -->
    <div class="search-style">
      <div class="title-names">搜索查询</div>
      <div class="demo-input-suffix">
        <el-input placeholder="项目名称" v-model="listName">
        </el-input>
        <el-input placeholder="负责人" v-model="Executor">
        </el-input>
        <el-select v-model="importance" placeholder="重要性">
          <el-option
            v-for="item in importances"
            :key="item.importance"
            :label="item.label"
            :value="item.importance">
          </el-option>
        </el-select>
        <el-select v-model="status" placeholder="进度">
          <el-option
            v-for="item in statuss"
            :key="item.status"
            :label="item.label"
            :value="item.status">
          </el-option>
        </el-select>
        <el-date-picker v-model="times" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="项目开始" end-placeholder="项目结束" :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit">添加</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
        <span class="right">共计：{{totalNub}}个工单</span>
      </div>
    </div>
    <div class="contents">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="partners" v-for="(item, index) in props.row.partner" :key="index">
              <div class="partner-wrapper">
                <label class="partner">项目名称</label>
                <span class="content">{{item.project}}</span>
              </div>
              <div class="partner-wrapper">
                <label class="partner">负责人</label>
                <span class="content">{{item.name}}</span>
              </div>
              <div class="partner-wrapper">
                <label class="partner">备注</label>
                <span class="content">{{item.requirement}}</span>
              </div>
              <div class="partner-wrapper">
                <label class="partner">进度</label>
                <span class="content">{{item.progress}}</span>
              </div>
              <div class="partner-wrapper">
                <label class="partner">对接人</label>
                <span class="content">{{item.butt}}</span>
              </div>
              <div class="partner-wrapper">
                <label class="partner">开始时间</label>
                <span class="content">{{item.startTime}}</span>
              </div>
              <div class="partner-wrapper">
                <label class="partner">完成时间</label>
                <span class="content">{{item.endTime}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总负责人" prop="charge">
        </el-table-column>
        <el-table-column align="center" width="200" label="工单名称" prop="name">
        </el-table-column>
        <el-table-column align="center" label="开始时间" prop="startTime">
        </el-table-column>
        <el-table-column align="center" label="完成时间" prop="endTime">
        </el-table-column>
        <el-table-column align="center" label="重要性" prop="importance">
        </el-table-column>
        <el-table-column align="center" label="对接人" prop="butt">
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip width="200" label="工单要求" prop="requirement">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="status">
        </el-table-column>
        <el-table-column align="center" width="180" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginations">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 10,
      total: 100,
      totalNub: 1000,
      listName: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      importance: '',
      importances: [{
        value: '选项1',
        importance: '加急'
      }, {
        value: '选项2',
        importance: '一般'
      }, {
        value: '选项3',
        importance: '修改'
      }],
      status: '',
      statuss: [{
        value: '选项1',
        status: '完成'
      }, {
        value: '选项2',
        status: '未完成'
      }, {
        value: '选项3',
        status: '设计中'
      }, {
        value: '选项3',
        status: '确认中'
      }],
      dataList: [{
        id: '12987122',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        startTime: '2018-04-05',
        endTime: '2018-04-30',
        charge: '李健',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '重要',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          startTime: '2018-04-06',
          endTime: '2018-04-09'
        }],
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      times: '',
      Executor: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.demo-input-suffix{
  .el-input {
    width: 150px;
  }
}
.demo-input-suffix>div{
  margin-right: 10px;
}
.partners{
  width: 50%;
  float: left;
  border-bottom: 1px solid #ccc;
  .partner-wrapper{
    width: 100%;
    margin: 15px 0;
    display: flex;
    .partner{
      width: 90px;
      text-align: left;
      color: #99a9bf;
    }
    .content{
      flex: 1;
    }
  }
}
</style>



<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .search-style {
    border: 1px solid #ddd;
    padding: 30px 20px;
    position: relative;
    margin-top: 20px;
    .title-names {
      position: absolute;
      top: -20px;
      font-size: 18px;
      background-color: #ffffff;
      padding: 5px 20px;
      left: 10px;
    }
    .demo-input-suffix {
      .right {
        float: right;
        color: #f00;
        line-height: 40px;
      }
    }
  }
  .contents{
    border: 1px solid #ccc;
    margin-top: 30px;
    overflow: auto;
    .paginations{
      padding: 20px 10px 20px 0;
      float: right;
    }
  }
}
</style>
