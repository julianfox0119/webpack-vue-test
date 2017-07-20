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
        <div class="block" v-if="yearScope">
          <span class="demonstration">年</span>
          <el-date-picker
            v-model="endyear"
            @change="handleEndYear"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
      </div>
      <div id="quaterFilter" v-if="quaterSelection">
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

const seriesData = [
  {
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [150, 232, 201, 154, 190, 330, 410]
  },
  {
    name: '直接访问',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [320, 332, 301, 334, 390, 330, 320]
  },
  {
    name: '搜索引擎',
    type: 'line',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'top'
      }
    },
    areaStyle: {normal: {}},
    data: [820, 932, 901, 934, 1290, 1330, 1320]
  }
]

export default {
  name: 'charts',
  data () {
    return {
      year: '',
      endyear: '',
      filters: '',
      charts: '',
      checkboxGroup1: [],
      yearScope: false,
      quaterSelection: false,
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
    handleYear () {
      console.log(this.year)
      this.yearScope = true
      this.quaterSelection = true
      this.checkboxGroup1 = []
      this.drawChart('chart', this.opinion1, this.opinionData1)
    },
    handleEndYear () {
      console.log(this.endyear)
      this.quaterSelection = false
      this.drawChart('chart', this.opinion, this.opinionData)
    },
    handleQuater () {
      console.log(this.checkboxGroup1)
      this.yearScope = false
      this.drawChart('chart', this.opinion2, this.opinionData2)
    },
    drawChart (id, opinion, opinionData) {
      if (!this.charts) {
        this.charts = echarts.init(document.getElementById(id))
      }
      this.charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
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
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: seriesData
      })
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.drawChart('chart', this.opinion, this.opinionData)
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
