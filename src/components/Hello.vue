<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Router Test Links</h2>
    <ul>
      <li><a href="/world">Hello World</a></li>
      <li><a href="/resource">Get Resource</a></li>
      <li><a href="/charts">Get Charts</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
