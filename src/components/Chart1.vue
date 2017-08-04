<template>
    <div id="chart_container">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="More Options..." name="1">
                <el-select v-model="KPIvalue" placeholder="请选择"  @change="handleKPIType" class="SingleSelect">
                    <el-option
                        v-for="item in KPITypes"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="KPISelect" placeholder="请选择" clearable @change="handleKPIDetail" class="LongSingleSelect" v-if="KPIvalue === 'Behavior'">
                    <el-option
                        v-for="item in KPIDetail"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="KPIBuzSelect" placeholder="请选择" clearable @change="handleKPIBuzDetail" class="LongSingleSelect" v-if="KPIvalue === 'Business'">
                    <el-option
                        v-for="item in KPIBuzDetail"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="DSMSelect" placeholder="请选择" clearable @change="handleDealers" class="SingleSelect" v-if="KPIvalue === 'Business' && KPIBuzSelect !== ''">
                    <el-option
                        v-for="item in DealersDetail"
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
    name: 'Behavior Target',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0.1)'
      }
    },
    label: {
      normal: {
        show: true,
        position: ['35%', -25],
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'rgba(108,247,168,0.9)'
        }
      }
    },
    silent: true,
    barGap: '-100%',
    data: [50, 60, 50, 40, 60, 50]
  },
  {
    name: 'Behavior Completed',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(108,247,168,0.8)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'insideBottom',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    },
    data: [12, 22, 15, 32, 60, 26]
  }
]

const seriesDataTraining = [
  {
    name: 'Behavior Target',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0.2)'
      }
    },
    label: {
      normal: {
        show: true,
        position: ['35%', -25],
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'rgba(108,247,168,0.9)'
        }
      }
    },
    silent: true,
    barGap: '-100%',
    data: [50, 50, 50, 50, 50, 50, 50]
  },
  {
    name: 'Behavior Completed',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(108,247,168,0.8)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'insideBottom',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    },
    data: [12, 9, 15, 8, 13, 16, 11]
  }
]

const seriesDataRapport = [
  {
    name: 'Behavior Target',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(0,0,0,0.2)'
      }
    },
    label: {
      normal: {
        show: true,
        position: ['35%', -25],
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'rgba(108,247,168,0.9)'
        }
      }
    },
    silent: true,
    barGap: '-100%',
    data: [60, 60, 60, 60, 60, 60, 60]
  },
  {
    name: 'Behavior Completed',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(108,247,168,0.8)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'insideBottom',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
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
    barGap: '-100%',
    data: [100, 100, 100, 100, 100, 100, 100, 100, 100]
  },
  {
    name: 'Business Completed',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(108,247,255,0.7)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'insideBottom',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
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
    barGap: '-100%',
    data: [100, 100, 100, 100, 100, 100, 100]
  },
  {
    name: 'Business Completed',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(108,247,255,0.7)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'insideBottom',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    },
    data: [12, 49, 35, 50, 41, 26, 62]
  }
]

const seriesDataDMS1 = [
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
    barGap: '-100%',
    data: [100, 100, 100]
  },
  {
    name: 'Business Completed',
    type: 'bar',
    itemStyle: {
      normal: {
        color: 'rgba(255,147,155,0.7)'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'insideBottom',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    },
    data: [12, 15, 9]
  }
]

const behaviorLegends = ['Training & Coaching', 'Dealer Risk Control', 'Dealer Setup Retail', 'Dealer Setup Wholesale', 'Rapport Building', 'Other']
const businessLegends = ['Aumen Retail Pen.', 'Retail Agility Pen.', 'Retail OL Pen.', 'Wholesale Pen.', 'Used Car Finan Pen.', 'FC Error Ratio', 'Return File Pending Ratio', 'Wechat Registration Ratio', 'Web Pos Util']

const DSMS = ['DSM1', 'DSM2', 'DSM3', 'DSM4', 'DSM5', 'DSM6', 'DSM7']
const DEALEARS = ['Dealer1', 'Dealer2', 'Dealer3']
const BehLegends = ['Behavior Target', 'Behavior Completed']
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
      DealersDetail: DSMS,
      KPIvalue: 'Behavior',
      KPISelect: '',
      KPIBuzSelect: '',
      DSMSelect: '',
      KPITypes: ['Behavior', 'Business']
    }
  },
  methods: {
    resetSelect () {
      this.KPIvalue = 'Behavior'
      this.KPISelect = ''
      this.KPIBuzSelect = ''
      this.DSMSelect = ''
      this.drawChart('chart', seriesData, behaviorLegends, this.maxYValue, BehLegends, 'Average Score')
    },
    handleKPIType () {
      this.KPISelect = ''
      this.KPIBuzSelect = ''
      this.DSMSelect = ''
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
          this.drawChart('chart', seriesDataTraining, DSMS, this.maxYValue, BehLegends, this.KPISelect)
        } else if (this.KPISelect === 'Rapport Building') {
          this.drawChart('chart', seriesDataRapport, DSMS, this.maxYValue, BehLegends, this.KPISelect)
        } else {
          this.drawChart('chart', [], DSMS, this.maxYValue, [], this.KPISelect)
        }
      } else {
        this.handleKPIType()
      }
    },
    handleKPIBuzDetail () {
      if (this.KPIBuzSelect) {
        if (this.KPIBuzSelect === 'Aumen Retail Pen.') {
          this.drawChart('chart', seriesDataAmen, DSMS, this.maxYValue, BuzLegends, this.KPIBuzSelect)
        } else {
          this.drawChart('chart', [], DSMS, this.maxYValue, [], this.KPIBuzSelect)
        }
      } else {
        this.handleKPIDetail()
      }
    },
    handleDealers () {
      if (this.DSMSelect) {
        if (this.DSMSelect === 'DSM1') {
          this.drawChart('chart', seriesDataDMS1, DEALEARS, this.maxYValue, BuzLegends, this.KPIBuzSelect)
        } else {
          this.drawChart('chart', [], DEALEARS, this.maxYValue, [], this.KPIBuzSelect)
        }
      } else {
        this.handleKPIBuzDetail()
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
          backgroundColor: '#999999',  // 'rgba(128, 128, 128, 1)',
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

