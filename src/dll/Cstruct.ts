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