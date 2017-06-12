<template>
    <div id="counter">
        <p>这个按钮被点击了 {{ counter }} 次。</p>
        <el-button type="primary" @click="increase">增加 1</el-button>
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
