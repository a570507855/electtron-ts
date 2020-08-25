<template>
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
        <a @click="onToggleShowWindow" class="button is-primary">显示/隐藏</a>
      </div>
      <div class="control">
        <a @click="onToggleMaxmizeWindow" class="button is-primary">最大化/最小化</a>
      </div>
      <div class="control">
        <a @click="onReduction" class="button is-primary">还原</a>
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
        <label class="label">width:</label>
      </div>
      <div class="control">
        <input class="input" readonly v-model="windowWidth" />
      </div>
      <div class="control">
        <label class="label">left:</label>
      </div>
      <div class="control">
        <input class="input" readonly v-model="windowHeight" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import win32API from '../../dll/index';
import util from '../../util/util';
import { wMsg, wParam, nCmdShow } from '../../dll/Cenum';
import { Point, Rect, MSG } from '../../dll/Cstruct';
import { win32 } from 'path';

const { globalShortcut } = require('electron').remote;

@Component
export default class Features extends Vue {
  isShow: boolean = true;
  isMaxmize: boolean = false;
  windowTitle: string = '';
  windowClassName: any = null;
  windowHWND: number = 0;
  activeHWND: number = 0;

  windowRect: any = { left: 0, right: 0, top: 0, bottom: 0 };

  get HWND_HEX(): string {
    return util.toHEX(this.windowHWND);
  }

  get windowWidth(): number {
    return this.windowRect.right - this.windowRect.left;
  }

  get windowHeight(): number {
    return this.windowRect.bottom - this.windowRect.top;
  }

  onFindWindow(): void {
    this.windowHWND = win32API.FindWindowW(
      this.windowClassName,
      this.windowTitle
    );
  }

  onSetWindowTitle(): void {
    if (!this.windowHWND) return;

    win32API.SetWindowTextW(this.windowHWND, this.windowTitle);
  }

  onToggleShowWindow() {
    if (!this.windowHWND) return;

    let showStatus = this.isShow ? nCmdShow.SW_HIDE : nCmdShow.SW_SHOW;
    this.isShow = !this.isShow;
    win32API.ShowWindow(this.windowHWND, showStatus);
  }

  onToggleMaxmizeWindow() {
    if (!this.windowHWND) return;

    let maxmizeStatus = this.isMaxmize
      ? nCmdShow.SW_SHOWMINIMIZED
      : nCmdShow.SW_SHOWMAXIMIZED;
    this.isMaxmize = !this.isMaxmize;
    win32API.ShowWindow(this.windowHWND, nCmdShow.SW_SHOWNORMAL);
    win32API.ShowWindow(this.windowHWND, maxmizeStatus);
  }

  onSetActiveWindow() {
    this.activeHWND = win32API.SetActiveWindow(this.windowHWND);
  }

  onReduction() {
    if (!this.windowHWND) return;

    win32API.ShowWindow(this.windowHWND, nCmdShow.SW_SHOWNORMAL);
  }

  lButtonDown(x: number, y: number) {
    if (!this.windowHWND) return;

    win32API.PostMessageW(
      this.windowHWND,
      wMsg.WM_LBUTTONDOWN,
      wParam.MK_LBUTTON,
      util.getLparamPoint(x, y)
    );
    win32API.PostMessageW(
      this.windowHWND,
      wMsg.WM_LBUTTONUP,
      0,
      util.getLparamPoint(x, y)
    );
  }
  mounted(): void {
    setInterval(() => {
      if (!this.windowHWND) return;

      this.windowRect = win32API.GetWindowRect(this.windowHWND);
    }, 500);

    //注册全局按键
    globalShortcut.register('CommandOrControl+E', () => {
      this.windowHWND = win32API.WindowFromPoint();
      this.windowTitle = win32API.GetWindowTextW(this.windowHWND, 100);
      this.windowClassName = win32API.GetClassNameW(this.windowHWND, 100);
    });
  }
}
</script>
