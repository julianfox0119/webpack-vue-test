<template>
    <div class='weather' v-if="weatherInfo">
        <div><h3>{{weatherInfo.currentCity}} | pm2.5-{{weatherInfo.pm25}} | {{weatherInfo.weather_data.length}}</h3></div>   
        <el-row type="flex" class="row-bg" justify="center" >
            <el-col :span="3" v-for="item in weatherInfo.weather_data" :key="item.id" class='detail'>
                <p title="详情" class='date'>{{item.date.slice(0,10)}}</p>
                <p>
                    <img :src="item.dayPictureUrl">
                    <img :src="item.nightPictureUrl">
                </p>
                <p>{{item.weather}}</p>
                <p>{{item.wind}}</p>
                <p>{{item.temperature}}</p>
            </el-col>
        </el-row>
        <Counter></Counter>
    </div>
    <p id="preloader_1" v-else>
        no data available!
    </p>
</template>

<script>
import Counter from './Counter'

export default {
  name: 'resource',
  components: {
    Counter
  },
  data () {
    return {
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=HGOUnCXeQLEeywhGOu2jU29PFdC6duFF',
      weatherInfo: null,
      timer: null
    }
  },
  created () {
    this.getWeather()
  },
  methods: {
    getWeather () {
      this.$http.jsonp(this.url)
        .then((response) => {
          if (response) {
            console.log(response)
            this.weatherInfo = response.data.results[0]
          } else {
            this.getWeather()
          }
        })
    }
  }
}
</script>
