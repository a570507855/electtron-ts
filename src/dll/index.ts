const ffi = require('ffi-napi');
const ref = require('ref-napi');
const refArray = require('ref-array-napi');
const iconv = require('iconv-lite')

// 通过ffi加载user32.dll
const user32 = new ffi.Library('user32', {
  'MessageBoxW': // 声明这个dll中的一个函数
    [
      'int32', ['int32', 'string', 'string', 'int32'],
    ],
  'FindWindowW':
    [
      'int32', ['string', 'string']
    ]
});
interface User32 {
  MessageBoxW: Function;
  FindWindowW: Function;
}
let myUser32: User32 = {
  MessageBoxW: (title: string, content: string, HWND: number = 0, type: number = 1): number => {
    return user32.MessageBoxW(HWND, toCString(content), toCString(title), type);
  },
  FindWindowW: (className: string, title: string): number => {
    return user32.FindWindowW(toCString(className), toCString(title));
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
module.exports = myUser32;