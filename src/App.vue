<template>
  <div id="app">
    <div class="section is-primary">
      <p>哈哈哈 我是vue - {{title}}</p>
      <a @click="onBtnClick" class="button is-primary">vue按钮</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class App extends Vue {
  title: string = '标题'
  onBtnClick(): void {
    console.log('按钮点击')
  }
}
</script>
<style scoped>
</style> 
