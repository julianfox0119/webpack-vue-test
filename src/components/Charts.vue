<template>
  <div id="chart_container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="More Options..." name="1">
        <el-select v-model="value3" placeholder="请选择" @change="handleKPIType" class="ASMSelect">
          <el-option
            v-for="item in KPITypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value4" placeholder="请选择" @change="handleASMSelect" class="ASMSelect">
          <el-option
            v-for="item in ASMMulti"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value5" multiple placeholder="请选择" v-if="showMulti && DSMMulti.length" @change="handleMultiSelect" class="MultiSelect">
          <el-option
            v-for="item in DSMMulti"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value6" multiple placeholder="请选择" v-if="value5.length === 1 && value3 === 'Business'" @change="handleMultiDealerSelect" class="MultiSelect">
          <el-option
            v-for="item in Dealers"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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

// could be dynamic obtain from backend
// fake data
const ASMS = ['ASM1', 'ASM2', 'ASM3', 'ASM4', 'ASM5', 'ASM6', 'ASM7']
const DSMS1 = ['1DSM1', '1DSM2', '1DSM3', '1DSM4', '1DSM5', '1DSM6', '1DSM7', '1DSM8', '1DSM9', '1DSM10']
const DSMS2 = ['2DSM1', '2DSM2', '2DSM3', '2DSM4', '2DSM5', '2DSM6', '2DSM7']
let DSMSingle = []
let DealerList = []

const DSMMulti1 = [{value: 'DSM1-1', label: 'DSM1-1'}, {value: 'DSM1-2', label: 'DSM1-2'}, {value: 'DSM1-3', label: 'DSM1-3'}, {value: 'DSM1-4', label: 'DSM1-4'}, {value: 'DSM1-5', label: 'DSM1-5'}, {value: 'DSM1-6', label: 'DSM1-6'}, {value: 'DSM1-7', label: 'DSM1-7'}, {value: 'DSM1-8', label: 'DSM1-8'}, {value: 'DSM1-9', label: 'DSM1-9'}, {value: 'DSM1-10', label: 'DSM1-10'}]
const DSMMulti2 = [{value: 'DSM2-1', label: 'DSM2-1'}, {value: 'DSM2-2', label: 'DSM2-2'}, {value: 'DSM2-3', label: 'DSM2-3'}, {value: 'DSM2-4', label: 'DSM2-4'}, {value: 'DSM2-5', label: 'DSM2-5'}, {value: 'DSM2-6', label: 'DSM2-6'}, {value: 'DSM2-7', label: 'DSM2-7'}]

const DealersOptions = [{value: 'Dealer1', label: 'Dealer1'}, {value: 'Dealer2', label: 'Dealer2'}, {value: 'Dealer3', label: 'Dealer3'}]

const seriesData = [
  {
    name: 'Visiting Time',
    type: 'bar',
    data: [12, 13, 10, 13, 9, 23, 21]
  },
  {
    name: 'Report Quantity',
    type: 'bar',
    data: [22, 18, 19, 23, 29, 33, 31]
  },
  {
    name: 'Training Times',
    type: 'bar',
    data: [15, 23, 20, 15, 19, 33, 41]
  },
  {
    name: 'Vehicle Audit Times',
    type: 'bar',
    data: [32, 33, 30, 33, 39, 33, 32]
  },
  {
    name: 'Others',
    type: 'bar',
    data: [82, 93, 90, 93, 29, 33, 32]
  }
]

const seriesData1 = [
  {
    name: 'Visiting Time',
    type: 'bar',
    data: [12, 13, 10, 13, 9, 23, 10, 21, 19, 22]
  },
  {
    name: 'Report Quantity',
    type: 'bar',
    data: [22, 18, 19, 23, 29, 33, 28, 20, 22, 19]
  },
  {
    name: 'Training Times',
    type: 'bar',
    data: [15, 23, 20, 15, 19, 33, 27, 32, 29, 31]
  },
  {
    name: 'Vehicle Audit Times',
    type: 'bar',
    data: [32, 33, 30, 33, 39, 33, 28, 30, 34, 32]
  },
  {
    name: 'Others',
    type: 'bar',
    data: [82, 93, 90, 93, 29, 33, 2, 22, 19, 21]
  }
]

