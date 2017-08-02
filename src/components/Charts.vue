<template>
  <div id="chart_container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="More Options..." name="1">
        <el-select v-model="value4" placeholder="请选择" @change="handleRSMSelect">
          <el-option
            v-for="item in RSMMulti"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value5" multiple placeholder="请选择" v-if="showMulti && DSMMulti.length" @change="handleMultiSelect">
          <el-option
            v-for="item in DSMMulti"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-cascader
          v-model="reset"
          :options="RSMOptions"
          @active-item-change="handleItemChange"
          @change="handleChange"
          :props="props"
          class="casader"
          v-show=false
        ></el-cascader>
        <el-button type="primary" @click="resetSelect" class="resetBtn">Reset</el-button>
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
let DSMSingle = []

const DSMMulti1 = [{value: 'DSM1-1', label: 'DSM1-1'}, {value: 'DSM1-2', label: 'DSM1-2'}, {value: 'DSM1-3', label: 'DSM1-3'}, {value: 'DSM1-4', label: 'DSM1-4'}, {value: 'DSM1-5', label: 'DSM1-5'}, {value: 'DSM1-6', label: 'DSM1-6'}, {value: 'DSM1-7', label: 'DSM1-7'}, {value: 'DSM1-8', label: 'DSM1-8'}, {value: 'DSM1-9', label: 'DSM1-9'}, {value: 'DSM1-10', label: 'DSM1-10'}]
const DSMMulti2 = [{value: 'DSM2-1', label: 'DSM2-1'}, {value: 'DSM2-2', label: 'DSM2-2'}, {value: 'DSM2-3', label: 'DSM2-3'}, {value: 'DSM2-4', label: 'DSM2-4'}, {value: 'DSM2-5', label: 'DSM2-5'}, {value: 'DSM2-6', label: 'DSM2-6'}, {value: 'DSM2-7', label: 'DSM2-7'}]

const seriesData = [
  {
    name: 'Behavior',
    type: 'bar',
    data: [34, 31, 29, 36, 38, 56, 52]
  },
  {
    name: 'Visiting Time',
    type: 'bar',
    stack: 'behavior',
    data: [12, 13, 10, 13, 9, 23, 21]
  },
  {
    name: 'Report Quantity',
    type: 'bar',
    stack: 'behavior',
    data: [22, 18, 19, 23, 29, 33, 31]
  },
  {
    name: 'Training Times',
    type: 'bar',
    stack: 'business',
    data: [15, 23, 20, 15, 19, 33, 41]
  },
  {
    name: 'Vehicle Audit Times',
    type: 'bar',
    stack: 'business',
    data: [32, 33, 30, 33, 39, 33, 32]
  },
  {
    name: 'Others',
    type: 'bar',
    stack: 'business',
    data: [82, 93, 90, 93, 129, 133, 132]
  }
]

const seriesData1 = [
  {
    name: 'Behavior',
    type: 'bar',
    data: [34, 31, 29, 36, 38, 56, 38, 41, 41, 41]
  },
  {
    name: 'Visiting Time',
    type: 'bar',
    stack: 'behavior',
    data: [12, 13, 10, 13, 9, 23, 10, 21, 19, 22]
  },
  {
    name: 'Report Quantity',
    type: 'bar',
    stack: 'behavior',
    data: [22, 18, 19, 23, 29, 33, 28, 20, 22, 19]
  },
  {
    name: 'Training Times',
    type: 'bar',
    stack: 'business',
    data: [15, 23, 20, 15, 19, 33, 27, 32, 29, 31]
  },
  {
    name: 'Vehicle Audit Times',
    type: 'bar',
    stack: 'business',
    data: [32, 33, 30, 33, 39, 33, 28, 30, 34, 32]
  },
  {
    name: 'Others',
    type: 'bar',
    stack: 'business',
    data: [82, 93, 90, 93, 129, 133, 102, 122, 119, 121]
  }
]

