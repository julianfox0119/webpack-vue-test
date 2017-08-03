<template>
    <div id="chart_container">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="More Options..." name="1">
                <el-select v-model="KPIvalue" placeholder="请选择" @change="handleKPIType" class="SingleSelect">
                    <el-option
                        v-for="item in KPITypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="KPISelect" placeholder="请选择" @change="handleKPIDetail" class="SingleSelect">
                    <el-option
                        v-for="item in KPIDetail"
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

const behaviorLegends = ['Training & Coaching', 'Dealer Risk Control', 'Dealer Setup Retail', 'Dealer Setup Wholesale', 'Rapport Building', 'Other']
const DSMS = ['DSM1', 'DSM2', 'DSM3', 'DSM4', 'DSM5', 'DSM6', 'DSM7']

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
    barWidth: 40,
    barGap: '-100%',
    data: [50, 60, 50, 40, 60, 70]
  },
  {
    name: 'Completed',
    type: 'bar',
    barWidth: 40,
    itemStyle: {
      normal: {
        color: 'rgba(108,247,168,0.7)'
      }
    },
    data: [12, 22, 15, 32, 42, 56]
  }
]

const seriesDataTraining = [
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
        position: 'Top'
      }
    },
    silent: true,
    barWidth: 40,
    barGap: '-100%',
    data: [50, 50, 50, 50, 50, 50, 50]
  },
  {
    name: 'Completed',
    type: 'bar',
    barWidth: 40,
    itemStyle: {
      normal: {
        color: 'rgba(108,247,168,0.7)'
      }
    },
    data: [12, 22, 15, 32, 33, 50, 41]
  }
]

const currentLegends = ['Completed', 'Target']

export default {
  name: 'charts',
  data () {
    return {
      behaviorLegends: behaviorLegends,
      maxYValue: 100,
      activeNames: [],
      KPIDetail: behaviorLegends,
      KPIvalue: 'Behavior',
      KPISelect: [],
      KPITypes: [{value: 'Behavior', label: 'Behavior'}, {value: 'Business', label: 'Business'}]
    }
  },
  methods: {
    resetSelect () {
      this.KPIvalue = 'Behavior'
      this.DSMSel = []
      this.drawChart('chart', seriesData, behaviorLegends, this.maxYValue, this.behaviorLegends, 'Average Score')
    },
    handleKPIType () {
      console.log(this.KPIvalue)
    },
    handleKPIDetail () {
      console.log(this.KPISelect)
      this.drawChart('chart', seriesDataTraining, DSMS, this.maxYValue, this.behaviorLegends, this.KPISelect)
    },
    drawChart (id, myseriesData, xAxisOptions, maxYValue, curlegends, yAxisName) {
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
            data: currentLegends
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
                formatter: function (val) {
                  return val.split(' ').join('\n')
                }
              }
            }
          ],
          yAxis: [
            {
              name: yAxisName,
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
      this.drawChart('chart', seriesData, behaviorLegends, this.maxYValue, this.behaviorLegends, 'Average Score')
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
  width: 95%;
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
.MultiSelect{
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

