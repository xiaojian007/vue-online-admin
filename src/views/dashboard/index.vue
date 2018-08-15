<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <!-- 头部流量数字 -->
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <!-- 线性图表 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>
    <el-row>
      <!-- 圆图表 -->
      <el-col :span="8" :xs="24">
        <commodity-chart></commodity-chart>
      </el-col>
      <!-- 柱形表 -->      
      <el-col :span="8" :xs="24">
        <histogram></histogram>
      </el-col>
      <el-col :span="8" :xs="24">
        <cloud-graph></cloud-graph>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import CommodityChart from './components/CommodityChart'
import Histogram from './components/Histogram'
import CloudGraph from './components/CloudGraph'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134],
    actualData: [120, 82, 91, 154]
  },
  messages: {
    expectedData: [200, 192, 120, 144],
    actualData: [180, 160, 151, 106]
  },
  purchases: {
    expectedData: [80, 100, 121, 104],
    actualData: [120, 90, 100, 138]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142],
    actualData: [120, 82, 91, 154]
  }
}
export default {
  name: 'dashboard',
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components: {
    PanelGroup,
    LineChart,
    CommodityChart,
    Histogram,
    CloudGraph
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
