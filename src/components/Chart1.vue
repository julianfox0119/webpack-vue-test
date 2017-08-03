<template>
    <div id="chart_container">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="More Options..." name="1">
                <el-select v-model="KPIvalue" placeholder="请选择" @change="handleKPIType" class="SingleSelect">
                    <el-option
                        v-for="item in KPITypes"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="KPISelect" placeholder="请选择" @change="handleKPIDetail" class="LongSingleSelect" v-if="KPIvalue === 'Behavior'">
                    <el-option
                        v-for="item in KPIDetail"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="KPIBuzSelect" placeholder="请选择" @change="handleKPIBuzDetail" class="LongSingleSelect" v-if="KPIvalue === 'Business'">
                    <el-option
                        v-for="item in KPIBuzDetail"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="resetSelect" class="resetBtn">Reset</el-button>
            </el-collapse-item>    
        </el-collapse>
        <div id="chart" class="chartCanvas grid-content"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

const seriesData = [
  {
    name: 'Target',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0.2)'
      }
    },
    label: {
      normal: {
        show: true,
        position: ['33%', -20],
        textStyle: {
          color: '#333333'
        }
      }
    },
    silent: true,
    // barWidth: 40,
    barGap: '-100%',
    data: [50, 60, 50, 40, 60, 50]
  },
  {
    name: 'Completed',
    type: 'bar',
    // barWidth: 40,
    itemStyle: {
      normal: {
        color: 'rgba(108,247,168,0.7)'
      }
    },
    data: [12, 22, 15, 32, 52, 26]
  }
]

const seriesDataTraining = [
  {
    name: 'Target Training',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0.2)'
      }
    },
    label: {
      normal: {
        show: true,
        position: ['33%', -20],
        textStyle: {
          color: '#333333'
        }
      }
    },
    silent: true,
    // barWidth: 40,
    barGap: '-100%',
    data: [50, 50, 50, 50, 50, 50, 50]
  },
  {
    name: 'Completed Training',
    type: 'bar',
    // barWidth: 40,
    itemStyle: {
      normal: {
        color: 'rgba(108,247,168,0.7)'
      }
    },
    data: [12, 9, 15, 8, 13, 16, 11]
  }
]

const seriesDataRapport = [
  {
    name: 'Target Rapport Building',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0.2)'
      }
    },
    label: {
      normal: {
        show: true,
        position: ['33%', -20],
        textStyle: {
          color: '#333333'
        }
      }
    },
    silent: true,
    // barWidth: 40,
    barGap: '-100%',
    data: [60, 60, 60, 60, 60, 60, 60]
  },
  {
    name: 'Completed Rapport Building',
    type: 'bar',
    // barWidth: 40,
    itemStyle: {
      normal: {
        color: 'rgba(108,247,168,0.7)'
      }
    },
    data: [42, 50, 45, 40, 47, 37, 43]
  }
]

const seriesDataBuz = [
  {
    name: 'Business Target',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0.2)'
      }
    },
    label: {
      normal: {
        show: false
      }
    },
    silent: true,
    // barWidth: 30,
    barGap: '-100%',
    data: [100, 100, 100, 100, 100, 100, 100, 100, 100]
  },
  {
    name: 'Business Completed',
    type: 'bar',
    // barWidth: 30,
    itemStyle: {
      normal: {
        color: 'rgba(108,247,255,0.7)'
      }
    },
    data: [42, 50, 45, 40, 47, 37, 43, 60, 83]
  }
]

const seriesDataAmen = [
  {
    name: 'Business Target',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0.2)'
      }
    },
    label: {
      normal: {
        show: false
      }
    },
    silent: true,
    // barWidth: 40,
    barGap: '-100%',
    data: [100, 100, 100, 100, 100, 100, 100]
  },
  {
    name: 'Business Completed',
    type: 'bar',
    // barWidth: 40,
    itemStyle: {
      normal: {
        color: 'rgba(108,247,255,0.7)'
      }
    },
    data: [32, 49, 35, 50, 41, 16, 62]
  }
]

const behaviorLegends = ['Training & Coaching', 'Dealer Risk Control', 'Dealer Setup Retail', 'Dealer Setup Wholesale', 'Rapport Building', 'Other']
const businessLegends = ['Aumen Retail Pen.', 'Retail Agility Pen.', 'Retail OL Pen.', 'Wholesale Pen.', 'Used Car Finan Pen.', 'FC Error Ratio', 'Return File Pending Ratio', 'Wechat Registration Ratio', 'Web Pos Util']