const seriesData2 = [
  {
    name: 'Behavior',
    type: 'bar',
    data: [34, 31, 29, 36, 38, 56, 52]
  },
  {
    name: 'Visiting Time',
    type: 'bar',
    stack: 'behavior',
    data: [12, 13, 10, 13, 9, 23, 31]
  },
  {
    name: 'Report Quantity',
    type: 'bar',
    stack: 'behavior',
    data: [22, 18, 19, 23, 29, 33, 21]
  },
  {
    name: 'Training Times',
    type: 'bar',
    stack: 'business',
    data: [15, 23, 20, 15, 19, 33, 42]
  },
  {
    name: 'Vehicle Audit Times',
    type: 'bar',
    stack: 'business',
    data: [32, 33, 30, 33, 39, 33, 22]
  },
  {
    name: 'Others',
    type: 'bar',
    stack: 'business',
    data: [82, 93, 90, 93, 129, 133, 129]
  }
]

let seriesDataSingle = [
  {
    name: 'Behavior',
    type: 'bar',
    data: []
  },
  {
    name: 'Visiting Time',
    type: 'bar',
    stack: 'behavior',
    data: []
  },
  {
    name: 'Report Quantity',
    type: 'bar',
    stack: 'behavior',
    data: []
  },
  {
    name: 'Training Times',
    type: 'bar',
    stack: 'business',
    data: []
  },
  {
    name: 'Vehicle Audit Times',
    type: 'bar',
    stack: 'business',
    data: []
  },
  {
    name: 'Others',
    type: 'bar',
    stack: 'business',
    data: []
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
      RSMMulti: [],
      DSMMulti: [],
      value4: '',
      value5: [],
      showMulti: false,
      props: {
        value: 'label',
        children: 'dsms'
      }
    }
  },
  methods: {
    resetSelect () {
      this.value4 = ''
      this.value5 = []
      this.showMulti = false
      this.drawChart('chart', seriesData, RSMS)
    },
    handleChange (val) {
      // this.activeNames = []
      if (val[1]) {
        let xAxisData = val[1]
        if (xAxisData.indexOf('1DSM1') > -1) {
          this.drawChart('chart', seriesDataSingle, DSMSingle)
        }
        if (xAxisData.indexOf('2DSM1') > -1) {
          this.drawChart('chart', seriesDataSingle, DSMSingle)
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
    handleRSMSelect () {
      if (this.value4) {
        this.showMulti = true
        if (this.value4 === 'RSM1') {
          this.drawChart('chart', seriesData1, DSMS1)
          this.DSMMulti = DSMMulti1
        } else if (this.value4 === 'RSM2') {
          this.drawChart('chart', seriesData2, DSMS2)
          this.DSMMulti = DSMMulti2
        } else {
          this.DSMMulti = []
        }
      }
    },
    handleMultiSelect () {
      // reset array
      DSMSingle = []
      for (let j = 0; j < seriesDataSingle.length; j++) {
        seriesDataSingle[j].data = []
      }
      // assign new value
      if (this.value5.length) {
        for (let i = 0; i < this.value5.length; i++) {
          DSMSingle.push('1DSM' + (i + 1))
        }
        for (let i = 0; i < this.value5.length; i++) {
          for (let j = 0; j < seriesDataSingle.length; j++) {
            seriesDataSingle[j].data.push(13)
          }
        }
      }
      console.log(seriesDataSingle, DSMSingle)
      this.drawChart('chart', seriesDataSingle, DSMSingle)
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
            data: ['Behavior', 'Visiting Time', 'Report Quantity', 'Training Times', 'Vehicle Audit Times', 'Others']
          },
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
    this.RSMMulti = [{value: 'RSM1', label: 'RSM1'}, {value: 'RSM2', label: 'RSM2'}, {value: 'RSM3', label: 'RSM3'}, {value: 'RSM4', label: 'RSM4'}, {value: 'RSM5', label: 'RSM5'}, {value: 'RSM6', label: 'RSM6'}, {value: 'RSM7', label: 'RSM7'}]
    this.RSMOptions = [{label: 'RSM1', dsms: []}, {label: 'RSM2', dsms: []}, {label: 'RSM3', dsms: []}, {label: 'RSM4', dsms: []}, {label: 'RSM5', dsms: []}, {label: 'RSM6', dsms: []}, {label: 'RSM7', dsms: []}]

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

