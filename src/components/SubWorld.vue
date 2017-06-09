<template>
  <div class="subworld">
    <h2>{{submsg}}</h2>
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'subworld',
  props: ['message'],
  data () {
    return {
      submsg: 'Sub Hello World'
    }
  }
}
</script>
