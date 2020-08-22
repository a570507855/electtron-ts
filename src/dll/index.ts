const ref = require('ref-napi');
const refArray = require('ref-array-napi');

import { Point, Rect } from './Cstruct';
import user32 from './user32';

interface User32 {
  MessageBoxW: Function;
  FindWindowW: Function;
  GetActiveWindow: Function;
  GetCursorPos: Function;
  WindowFromPoint: Function;
  GetWindowRect: Function;
  SendMessageA: Function;
  PostMessageA: Function;
  SetWindowTextW: Function;
}

export default {
  MessageBoxW: (title: string, content: string, HWND: number = 0, type: number = 1): number => {
    return user32.MessageBoxW(HWND, toCString(content), toCString(title), type);
  },

  FindWindowW: (className: string, title: string): number => {
    return user32.FindWindowW(toCString(className), toCString(title));
  },

  GetActiveWindow: (): number => {
    return user32.GetActiveWindow();
  },

  GetCursorPos: (): Promise<Function> => {
    let point = new Point();
    return new Promise((resolve, reject) => {
      user32.GetCursorPos(point.ref()) ? resolve(point) : reject('获取鼠标位置失败');
    })
  },

  WindowFromPoint: () => {
    let point = new Point();
    return user32.GetCursorPos(point.ref()) ? user32.WindowFromPoint(point) : 0;
  },

  GetWindowRect: (HWND: number) => {
    let rect = new Rect();
    return user32.GetWindowRect(HWND, rect.ref()) ? rect : 0;
  },

  SendMessageA: (HWND: number, msg: number, wParam: number, lParam: number) => {
    return user32.SendMessageA(HWND, msg, wParam, lParam);
  },

  PostMessageA: (HWND: number, msg: number, wParam: number, lParam: number) => {
    return user32.PostMessageA(HWND, msg, wParam, lParam);
  },

  SetWindowTextW: (HWND: number, title: string) => {
    return user32.SetWindowTextW(HWND, toCString(title));
  }
};

/**
 * 需要API指定参数类型为ref.refType(ref.types.CString) 或 string
 * @param str js中的字符串
 * @param encoding 编码格式
 */
function toCString(str: string, encoding: string = 'ucs2') {
  return ref.allocCString(str, encoding);
}

