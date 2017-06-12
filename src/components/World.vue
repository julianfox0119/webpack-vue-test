<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="world">
        <h2>{{msg}}</h2>              
      </div>
    </el-col>
    <el-col :span="6">
      <SubWorld message="test props!"></SubWorld>
    </el-col>
    <el-col :span="6">
      <Counter></Counter>
    </el-col>
  </el-row>
</template>

<script>
import SubWorld from './SubWorld'
import Counter from './Counter'

export default {
  name: 'world',
  components: {
    SubWorld,
    Counter
  },
  data () {
    return {
      msg: 'Hello World'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
