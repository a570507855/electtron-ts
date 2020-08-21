<template>
  <div id="app">
    <div class="section">
      <a @click="onGetFileContent" class="button is-primary">获取文件内容</a>
      <div class="message">
        <div class="message-header">{{fileName}}</div>
        <div class="message-body">
          <div>{{fileContent}}</div>
        </div>
      </div>
    </div>
    <div class="section">
      <a  class="button" @click="onMessage">调用dll弹出message窗口</a>
      <a class="button is-primary" @click="onFindWindow">获取窗体名称为test的句柄</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const fs = require('fs')
const myUser32 = require('./dll/index');
@Component
export default class App extends Vue {
  title: string = '标题'
  fileName: string = './package.json'
  fileContent: string = ''
  onGetFileContent(): void {
    fs.readFile(this.fileName, (err: any, data: Buffer) => {
      this.fileContent = err ? err : data.toString()
    })
  }
  onMessage():void {
    myUser32.MessageBoxW('内容','标题');
  }
  onFindWindow():void {
    myUser32.FindWindow(null,'test');
  }
}
</script>