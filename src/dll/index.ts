const ref = require('ref-napi');
const refArray = require('ref-array-napi');

import { Point, Rect } from './Cstruct';
import user32 from './user32';
import kernel32 from './kernel32';

export default {
  MessageBoxW: (title: string, content: string, HWND: number = 0, type: number = 1): number => {
    return user32.MessageBoxW(HWND, toCString(content), toCString(title), type);
  },

  GetForegroundWindow: () => {
    return user32.GetForegroundWindow();
  },

  FindWindowW: (className: string, title: string): number => {
    return user32.FindWindowW(toCString(className), toCString(title));
  },

  WindowFromPoint: () => {
    let point = new Point();
    return user32.GetCursorPos(point.ref()) ? user32.WindowFromPoint(point) : 0;
  },

  SendMessageW: (HWND: number, msg: number, wParam: number, lParam: number) => {
    return new Promise((resolve, reject) => {
      let res = user32.SendMessageW(HWND, msg, wParam, lParam);
      res ? resolve(res) : reject(kernel32.GetLastError());
    });
  },

  GetMessageW: (PMSG: any, HWND: number, firstMSG: number, lastMSG: number) => {
    return user32.GetMessageW(PMSG, HWND, firstMSG, lastMSG);
  },

  PostMessageW: (HWND: number, msg: number, wParam: number, lParam: number) => {
    return new Promise((resolve, reject) => {
      let res = user32.PostMessageW(HWND, msg, wParam, lParam);
      res ? resolve(res) : reject(kernel32.GetLastError());
    });
  },

  PostThreadMessageW: (threadid: number, msg: number, wParam: number, lParam: number) => {
    return user32.PostThreadMessageW(threadid, msg, wParam, lParam);
  },

  GetActiveWindow: (): number => {
    return user32.GetActiveWindow();
  },
  SetActiveWindow: (HWND: number) => {
    return user32.SetActiveWindow(HWND);
  },

  GetCursorPos: (): Promise<Function> => {
    let point = new Point();
    user32.GetCursorPos(point.ref());
    return point;
  },
  SetCursorPos: (x: number, y: number): boolean => {
    return user32.SetCursorPos(x, y);
  },

  GetWindowRect: (HWND: number) => {
    let rect = new Rect();
    return user32.GetWindowRect(HWND, rect.ref()) ? rect : 0;
  },

  GetWindowTextW: (HWND: number, length: number) => {
    let str_buf = new Buffer(length);
    user32.GetWindowTextW(HWND, str_buf, length);
    return bufTrim(str_buf).toString('ucs2');
  },

  SetWindowTextW: (HWND: number, title: string): boolean => {
    return user32.SetWindowTextW(HWND, toCString(title));
  },

  GetClassNameW: (HWND: number, length: number) => {
    let str_buf = new Buffer(length);
    user32.GetClassNameW(HWND, str_buf, length);
    return bufTrim(str_buf).toString('ucs2');
  },

  MoveWindow: (HWND: number, x: number, y: number, width: number, height: number, isRedraw: boolean) => {
    return user32.MoveWindow(HWND, x, y, width, height, isRedraw);
  },

  ChangeWindowMessageFilterEx: (HWND: number, wMsg: number, flag: number) => {
    return user32.ChangeWindowMessageFilterEx(HWND, wMsg, flag);
  },

  GetWindowThreadProcessId: (HWND: number, processid: number) => {
    return user32.GetWindowThreadProcessId(HWND, processid);
  },

  mouse_event: (flags: number, x: number, y: number, data: number, extrainfo: number) => {
    return user32.mouse_event(flags, x, y, data, extrainfo);
  },

  SetWindowPos: (HWND: number, HWNDSetAfter: number, x: number, y: number, cx: number, cy: number, flags: number): boolean => {
    return user32.SetWindowPos(HWND, HWNDSetAfter, x, y, cx, cy, flags)
  },

  ShowWindow: (HWND: number, showStatus: number) => {
    return user32.ShowWindow(HWND, showStatus);
  },

  GetCurrentProcess: () => {
    return kernel32.GetCurrentProcess();
  },

  GetCurrentProcessId: () => {
    return kernel32.GetCurrentProcessId();
  },

  GetCurrentThread: () => {
    return kernel32.GetCurrentThread();
  },

  GetCurrentThreadId: () => {
    return kernel32.GetCurrentThreadId();
  },

  GetLastError: () => {
    return kernel32.GetLastError();
  },

  SetThreadPriority: (threadHWND: number, priority: number) => {
    return kernel32.SetThreadPriority(threadHWND, priority);
  },

};

/**
 * 需要API指定参数类型为ref.refType(ref.types.CString) 或 string
 * @param str js中的字符串
 * @param encoding 编码格式
 */
function toCString(str: string, encoding: string = 'ucs2') {
  return ref.allocCString(str, encoding);
}

/**
 * 去除Buffer尾端的空白数据
 * @param buf 
 */
function bufTrim(buf: Buffer) {
  let new_buf = new Buffer(0);
  for (let i = buf.length - 1; i >= 0; --i) {
    if (buf[i] !== 0) {
      new_buf = buf.slice(0, i + 2);
      break;
    }
  }
  return new_buf;
}

