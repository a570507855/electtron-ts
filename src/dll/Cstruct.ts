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