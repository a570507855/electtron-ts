<template>
  <div id="app">
    <!-- <div class="section">
      <a @click="onGetFileContent" class="button is-primary">获取文件内容</a>
      <div class="message">
        <div class="message-header">{{fileName}}</div>
        <div class="message-body">
          <div>{{fileContent}}</div>
        </div>
      </div>
    </div>-->
    <div class="section">
      <div class="field is-grouped">
        <div class="control">
          <a @click="onFindWindow" class="button is-primary">
            <i class="fa fa-search is-left"></i>
            查找
          </a>
        </div>
        <div class="control">
          <a @click="onSetWindowTitle" class="button is-primary">设置标题</a>
        </div>
        <div class="control">
          <a @click="onSetActiveWindow" class="button is-primary">设置活跃窗口</a>
        </div>
        <div class="control">
          <a @click="onShowWindow" class="button is-primary">显示</a>
        </div>
        <div class="control">
          <a @click="onHideWindow" class="button is-primary">隐藏</a>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">窗口类名:</label>
          <input class="input" placeholder="窗口类名" v-model="windowClassName" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">窗口标题:</label>
          <input class="input" placeholder="窗口标题" v-model="windowTitle" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">窗口句柄:</label>
          <input class="input" readonly v-model="HWND_HEX" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">前台窗口句柄:</label>
          <input class="input" readonly v-model="foregroundHWND_HEX" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">活跃窗口句柄:</label>
          <input class="input" readonly v-model="activeHWND_HEX" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">窗口进程ID:</label>
          <input class="input" placeholder="窗口进程id" type="text" v-model="windowProcessid_HEX" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label">窗口线程ID:</label>
          <input class="input" placeholder="窗口线程id" type="text" v-model="windowThreadid_HEX" />
        </div>
      </div>
      <div class="field">
        <div class="congtrol">
          <label class="label">当前进程伪句柄:</label>
          <input class="input" readonly v-model="curProcess" />
        </div>
      </div>
      <div class="field">
        <div class="congtrol">
          <label class="label">当前进程ID:</label>
          <input class="input" readonly v-model="curProcessid_HEX" />
        </div>
      </div>
      <div class="field">
        <div class="congtrol">
          <label class="label">当前线程伪句柄:</label>
          <input class="input" readonly v-model="curThread" />
        </div>
      </div>
      <div class="field">
        <div class="congtrol">
          <label class="label">当前线程ID:</label>
          <input class="input" readonly v-model="curThreadid_HEX" />
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
      <div class="field is-grouped level">
        <div class="control">
          <input class="input" placeholder="鼠标x坐标" type="text" v-model="cursorPos.x" />
        </div>
        <div class="control">
          <input class="input" placeholder="鼠标y坐标" type="text" v-model="cursorPos.y" />
        </div>
        <div class="control">
          <a @click="onSetCursorPos" class="button is-primary">设置鼠标位置</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import win32API from './dll/index'
import { wMsg, wParam } from './dll/Cenum'
import { Point, Rect, MSG } from './dll/Cstruct'
import { win32 } from 'path'

const ref = require('ref-napi')
const { globalShortcut } = require('electron').remote
const fs = require('fs')

@Component
export default class App extends Vue {
  fileName: string = './package.json'
  fileContent: string = ''
  windowTitle: string = ''
  windowClassName: any = null
  windowHWND: number = 0
  foregroundHWND: number = 0
  activeHWND: number = 0
  windowPoint: Object = { x: 0, y: 0 }
  windowRect: Object = { left: 0, right: 0, top: 0, bottom: 0 }
  windowProcessid: number = 0
  windowThreadid: number = 0
  cursorPos = { x: 0, y: 0 }
  curProcess: number = 0
  curProcessid: number = 0
  curThread: number = 0
  curThreadid: number = 0

  get HWND_HEX(): string {
    return this.toHEX(this.windowHWND)
  }

  get foregroundHWND_HEX(): string {
    return this.toHEX(this.foregroundHWND)
  }

  get activeHWND_HEX(): string {
    return this.toHEX(this.activeHWND)
  }

  get windowProcessid_HEX(): string {
    return this.toHEX(this.windowProcessid)
  }

  get windowThreadid_HEX(): string {
    return this.toHEX(this.windowThreadid)
  }

  get curProcessid_HEX(): string {
    return this.toHEX(this.curProcessid)
  }

  get curThreadid_HEX(): string {
    return this.toHEX(this.curThreadid)
  }

  onGetFileContent(): void {
    fs.readFile(this.fileName, (err: any, data: Buffer) => {
      this.fileContent = err ? err : data.toString()
    })
  }

