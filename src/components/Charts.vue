<template>
    <div id="chart_container"> 
      <!-- <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          Time Scope<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
         <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">Years</el-dropdown-item>
          <el-dropdown-item command="b">Quarters</el-dropdown-item>
        </el-dropdown-menu> 
      </el-dropdown> -->
      <!-- <div id="yearFilter" v-if="filters === 'a'">
        <div class="block">
          <span class="demonstration">年</span>
          <el-date-picker
            v-model="value5"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
      </div>
      <div id="quaterFilter" v-if="filters === 'b'">Quarters</div> -->
      <div id="yearFilter">
        <div class="block">
          <span class="demonstration">年</span>
          <el-date-picker
            v-model="value5"
            @change="handleCommand"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
      </div>
      <div id="quaterFilter" v-if="value5">
         <!-- todo: using radio button instead  -->
         <!-- <el-button type="primary" @click="setquater">Quater 1</el-button>
         <el-button type="primary" @click="setquater">Quater 2</el-button>
         <el-button type="primary" @click="setquater">Quater 3</el-button>
         <el-button type="primary" @click="setquater">Quater 4</el-button> -->
      </div>
      <div id="chart" class="chartCanvas"></div>
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'charts',
  data () {
    return {
      value5: '',
      filters: '',
      charts: '',
      opinion: [ '直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎' ],
      opinionData: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1549, name: '搜索引擎'}
      ],
      opinion1: [ '直接访问', '邮件营销', '联盟广告' ],
      opinionData1: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'}
      ]
    }
  },
  methods: {
    setquater () {
      console.log(this)
    },
    handleCommand () {
      this.drawPie('chart', this.opinion1, this.opinionData1)
      // this.filters = command
    },
    drawPie (id, opinion, opinionData) {
      if (!this.charts) {
        this.charts = echarts.init(document.getElementById(id))
      }
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: opinion
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: opinionData
          }
        ]
      })
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.drawPie('chart', this.opinion, this.opinionData)
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
  text-align: center;  
}
</style>
