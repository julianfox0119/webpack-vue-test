<template>
  <div id="chart_container">
    <el-cascader
      v-model="reset"
      :options="RSMOptions"
      @active-item-change="handleItemChange"
      @change="handleChange"
      :props="props"
      class="casader"
    ></el-cascader>
    <el-button type="primary" @click="resetSelect">Reset</el-button>
    <div id="chart" class="chartCanvas grid-content" v-show="!filterswitch"></div>            
  </div>
</template>

<script>
import echarts from 'echarts'

// could be dynamic obtain from backend
// fake data
const RSMS = ['RSM1', 'RSM2', 'RSM3', 'RSM4', 'RSM5', 'RSM6', 'RSM7']
const DSMS1 = ['1DSM1', '1DSM2', '1DSM3', '1DSM4', '1DSM5', '1DSM6', '1DSM7', '1DSM8', '1DSM9', '1DSM10']
const DSMS2 = ['2DSM1', '2DSM2', '2DSM3', '2DSM4', '2DSM5', '2DSM6', '2DSM7']

const seriesData = [
  {
    name: 'KPI1',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: 'KPI2',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: 'KPI3',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [150, 232, 201, 154, 190, 330, 410]
  },
  {
    name: 'KPI4',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [320, 332, 301, 334, 390, 330, 320]
  },
  {
    name: 'KPI5',
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

const seriesData1 = [
  {
    name: 'KPI1',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 132, 101, 134, 90, 230, 100, 210, 198, 220]
  },
  {
    name: 'KPI2',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [220, 182, 191, 234, 290, 330, 287, 201, 220, 190]
  },
  {
    name: 'KPI3',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [150, 232, 201, 154, 190, 330, 279, 320, 290, 311]
  },
  {
    name: 'KPI4',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [320, 332, 301, 334, 390, 330, 280, 301, 340, 320]
  },
  {
    name: 'KPI5',
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
    name: 'KPI1',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [120, 132, 101, 134, 90, 230, 310]
  },
  {
    name: 'KPI2',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [220, 182, 191, 234, 290, 330, 210]
  },
  {
    name: 'KPI3',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [150, 232, 201, 154, 190, 330, 429]
  },
  {
    name: 'KPI4',
    type: 'line',
    stack: '总量',
    areaStyle: {normal: {}},
    data: [320, 332, 301, 334, 390, 330, 220]
  },
  {
    name: 'KPI5',
    type: 'line',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'top'
      }
    },
    areaStyle: {normal: {}},
    data: [820, 932, 901, 934, 1290, 1330, 1290]
  }
]

export default {
  name: 'charts',
  data () {
    return {
      reset: [],
      filterswitch: false,
      charts: '',
      RSMOptions: [{label: 'RSM1', dsms: []}, {label: 'RSM2', dsms: []}, {label: 'RSM3', dsms: []}, {label: 'RSM4', dsms: []}, {label: 'RSM5', dsms: []}, {label: 'RSM6', dsms: []}, {label: 'RSM7', dsms: []}],
      props: {
        value: 'label',
        children: 'dsms'
      }
    }
  },
  methods: {
    resetSelect () {
      console.log(this.RSMOptions, this.props)
      this.reset = []
      this.drawChart('chart', seriesData, RSMS)
    },
    handleChange (val) {
      console.log('changed!', val[1], this.reset)
      if (val[1]) {
        let xAxisData = val[1]
        if (xAxisData.indexOf('1DSM1') > -1) {
          this.drawChart('chart', seriesData1, DSMS1)
        }
        if (xAxisData.indexOf('2DSM1') > -1) {
          this.drawChart('chart', seriesData2, DSMS2)
        }
      }
    },
    handleItemChange (val) {
      console.log('active item:', val)
      setTimeout(_ => {
        if (val.indexOf('RSM1') > -1 && !this.RSMOptions[0].dsms.length) {
          this.RSMOptions[0].dsms = [{label: '1DSM1'}, {label: '1DSM2'}, {label: '1DSM3'}, {label: '1DSM4'}, {label: '1DSM5'}, {label: '1DSM6'}, {label: '1DSM7'}, {label: '1DSM8'}, {label: '1DSM9'}, {label: '1DSM10'}]
        } else if (val.indexOf('RSM2') > -1 && !this.RSMOptions[1].dsms.length) {
          this.RSMOptions[1].dsms = [{label: '2DSM1'}, {label: '2DSM2'}, {label: '2DSM3'}, {label: '2DSM4'}, {label: '2DSM5'}, {label: '2DSM6'}, {label: '2DSM7'}]
        }
      }, 300)
    },
    handleSwithcer () {
      this.filterswitch = !this.filterswitch
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
            data: ['KPI1', 'KPI2', 'KPI3', 'KPI4', 'KPI5']
          },
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
      })
    }
  },

  mounted () {
    this.$nextTick(function () {
      console.log(this.RSMOptions.value)
      this.drawChart('chart', seriesData, RSMS)
      // todo: get default data using ajax
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartCanvas{
  width: 635px;
  height: 400px;
  margin: 0 auto;
  text-align: center;  
}
.casader{
  margin-bottom: 5px;
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
</style>
