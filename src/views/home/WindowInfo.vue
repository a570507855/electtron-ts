<template>
  <div id="windowInfo">
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
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import win32API from '../../dll/index'
import util from '../../util/util'
import { wMsg, wParam, nCmdShow } from '../../dll/Cenum'
import { Point, Rect, MSG } from '../../dll/Cstruct'

@Component
export default class WindowInfo extends Vue {
  windowProcessid: number = 0
  windowThreadid: number = 0
  cursorPos = { x: 0, y: 0 }
  curProcess: number = 0
  curProcessid: number = 0
  curThread: number = 0
  curThreadid: number = 0

  get windowProcessid_HEX(): string {
    return util.toHEX(this.windowProcessid)
  }

  get windowThreadid_HEX(): string {
    return util.toHEX(this.windowThreadid)
  }

  get curProcessid_HEX(): string {
    return util.toHEX(this.curProcessid)
  }

  get curThreadid_HEX(): string {
    return util.toHEX(this.curThreadid)
  }

  onSetCursorPos(): void {
    win32API.SetCursorPos(this.cursorPos.x, this.cursorPos.y)
  }

  mouted(): void {
    this.curProcess = win32API.GetCurrentProcess()
    this.curProcessid = win32API.GetCurrentProcessId()
    this.curThread = win32API.GetCurrentThread()
    this.curThreadid = win32API.GetCurrentThreadId()
  }
}
</script>