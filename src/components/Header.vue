<template>
  <div id="header">
    <img src="../assets/logo.png">
    <ul>
        <li><a href="/world">Hello World</a></li>
        <li><a href="/resource">Get Resource</a></li>
        <li><a href="/charts">Get Charts</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>


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
