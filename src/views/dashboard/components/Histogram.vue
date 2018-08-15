<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'
  export default {
    name: 'Histogram',
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
        myChart: null
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
    },
    beforeDestroy() {
      if (!this.myChart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)
      this.myChart.dispose()
      this.myChart = null
    },
    methods: {
      initCharts() {
        this.myChart = echarts.init(this.$el)
        this.setOptions()
      },
      setOptions() {
        this.myChart.setOption({
          title: {
            text: '本周工单排行榜',
            x: 'center'
          },
          tooltip: {},
          xAxis: {
            data: ['张三', '李四', '王五', '周六', '小七', '陈八']
          },
          yAxis: {},
          series: [{
            name: '工单量',
            type: 'bar',
            data: [500, 200, 100, 90, 70, 20]
          }]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>