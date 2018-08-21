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
        <!-- <el-select v-model="status" placeholder="进度">
          <el-option
            v-for="item in statuss"
            :key="item.status"
            :label="item.label"
            :value="item.status">
          </el-option>
        </el-select> -->
        <!-- 时间搜索 -->
        <el-date-picker v-model="times" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="项目开始" end-placeholder="项目结束" :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
        <span class="right">共计：{{totalNub}}个工单</span>
      </div>
    </div>
    <div class="contents">
      <el-table :data="dataList" style="width: 100%">
        <el-table-column align="center" width="100" label="负责人" prop="charge">
        </el-table-column>
        <el-table-column align="center" width="200" label="工单名称" prop="name">
        </el-table-column>
        <el-table-column align="center" label="开始时间" prop="time[0]">
        </el-table-column>
        <el-table-column align="center" width="150" label="完成时间" sortable prop="time[1]">
        </el-table-column>
        <el-table-column
          prop="importance"
          label="加急性"
          width="100"
          :filters="[{ text: '加急', value: '加急' }, { text: '一般', value: '一般' },  { text: '修改', value: '修改' }]"
          :filter-method="filterImportance"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="aboutImportance(scope.row.importance)"
              disable-transitions>{{scope.row.importance}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="对接人" prop="butt">
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip width="200" label="工单要求" prop="requirement">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag
              :type="statusImportance(scope.row.status)"
              disable-transitions>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="180" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
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
    <!-- 修改 -->
    <el-dialog title="项目修改" :visible.sync="dialogPvVisible" @close='closeDialog'>
      <modify-work :dataList="dynamicValidateForm"></modify-work>
    </el-dialog>
  </div>
</template>

<script>
import ModifyWork from '@/components/Modifyworklist'

export default {
  components: {
    ModifyWork
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogPvVisible: false,
      pageSize: 10,
      total: 100,
      totalNub: 1000,
      listName: '',
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
      dynamicValidateForm: {
        partner: [{
          name: '',
          requirement: '',
          project: '',
          butt: '',
          progress: '',
          time: []
        }],
        id: '',
        time: [],
        name: '',
        charge: '',
        requirement: '',
        butt: '',
        status: '',
        importance: ''
      },
      dataList: [{
        id: '12987122',
        time: ['2018-04-05', '2018-04-05'],
        name: '厂商-宝马新单-制作',
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '修改',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987123',
        time: ['2018-04-05', '2018-04-05'],
        name: '厂商-宝马新单-制作',
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '一般',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987125',
        time: ['2018-04-05', '2018-04-05'],
        name: '厂商-宝马新单-制作',
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '修改',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987126',
        time: ['2018-04-05', '2018-04-05'],
        name: '厂商-宝马新单-制作',
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '加急',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987126',
        time: ['2018-04-05', '2018-04-05'],
        name: '厂商-宝马新单-制作',
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '加急',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987126',
        time: ['2018-04-05', '2018-04-05'],
        name: '厂商-宝马新单-制作',
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '加急',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        time: ['2018-04-05', '2018-04-05'],
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '已完成',
        importance: '加急',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987126',
        name: '厂商-宝马新单-制作',
        time: ['2018-04-05', '2018-04-05'],
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '设计中',
        importance: '加急',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987126',
        time: ['2018-04-05', '2018-04-05'],
        name: '厂商-宝马新单-制作',
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '确认中',
        importance: '加急',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }, {
        id: '12987126',
        time: ['2018-04-05', '2018-04-05'],
        name: '厂商-宝马新单-制作',
        charge: '李健',
        groups: '电商组',
        requirement: '需要做出动画效果，突显宝马的车子',
        butt: '小李',
        status: '未完成',
        importance: '加急',
        partner: [{
          name: '周六',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '王五',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '张三',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }, {
          name: '李四',
          requirement: '周五下班前完成，需要做****',
          project: 'XXX项目',
          butt: '小明',
          progress: '已完成三分之二的任务量，周四下班前可以完成',
          time: ['2018-05-05', '2018-06-05']
        }]
      }],
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
      times: '',
      Executor: ''
    }
  },
  methods: {
    // 编辑更新
    handleUpdate(index, row) {
      console.log(index, row)
      this.dynamicValidateForm = row
      this.dialogPvVisible = true
      this.total = 50
    },
    // 删除
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 分页切换
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 加急性选择筛选
    filterImportance(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 对加急性过滤
    aboutImportance(val) {
      if (val === '加急') {
        return 'danger'
      } else if (val === '未完成') {
        return 'primary'
      } else {
        return 'info'
      }
    },
    // 对状态过滤
    statusImportance(val) {
      if (val === '已完成') {
        return 'success'
      } else if (val === '未完成') {
        return 'danger'
      } else if (val === '设计中') {
        return 'info'
      } else {
        return 'primary'
      }
    },
    // 关闭弹出
    closeDialog() {
    }
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.demo-input-suffix{
  .el-input {
    width: 150px;
  }
}
.el-dialog{
  width: 70%;
  .demo-dynamic::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .demo-dynamic::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  .demo-dynamic::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
  }
  .demo-dynamic{
    height: 600px;
    overflow: auto;
    .el-input{
      width: 95.6%;
    }
    .status{
      width: 25%;
      display: inline-block;
    }
    .time{
      width: 37%;
      display: inline-block;
      .el-date-editor{
        width: 90%;
      }
    }
    .el-form-contents{
      .el-input{
        width: 22%;
        margin: 0 20px 10px 0;
      }
      .el-date-editor{
          width: 46.5%;
        }
      .el-button--danger{
        margin-left: 20px;
        height: 40px;
      }
      .progress{
        margin-top: 10px;
        width: 95.6%;
      }
    }
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
        margin-left: 20px;
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