  onFindWindow(): void {
    this.windowHWND = win32API.FindWindowW(
      this.windowClassName,
      this.windowTitle
    )
  }

  onSetWindowTitle(): void {
    if (!this.windowHWND) return

    win32API.SetWindowTextW(this.windowHWND, this.windowTitle)
  }

  onSetCursorPos(): void {
    win32API.SetCursorPos(this.cursorPos.x, this.cursorPos.y)
  }

  onSetActiveWindow() {
    this.activeHWND = win32API.SetActiveWindow(this.windowHWND)
  }

  onShowWindow() {
    if (!this.windowThreadid) return

    let isShow = win32API.PostMessageW(
      this.windowHWND,
      wMsg.WM_SHOWWINDOW,
      1,
      0
    )

    if (!isShow) {
      let err = win32API.GetLastError()
      console.log(err)
    }
  }

  onHideWindow() {
    if (!this.windowThreadid) return

    let isHide = win32API.PostMessageW(
      this.windowHWND,
      wMsg.WM_SHOWWINDOW,
      0,
      0
    )
    if (!isHide) {
      let err = win32API.GetLastError()
      console.log(err)
    }
  }

  mounted(): void {
    setInterval(() => {
      this.foregroundHWND = win32API.GetForegroundWindow()
      this.activeHWND = win32API.GetActiveWindow()
      this.windowPoint = win32API.GetCursorPos()
      this.curProcess = win32API.GetCurrentProcess()
      this.curProcessid = win32API.GetCurrentProcessId()
      this.curThread = win32API.GetCurrentThread()
      this.curThreadid = win32API.GetCurrentThreadId()
      if (!win32API.SetThreadPriority(this.curThread, 15)) {
        console.log(win32API.GetLastError())
      }

      if (!this.windowHWND) return

      let chang1 = win32API.ChangeWindowMessageFilterEx(
        this.windowHWND,
        wMsg.WM_SHOWWINDOW,
        1
      )
      if (!chang1) {
        console.log(
          'ChangeWindowMessageFilterEx - WM_SHOWWINDOW:',
          win32API.GetLastError()
        )
      }
      let chang2 = win32API.ChangeWindowMessageFilterEx(
        this.windowHWND,
        wMsg.WM_MOUSEMOVE,
        1
      )
      if (!chang2) {
        console.log(
          'ChangeWindowMessageFilterEx - WM_MOUSEMOVE:',
          win32API.GetLastError()
        )
      }
      this.windowRect = win32API.GetWindowRect(this.windowHWND)
      this.windowTitle = win32API.GetWindowTextW(this.windowHWND, 100)
      this.windowClassName = win32API.GetClassNameW(this.windowHWND, 100)
      this.windowThreadid = win32API.GetWindowThreadProcessId(
        this.windowHWND,
        this.windowProcessid
      )
    }, 500)

    //注册全局按键
    globalShortcut.register('1', () => {
      if (!this.windowHWND) return
      win32API.SetWindowPos(this.windowHWND, 0, 0, 0, 1920, 1080, 0x0040)
    })

    globalShortcut.register('2', () => {
      if (!this.windowHWND) return

      let nHittest = win32API.SendMessageW(
        this.windowHWND,
        wMsg.WM_NCHITTEST,
        0,
        this.getLparamPoint(50, 50)
      )
      //0x1 客户区
      console.log('WM_NCHITTEST:', nHittest)
    })

    globalShortcut.register('CommandOrControl+Shift+Z', () => {
      if (!this.windowHWND) return
      win32API.MoveWindow(this.windowHWND, 0, 0, 1920, 1080, false)
    })

    globalShortcut.register('CommandOrControl+E', () => {
      this.windowHWND = win32API.WindowFromPoint()
    })

    globalShortcut.register('CommandOrControl+R', () => {
      if (!this.windowHWND) return
      this.windowRect = win32API.GetWindowRect(this.windowHWND)
    })

    globalShortcut.register('CommandOrControl+G', () => {
      if (!this.windowHWND) return

      let isSuccess = win32API.SendMessageW(
        this.windowHWND,
        wMsg.WM_MOUSEMOVE,
        0,
        (932 >> 16) + 200
      )

      if (!isSuccess) {
        console.log('mousemove:', win32API.GetLastError())
      }
    })
  }

  /**
   *
   * @param x x坐标  位于低位(二进制中右边)
   * @param y y坐标  位于高位(二进制中左边)
   */
  getLparamPoint(x: number, y: number) {
    return (y << 16) + x
  }

  toHEX(HWND: number) {
    return `DEC: ${HWND}  -  HEX: ${Number(HWND).toString(16).toUpperCase()}`
  }
}
</script>