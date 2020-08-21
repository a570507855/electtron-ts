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
      <a @click="onMessage" class="button">调用dll弹出message窗口</a>
      <a @click="onFindWindow" class="button is-primary">获取窗体名称为test的句柄</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { type } from 'os'
const fs = require('fs')
const myUser32 = require('./dll/index')
@Component
export default class App extends Vue {
  title: string = '标题'
  fileName: string = './package.json'
  fileContent: string = ''
  windowName: string = '编码.txt - 记事本'
  windowClassName: any = null
  onGetFileContent(): void {
    fs.readFile(this.fileName, (err: any, data: Buffer) => {
      this.fileContent = err ? err : data.toString()
    })
  }

  onMessage(): void {
    myUser32.MessageBoxW('我是message的标题', '我是message的内容')
  }

  onFindWindow(): void {
    const hwnd = myUser32.FindWindowW(this.windowClassName, this.windowName)
    if (hwnd) myUser32.MessageBoxW('找到窗口', hwnd.toString(), 0, 0)
    else myUser32.MessageBoxW('没有找到窗口', hwnd.toString(), 0, 0)
  }
}
</script>