<template>
  <div class="CommodityChart">
    <div id="main" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'CommodityChart',
  data() {
    return {
      charts: '',
      opinion: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      opinionData: [{
        value: 335,
        name: '直接访问'
      }, {
        value: 310,
        name: '邮件营销'
      }, {
        value: 234,
        name: '联盟广告'
      }, {
        value: 135,
        name: '视频广告'
      }, {
        value: 1548,
        name: '搜索引擎'
      }]
    }
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          text: '访问方式',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.opinion
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '70%',
            avoidLabelOverlap: false,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: this.opinionData
          }
        ]
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPie('main')
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