const DSMS = ['DSM1', 'DSM2', 'DSM3', 'DSM4', 'DSM5', 'DSM6', 'DSM7']
const BehLegends = ['Target', 'Completed']
const TrainingLegends = ['Target Training', 'Completed Training']
const RapportLegends = ['Target Rapport Building', 'Completed Rapport Building']
const BuzLegends = ['Business Target', 'Business Completed']

export default {
  name: 'charts',
  data () {
    return {
    //   behaviorLegends: behaviorLegends,
      maxYValue: 100,
      activeNames: [],
      KPIDetail: behaviorLegends,
      KPIBuzDetail: businessLegends,
      KPIvalue: 'Behavior',
      KPISelect: '',
      KPIBuzSelect: '',
      KPITypes: ['Behavior', 'Business']
    }
  },
  methods: {
    resetSelect () {
      this.KPIvalue = 'Behavior'
      this.KPISelect = ''
      this.KPIBuzSelect = ''
      this.drawChart('chart', seriesData, behaviorLegends, this.maxYValue, BehLegends, 'Average Score')
    },
    handleKPIType () {
    //   console.log(this.KPIvalue)
      if (this.KPIvalue) {
        if (this.KPIvalue === 'Behavior') {
          this.drawChart('chart', seriesData, behaviorLegends, this.maxYValue, BehLegends, 'Average Score')
        } else {
          this.drawChart('chart', seriesDataBuz, businessLegends, this.maxYValue, BuzLegends, 'Average Score')
        }
      }
    },
    handleKPIDetail () {
      if (this.KPISelect) {
        if (this.KPISelect === 'Training & Coaching') {
          this.drawChart('chart', seriesDataTraining, DSMS, this.maxYValue, TrainingLegends, this.KPISelect)
        } else if (this.KPISelect === 'Rapport Building') {
          this.drawChart('chart', seriesDataRapport, DSMS, this.maxYValue, RapportLegends, this.KPISelect)
        } else {
          this.drawChart('chart', [], DSMS, this.maxYValue, [], this.KPISelect)
        }
      }
    },
    handleKPIBuzDetail () {
      if (this.KPIBuzSelect) {
        if (this.KPIBuzSelect === 'Aumen Retail Pen.') {
          this.drawChart('chart', seriesDataAmen, DSMS, this.maxYValue, BuzLegends, this.KPIBuzSelect)
        } else {
          this.drawChart('chart', [], DSMS, this.maxYValue, [], this.KPIBuzSelect)
        }
      }
    },
    drawChart (id, myseriesData, xAxisOptions, maxYValue, curLegends, yAxisName) {
      if (!this.charts) {
        this.charts = echarts.init(document.getElementById(id))
      }
      this.charts.setOption({
        baseOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: curLegends
          },
          label: {
            normal: {
              show: true
            }
          },
          grid: {
            bottom: '25%'
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisOptions,
              axisLabel: {
                // rotate: 20,
                interval: 0,
                formatter: function (val) {
                  return val.split(' ').join('\n')
                }
              }
            }
          ],
          yAxis: [
            {
              name: yAxisName,
              nameGap: 20,
              max: 'dataMax',
              type: 'value'
            }
          ],
          series: myseriesData
        }
      }, true)
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawChart('chart', seriesData, behaviorLegends, this.maxYValue, BehLegends, 'Average Score')
    })
    window.onresize = () => {
      this.charts.resize()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartCanvas{
  width: 100%;
  height: 400px;
  margin: 0 auto;
  text-align: center;  
}
.casader{
  margin-bottom: 5px;
}
.SingleSelect{
  width: 110px;
}
.LongSingleSelect{
  width: 230px;
}
.filterSwitcher{
  margin-bottom: 10px;
}
.confirmBtn{
  margin: 5px auto;
}
.inline-block{
  display: inline-block;
}
.slide-fade-enter, .slide-fade-leave-to
{
  opacity: 0;
}

@media (max-height: 500px) {
  .chartCanvas{
    height: 300px;
    margin-top: 20px; 
  }
}
@media (min-height: 500px) {
  .chartCanvas{
    height: 500px; 
    margin-top: 30px;
  }
}
</style>

