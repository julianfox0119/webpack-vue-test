<template>
    <div id="counter">
        <button @click="increase">增加 1</button>
        <p>这个按钮被点击了 {{ counter }} 次。</p>
    </div>
</template>

<script>
export default {
  name: 'counter',
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    increase: function (event) {
      // `this` 在方法里指当前 Vue 实例
      this.counter += 1
    }
  }
}
</script>
