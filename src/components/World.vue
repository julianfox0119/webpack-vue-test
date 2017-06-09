<template>
  <div class="world">
    <h2>{{msg}}</h2>
    <SubWorld message="test props!"></SubWorld>
    <Counter></Counter>
  </div>
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
