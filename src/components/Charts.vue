<template>
    <div id="chart_container"> 
      <div id="yearFilter">
        <div class="block">
          <span class="demonstration">年</span>
          <el-date-picker
            v-model="year"
            @change="handleYear"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
      </div>
      <div id="quaterFilter" v-if="year">
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkboxGroup1" @change="handleQuater">
            <el-checkbox-button v-for="quater in quaters" :label="quater" :key="quater">{{quater}}</el-checkbox-button>
          </el-checkbox-group>
      </div>
      <div id="chart" class="chartCanvas"></div>
    </div>
</template>

<script>
import echarts from 'echarts'

const quaterOptions = ['第一季度', '第二季度', '第三季度', '第四季度']

export default {
  name: 'charts',
  data () {
    return {
      year: '',
      filters: '',
      charts: '',
      checkboxGroup1: [],
      quaters: quaterOptions,
      opinion: [ '直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎' ],
      opinionData: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1549, name: '搜索引擎'}
      ],
      opinion2: [ '直接访问', '邮件营销', '联盟广告' ],
      opinionData2: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'}
      ],
      opinion1: [ '直接访问', '邮件营销', '联盟广告', '搜索引擎' ],
      opinionData1: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 1549, name: '搜索引擎'}
      ]
    }
  },
  methods: {
    setquater () {
      console.log(this)
    },
    handleYear () {
      this.drawPie('chart', this.opinion1, this.opinionData1)
      // this.filters = command
    },
    handleQuater () {
      this.drawPie('chart', this.opinion2, this.opinionData2)
      // this.filters = command
    },
    drawPie (id, opinion, opinionData) {
      if (!this.charts) {
        this.charts = echarts.init(document.getElementById(id))
      }
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: opinion
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: opinionData
          }
        ]
      })
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.drawPie('chart', this.opinion, this.opinionData)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartCanvas{
  width: 600px;
  height: 400px;
  margin: 0 auto;
  padding-top: 40px;
  text-align: center;  
}
</style>
