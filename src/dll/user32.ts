const ffi = require('ffi-napi');
const ref = require('ref-napi');

import { Point, Rect } from './Cstruct';

export default new ffi.Library('user32', {
  'MessageBoxW':
    [
      'int32', ['int32', 'string', 'string', 'int32'],
    ],
  'FindWindowW':
    [
      'int32', ['string', 'string']
    ],
  'GetActiveWindow':
    [
      'int32', []
    ],
  'GetCursorPos':
    [
      'bool', [ref.refType(Point)]
    ],
  'WindowFromPoint':
    [
      'int32', [Point]
    ],
  'GetWindowRect':
    [
      'bool', ['int32', ref.refType(Rect)]
    ],
  'SendMessageA':
    [
      'int32', ['int32', ref.types.uint32, 'int32', 'int32']
    ],
  'PostMessageA':
    [
      'int32', ['int32', ref.types.uint32, 'int32', 'int32']
    ],
  'SetWindowTextW':
    [
      'bool', ['int32', 'string']
    ]
});