const seriesData2 = [
  {
    name: 'Visiting Time',
    type: 'bar',
    data: [12, 13, 10, 13, 9, 23, 31]
  },
  {
    name: 'Report Quantity',
    type: 'bar',
    data: [22, 18, 19, 23, 29, 33, 21]
  },
  {
    name: 'Training Times',
    type: 'bar',
    data: [15, 23, 20, 15, 19, 33, 42]
  },
  {
    name: 'Vehicle Audit Times',
    type: 'bar',
    data: [32, 33, 30, 33, 39, 33, 22]
  },
  {
    name: 'Others',
    type: 'bar',
    data: [82, 93, 90, 93, 29, 33, 29]
  }
]

let seriesDataSingle = [
  {
    name: 'Visiting Time',
    type: 'bar',
    data: []
  },
  {
    name: 'Report Quantity',
    type: 'bar',
    data: []
  },
  {
    name: 'Training Times',
    type: 'bar',
    data: []
  },
  {
    name: 'Vehicle Audit Times',
    type: 'bar',
    data: []
  },
  {
    name: 'Others',
    type: 'bar',
    data: []
  }
]

const seriesDataBuz = [
  {
    name: 'Penetration Rate',
    type: 'bar',
    data: [12, 13, 10, 13, 9, 23, 21]
  },
  {
    name: 'Agile Rate',
    type: 'bar',
    data: [22, 18, 19, 23, 29, 33, 31]
  },
  {
    name: 'Others Rate',
    type: 'bar',
    data: [82, 93, 90, 93, 29, 33, 32]
  }
]

const seriesDataBuz1 = [
  {
    name: 'Penetration Rate',
    type: 'bar',
    data: [12, 13, 10, 13, 9, 23, 10, 21, 19, 22]
  },
  {
    name: 'Agile Rate',
    type: 'bar',
    data: [22, 18, 19, 23, 29, 33, 28, 20, 22, 19]
  },
  {
    name: 'Others Rate',
    type: 'bar',
    data: [15, 23, 20, 15, 19, 33, 27, 32, 29, 31]
  }
]

const seriesDataBuz2 = [
  {
    name: 'Penetration Rate',
    type: 'bar',
    data: [12, 13, 10, 13, 9, 23, 31]
  },
  {
    name: 'Agile Rate',
    type: 'bar',
    data: [22, 18, 19, 23, 29, 33, 21]
  },
  {
    name: 'Others Rate',
    type: 'bar',
    data: [15, 23, 20, 15, 19, 33, 42]
  }
]

let seriesDataSingleBuz = [
  {
    name: 'Penetration Rate',
    type: 'bar',
    data: []
  },
  {
    name: 'Agile Rate',
    type: 'bar',
    data: []
  },
  {
    name: 'Others Rate',
    type: 'bar',
    data: []
  }
]

let seriesDataDealerBuz = [
  {
    name: 'Penetration Rate',
    type: 'bar',
    data: []
  },
  {
    name: 'Agile Rate',
    type: 'bar',
    data: []
  },
  {
    name: 'Others Rate',
    type: 'bar',
    data: []
  }
]

