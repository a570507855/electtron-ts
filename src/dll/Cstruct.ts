const Struct = require('ref-struct-napi');
const ref = require('ref-napi');

export const Point = Struct({
  x: ref.types.int32,
  y: ref.types.int32
});

export const Rect = Struct({
  left: ref.types.long,
  top: ref.types.long,
  right: ref.types.long,
  bottom: ref.types.long
})

export const MSG = Struct({
  HWND: ref.types.int32,
  message: ref.types.uint32,
  wParam: ref.types.int32,
  lParam: ref.types.int32,
  time: ref.types.int32,
  pt: Point
})

export const Error = {
  0: "ERROR_SUCCESS: 操作成功",
  1: "ERROR_INVALID_FUNCTION: 无效的函数",
  2: "ERROR_FILE_NOT_FOUND: 系统找不到指定文件",
  3: "ERROR_PATH_NOT_FOUND: 系统找不到指定路径",
  4: "ERROR_TOO_MANY_OPEN_FILES: 系统无法打开文件",
  5: "ERROR_ACCESS_DENIED: 访问被拒绝",
  6: "ERROR_INVALID_HANDLE: 句柄无效"
}