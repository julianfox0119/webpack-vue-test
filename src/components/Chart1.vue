<template>
    <div id="chart_container">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="More Options..." name="1">
                <el-select v-model="KPIvalue" placeholder="请选择" @change="handleKPIType" class="ASMSelect">
                    <el-option
                        v-for="item in KPITypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="DSMSel" multiple placeholder="请选择" class="MultiSelect">
                    <el-option
                        v-for="item in DSMS"
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

let ASM = ['ASM-Name']

const behaviorLegends = ['Training & Coaching', 'Dealer Risk Control', 'Dealer Setup Retail', 'Dealer Setup Wholesale', 'Rapport Building', 'Other']

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
        position: 'insideTop'
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

const currentLegends = ['Completed', 'Target']

export default {
  name: 'charts',
  data () {
    return {
      behaviorLegends: behaviorLegends,
      maxYValue: 100,
      activeNames: [],
      KPIDetail: '',
      DSMS: ['1DSM1', '1DSM2', '1DSM3', '1DSM4', '1DSM5', '1DSM6', '1DSM7', '1DSM8', '1DSM9', '1DSM10'],
      DSMSel: [],
      KPIvalue: 'Behavior',
      KPITypes: [{value: 'Behavior', label: 'Behavior'}, {value: 'Business', label: 'Business'}]
    }
  },
  methods: {
    resetSelect () {
      this.KPIvalue = 'Behavior'
      this.DSMSel = []
      this.drawChart('chart', seriesData, ASM, this.maxYValue, this.behaviorLegends, 'Average Score')
    },
    handleKPIType () {
      console.log(this.KPIvalue)
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
              name: 'ASM',
              type: 'category',
              data: curlegends,
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
      this.drawChart('chart', seriesData, ASM, this.maxYValue, this.behaviorLegends, 'Average Score')
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
.ASMSelect{
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

