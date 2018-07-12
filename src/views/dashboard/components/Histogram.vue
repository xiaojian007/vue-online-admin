<template>
  <div class="Histogram">
    <div id="myChart" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default{
    name: 'Histogram',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '本周销售排行榜',
            x: 'center'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
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