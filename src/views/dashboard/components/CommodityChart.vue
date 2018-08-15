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
      opinion: ['AE', 'C4D', '插画', '插件', '教程'],
      opinionData: [{
        value: 335,
        name: 'AE'
      }, {
        value: 310,
        name: 'C4D'
      }, {
        value: 234,
        name: '插画'
      }, {
        value: 135,
        name: '插件'
      }, {
        value: 1548,
        name: '教程'
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
          text: '素材库',
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
            name: '占比率',
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
    // const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    // sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  }
}
</script>

<style lang="scss" scoped>

</style>
