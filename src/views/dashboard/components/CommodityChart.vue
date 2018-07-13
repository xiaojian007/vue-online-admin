<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'

export default {
  name: 'CommodityChart',
  props: {
    className: {
      type: String,
      default: 'myChart'
    },
    width: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '400px'
    }
  },
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
    initCharts() {
      this.myChart = echarts.init(this.$el)
      this.setOptions()
    },
    setOptions(id) {
      this.myChart.setOption({
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
            radius: '65%',
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
    this.initCharts()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.myChart) {
          this.myChart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }
    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  }
}
</script>

<style lang="scss" scoped>

</style>
