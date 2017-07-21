<template>
  <div id="chart_container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="More Options..." name="1">
        <el-cascader
          v-model="reset"
          :options="RSMOptions"
          @active-item-change="handleItemChange"
          @change="handleChange"
          :props="props"
          class="casader"
        ></el-cascader>
        <el-button type="primary" @click="resetSelect">Reset</el-button>
      </el-collapse-item>
    </el-collapse>
    
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
    type: 'bar',
    stack: 'behavior',
    data: [120, 132, 101, 134, 90, 230, 210]
  },
  {
    name: 'KPI2',
    type: 'bar',
    stack: 'behavior',
    data: [220, 182, 191, 234, 290, 330, 310]
  },
  {
    name: 'KPI3',
    type: 'bar',
    stack: 'business',
    data: [150, 232, 201, 154, 190, 330, 410]
  },
  {
    name: 'KPI4',
    type: 'bar',
    stack: 'business',
    data: [320, 332, 301, 334, 390, 330, 320]
  },
  {
    name: 'KPI5',
    type: 'bar',
    stack: 'business',
    data: [820, 932, 901, 934, 1290, 1330, 1320]
  }
]

const seriesData1 = [
  {
    name: 'KPI1',
    type: 'bar',
    stack: 'behavior',
    data: [120, 132, 101, 134, 90, 230, 100, 210, 198, 220]
  },
  {
    name: 'KPI2',
    type: 'bar',
    stack: 'behavior',
    data: [220, 182, 191, 234, 290, 330, 287, 201, 220, 190]
  },
  {
    name: 'KPI3',
    type: 'bar',
    stack: 'business',
    data: [150, 232, 201, 154, 190, 330, 279, 320, 290, 311]
  },
  {
    name: 'KPI4',
    type: 'bar',
    stack: 'business',
    data: [320, 332, 301, 334, 390, 330, 280, 301, 340, 320]
  },
  {
    name: 'KPI5',
    type: 'bar',
    stack: 'business',
    data: [820, 932, 901, 934, 1290, 1330, 1020, 1220, 1190, 1210]
  }
]

const seriesData2 = [
  {
    name: 'KPI1',
    type: 'bar',
    stack: 'behavior',
    data: [120, 132, 101, 134, 90, 230, 310]
  },
  {
    name: 'KPI2',
    type: 'bar',
    stack: 'behavior',
    data: [220, 182, 191, 234, 290, 330, 210]
  },
  {
    name: 'KPI3',
    type: 'bar',
    stack: 'business',
    data: [150, 232, 201, 154, 190, 330, 429]
  },
  {
    name: 'KPI4',
    type: 'bar',
    stack: 'business',
    data: [320, 332, 301, 334, 390, 330, 220]
  },
  {
    name: 'KPI5',
    type: 'bar',
    stack: 'business',
    data: [820, 932, 901, 934, 1290, 1330, 1290]
  }
]

export default {
  name: 'charts',
  data () {
    return {
      activeNames: [],
      reset: [],
      filterswitch: false,
      charts: '',
      RSMOptions: [],
      props: {
        value: 'label',
        children: 'dsms'
      }
    }
  },
  methods: {
    resetSelect () {
      this.reset = []
      this.drawChart('chart', seriesData, RSMS)
    },
    handleChange (val) {
      // this.activeNames = []
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
              type: 'shadow'
            }
          },
          legend: {
            // orient: 'vertical',
            data: ['KPI1', 'KPI2', 'KPI3', 'KPI4', 'KPI5']
          },
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '3%',
          //   containLabel: true
          // },
          xAxis: [
            {
              type: 'category',
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
    // todo: get data from backend
    this.RSMOptions = [{label: 'RSM1', dsms: []}, {label: 'RSM2', dsms: []}, {label: 'RSM3', dsms: []}, {label: 'RSM4', dsms: []}, {label: 'RSM5', dsms: []}, {label: 'RSM6', dsms: []}, {label: 'RSM7', dsms: []}]
    console.log(this.RSMOptions, this.RSMOptions[0].label)

    this.$nextTick(function () {
      this.drawChart('chart', seriesData, RSMS)
      // todo: get default data using ajax
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

@media (max-height: 300px) {
  .chartCanvas{
    height: 400px;
    margin-top: 20px; 
  }
}
@media (min-height: 500px) {
  .chartCanvas{
    height: 600px; 
    margin-top: 30px;
  }
}
</style>

