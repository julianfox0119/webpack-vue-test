<template>
    <div class='weather' v-if="weatherInfo">
        <div><h3>{{weatherInfo.currentCity}} | pm2.5-{{weatherInfo.pm25}}</h3></div>   
        <el-row :gutter="10">
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
    </div>
    <p id="preloader_1" v-else>
        no data available!
    </p>
</template>

<script>
export default {
  name: 'resource',
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