export default {
  name: 'charts',
  data () {
    return {
      behaviorLegends: ['Visiting Time', 'Report Quantity', 'Training Times', 'Vehicle Audit Times', 'Others'],
      businessLegends: ['Penetration Rate', 'Agile Rate', 'Others Rate'],
      maxYValue: 100,
      KPIType: 'Behavior',
      activeNames: [],
      reset: [],
      filterswitch: false,
      charts: '',
      charts1: '',
      ASMOptions: [],
      KPITypes: [{value: 'Behavior', label: 'Behavior'}, {value: 'Business', label: 'Business'}],
      ASMMulti: [],
      DSMMulti: [],
      Dealers: DealersOptions,
      value3: 'Behavior',
      value4: '',
      value5: [],
      value6: [],
      showMulti: false,
      showDealers: false,
      props: {
        value: 'label',
        children: 'dsms'
      }
    }
  },
  methods: {
    resetSelect () {
      this.value3 = 'Behavior'
      this.value4 = ''
      this.value5 = []
      this.value6 = []
      this.showMulti = false
      this.KPIType = 'Behavior'
      if (this.value3 === 'Behavior') {
        this.drawChart('chart', seriesData, ASMS, this.maxYValue, this.behaviorLegends, 'KPI(%)')
      } else {
        this.drawChart('chart', seriesDataBuz, ASMS, this.maxYValue, this.businessLegends, 'KPI(%)')
      }
    },
    handleKPIType () {
      this.value4 = ''
      this.value5 = []
      this.value6 = []
      this.showMulti = false
      if (this.value3 === 'Behavior') {
        this.drawChart('chart', seriesData, ASMS, this.maxYValue, this.behaviorLegends, 'KPI(%)')
      } else {
        this.drawChart('chart', seriesDataBuz, ASMS, this.maxYValue, this.businessLegends, 'KPI(%)')
      }
    },
    handleASMSelect () {
      if (this.value4) {
        this.showMulti = true
        if (this.value4 === 'ASM1') {
          if (this.value3 === 'Behavior') {
            this.drawChart('chart', seriesData1, DSMS1, this.maxYValue, this.behaviorLegends, 'KPI(%)')
          } else {
            this.drawChart('chart', seriesDataBuz1, DSMS1, this.maxYValue, this.businessLegends, 'KPI(%)')
          }
          this.DSMMulti = DSMMulti1
        } else if (this.value4 === 'ASM2') {
          if (this.value3 === 'Behavior') {
            this.drawChart('chart', seriesData2, DSMS2, this.maxYValue, this.behaviorLegends, 'KPI(%)')
          } else {
            this.drawChart('chart', seriesDataBuz2, DSMS2, this.maxYValue, this.businessLegends, 'KPI(%)')
          }
          this.DSMMulti = DSMMulti2
        } else {
          this.DSMMulti = []
        }
      }
    },
    handleMultiSelect () {
      this.value6 = []
      // reset array
      DSMSingle = []
      for (let j = 0; j < seriesDataSingle.length; j++) {
        seriesDataSingle[j].data = []
      }
      for (let j = 0; j < seriesDataSingleBuz.length; j++) {
        seriesDataSingleBuz[j].data = []
      }
      // assign new value
      if (this.value5.length) {
        for (let i = 0; i < this.value5.length; i++) {
          DSMSingle.push('1DSM' + (i + 1))
        }
        for (let i = 0; i < this.value5.length; i++) {
          for (let j = 0; j < seriesDataSingle.length; j++) {
            seriesDataSingle[j].data.push(parseInt(Math.random() * 100))
          }
          for (let j = 0; j < seriesDataSingleBuz.length; j++) {
            seriesDataSingleBuz[j].data.push(parseInt(Math.random() * 100))
          }
        }
      }
      if (this.value3 === 'Behavior') {
        this.drawChart('chart', seriesDataSingle, DSMSingle, this.maxYValue, this.behaviorLegends, 'KPI(%)')
      } else {
        this.drawChart('chart', seriesDataSingleBuz, DSMSingle, this.maxYValue, this.businessLegends, 'KPI(%)')
      }
    },
    handleMultiDealerSelect () {
      DealerList = []
      for (let j = 0; j < seriesDataDealerBuz.length; j++) {
        seriesDataDealerBuz[j].data = []
      }
      if (this.value6.length) {
        for (let i = 0; i < this.value6.length; i++) {
          DealerList.push('Dealer' + (i + 1))
        }
        for (let i = 0; i < this.value6.length; i++) {
          for (let j = 0; j < seriesDataDealerBuz.length; j++) {
            seriesDataDealerBuz[j].data.push(parseInt(Math.random() * 100))
          }
        }
        this.drawChart('chart', seriesDataDealerBuz, DealerList, 'dataMax', this.businessLegends, 'KPI')
      }
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
            data: curlegends
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisOptions
            }
          ],
          yAxis: [
            {
              name: yAxisName,
              max: maxYValue,
              type: 'value'
            }
          ],
          series: myseriesData
        }
      }, true)
    }
  },

  mounted () {
    // todo: get data from backend
    this.ASMMulti = [{value: 'ASM1', label: 'ASM1'}, {value: 'ASM2', label: 'ASM2'}, {value: 'ASM3', label: 'ASM3'}, {value: 'ASM4', label: 'ASM4'}, {value: 'ASM5', label: 'ASM5'}, {value: 'ASM6', label: 'ASM6'}, {value: 'ASM7', label: 'ASM7'}]
    this.ASMOptions = [{label: 'ASM1', dsms: []}, {label: 'ASM2', dsms: []}, {label: 'ASM3', dsms: []}, {label: 'ASM4', dsms: []}, {label: 'ASM5', dsms: []}, {label: 'ASM6', dsms: []}, {label: 'ASM7', dsms: []}]

    this.$nextTick(function () {
      if (this.value3 === 'Behavior') {
        this.drawChart('chart', seriesData, ASMS, this.maxYValue, this.behaviorLegends, 'KPI(%)')
      } else {
        this.drawChart('chart', seriesDataBuz, ASMS, this.maxYValue, this.businessLegends, 'KPI(%)')
      }
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
.ASMSelect{
  width: 110px;
}
.MultiSelect{
  width: 130px;
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

