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
      <div class="field is-grouped">
        <div class="control">
          <input class="input" placeholder="窗口类名" v-model="windowClassName" />
        </div>
        <div class="control">
          <input class="input" placeholder="窗口标题" v-model="windowName" />
        </div>
        <div class="control">
          <a @click="onFindWindow" class="button is-primary">
            <i class="fa fa-search is-left"></i>
            查找
          </a>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">窗口句柄:</label>
          <input class="input" readonly v-model="HWND_HEX" />
        </div>
      </div>
      <div class="field is-grouped level">
        <div class="control">
          <label class="label">left:</label>
        </div>
        <div class="control">
          <input class="input" readonly v-model="windowRect.left" />
        </div>
        <div class="control">
          <label class="label">right:</label>
        </div>
        <div class="control">
          <input class="input" readonly v-model="windowRect.right" />
        </div>
        <div class="control">
          <label class="label">top:</label>
        </div>
        <div class="control">
          <input class="input" readonly v-model="windowRect.top" />
        </div>
        <div class="control">
          <label class="label">bottom:</label>
        </div>
        <div class="control">
          <input class="input" readonly v-model="windowRect.bottom" />
        </div>
      </div>
      <div class="field is-grouped level">
        <div class="control">
          <label class="label">鼠标X:</label>
        </div>
        <div class="control">
          <input class="input" readonly v-model="windowPoint.x" />
        </div>
        <div class="control">
          <label class="label">鼠标Y:</label>
        </div>
        <div class="control">
          <input class="input" readonly v-model="windowPoint.y" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import myUser32 from './dll/index'

const { globalShortcut } = require('electron').remote
const fs = require('fs')

@Component
export default class App extends Vue {
  title: string = '标题'
  fileName: string = './package.json'
  fileContent: string = ''
  windowName: string = ''
  windowClassName: any = null
  windowHWND: number = 0
  windowPoint: Object = { x: 0, y: 0 }
  windowRect: Object = { left: 0, right: 0, top: 0, bottom: 0 }

  get HWND_HEX(): string {
    return `DEC: ${this.windowHWND}  -  HEX: ${Number(this.windowHWND)
      .toString(16)
      .toUpperCase()}`
  }

  onGetFileContent(): void {
    fs.readFile(this.fileName, (err: any, data: Buffer) => {
      this.fileContent = err ? err : data.toString()
    })
  }

  onFindWindow(): void {
    this.windowHWND = myUser32.FindWindowW(
      this.windowClassName,
      this.windowName
    )
  }

  mounted(): void {
    //注册全局按键
    globalShortcut.register('CommandOrControl+Shift+Z', () => {
      console.log(myUser32.GetActiveWindow())
    })

    globalShortcut.register('CommandOrControl+Q', () => {
      myUser32
        .GetCursorPos()
        .then((point: any) => {
          this.windowPoint = point
        })
        .catch((err: string) => {
          console.log(err)
        })
    })

    globalShortcut.register('CommandOrControl+E', () => {
      this.windowHWND = myUser32.WindowFromPoint()
    })

    globalShortcut.register('CommandOrControl+R', () => {
      if (!this.windowHWND) return
      this.windowRect = myUser32.GetWindowRect(this.windowHWND)
    })
  }
}
</script>