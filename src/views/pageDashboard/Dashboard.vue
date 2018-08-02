<template>
    <div>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dashboard' }">数据统计</el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="hover">
          <div id="cs-dashboard-main"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      option: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['帖子', '回帖', '评论', '点赞'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [],
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    request () {
      this.loading = true
      let param = {
        module: 'admin',
        action: 'dashboard',
        func: 'doQueryCount'
      }
      this.$axios
        .get('index.php', {
          params: param
        })
        .then(res => {
          let data = res.data
          if (data.retCode === 0) {
            console.log(this.option)
            this.option.series[0].data = [data.data.threadCount, data.data.postCount, data.data.commentCount, data.data.thumbCount]
            let myChart = echarts.init(document.getElementById('cs-dashboard-main'))
            myChart.setOption(this.option)
          } else {
            this.$message.error(data.retCode > 0 ? data.retInfo : '操作失败')
          }
        })
        .catch(() => {
          this.$message.error('error!请联系georgehuang')
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    this.request()
  }
}
</script>

<style lang="less">
#cs-dashboard-main {
  margin: 0 auto;
  width: 600px;
  height: 400px;
}
</style>
