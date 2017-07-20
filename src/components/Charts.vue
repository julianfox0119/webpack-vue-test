<template>
  <div id="chart_container"> 
    <div id="yearFilter" class="block">
      <div class="inline-block">
        <span class="demonstration">年</span>
        <el-date-picker
          v-model="year"
          @change="handleYear"
          align="right"
          type="year"
          placeholder="选择年">
        </el-date-picker>
      </div>
      <div class="inline-block" v-if="yearScope">
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
    <div id="chart" class="chartCanvas grid-content"></div>      
  </div>
</template>

<script>
import echarts from 'echarts'

const quaterOptions = ['第一季度', '第二季度', '第三季度', '第四季度']

const yearOptions = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']

const seriesData = [
  {
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 132, 101, 134, 90, 230, 210, 250, 300, 180]
  },
  {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [220, 182, 191, 234, 290, 330, 310, 335, 270, 430]
  },
  {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [150, 232, 201, 154, 190, 330, 410, 270, 310, 210]
  },
  {
    name: '直接访问',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [320, 332, 301, 334, 390, 330, 320, 350, 289, 320]
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
    data: [820, 932, 901, 934, 1290, 1330, 1320, 1210, 1510, 1890]
  }
]

const seriesData1 = [
  {
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 132, 101, 134, 90, 230, 100, 210, 198, 220]
  },
  {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [220, 182, 191, 234, 290, 330, 287, 201, 220, 190]
  },
  {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [150, 232, 201, 154, 190, 330, 279, 320, 290, 311]
  },
  {
    name: '直接访问',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [320, 332, 301, 334, 390, 330, 280, 301, 340, 320]
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
    data: [820, 932, 901, 934, 1290, 1330, 1020, 1220, 1190, 1210]
  }
]

const seriesData2 = [
  {
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 132, 101, 134]
  },
  {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [220, 182, 191, 234]
  },
  {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [150, 232, 201, 154]
  },
  {
    name: '直接访问',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [320, 332, 301, 334]
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
    data: [820, 932, 901, 934]
  }
]

const seriesData3 = [
  {
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [220, 132, 201, 134]
  },
  {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 182, 291, 234]
  },
  {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [350, 232, 201, 254]
  },
  {
    name: '直接访问',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [320, 232, 301, 234]
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
    data: [620, 932, 701, 934]
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
      quaters: quaterOptions
    }
  },
  methods: {
    handleYear () {
      console.log(this.year)
      this.yearScope = true
      this.quaterSelection = true
      this.checkboxGroup1 = []
      if (this.year) {
        this.drawChart('chart', seriesData2, quaterOptions)
      } else {
        this.yearScope = false
        this.quaterSelection = false
        this.drawChart('chart', seriesData, yearOptions)
      }
    },
    handleEndYear () {
      console.log(this.endyear)
      this.quaterSelection = false
      if (this.endyear) {
        this.drawChart('chart', seriesData1, yearOptions)
      } else {
        this.yearScope = false
        this.drawChart('chart', seriesData2, quaterOptions)
      }
    },
    handleQuater () {
      console.log(this.checkboxGroup1)
      this.yearScope = false
      this.drawChart('chart', seriesData3, quaterOptions)
    },
    drawChart (id, myseriesData, xAxisOptions) {
      if (!this.charts) {
        this.charts = echarts.init(document.getElementById(id))
      }
      this.charts.setOption({
        baseOption: {
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
          // toolbox: {
          //   orient: 'horizontal',
          //   right: '5%',
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: xAxisOptions
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: myseriesData
        }
        // media: [
        //   {
        //     option: {
        //       legend: {
        //         orient: 'vertical'
        //       }
        //     }
        //   },
        //   {
        //     query: {
        //       minWidth: 600
        //     },
        //     option: {
        //       legend: {
        //         top: '5%',
        //         left: '0',
        //         itemWidth: 10,
        //         itemHeight: 10,
        //         orient: 'vertical'
        //       },
        //       grid: {
        //         top: '5%',
        //         left: '20%'
        //       }
        //     }
        //   },
        //   {
        //     query: {
        //       maxWidth: 600
        //     },
        //     option: {
        //       legend: {
        //         orient: 'horizontal'
        //       }
        //     }
        //   }
        // ]
      })
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.drawChart('chart', seriesData, yearOptions)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartCanvas{
  width: 630px;
  height: 400px;
  margin: 0 auto;
  padding-top: 40px;
  text-align: center;  
}
/* @media (min-width: 600px) {
  .chartCanvas{
    width: 630px;
    height: 400px;
  }
}
@media (max-width: 600px) {
  .chartCanvas{
    width: 330px;
    height: 400px;
  }
} */
.inline-block{
  display:inline-block;
}
</style>
