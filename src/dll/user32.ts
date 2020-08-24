const ffi = require('ffi-napi');
const ref = require('ref-napi');

import { Point, Rect, MSG } from './Cstruct';

export default new ffi.Library('user32', {
  'MessageBoxW':
    [
      'int32', ['int32', 'string', 'string', 'int32'],
    ],
  'GetForegroundWindow':
    [
      'int32', []
    ],
  'FindWindowW':
    [
      'int32', ['string', 'string']
    ],
  'WindowFromPoint':
    [
      'int32', [Point]
    ],

  'SendMessageW':
    [
      'int32', ['int32', ref.types.uint32, 'int32', 'int32']
    ],
  'GetMessageW':
    [
      'bool', [ref.refType(MSG), 'int32', 'int32', 'int32']
    ],
  'PostMessageW':
    [
      'int32', ['int32', ref.types.uint32, 'int32', 'int32']
    ],
  'PostThreadMessageW':
    [
      'bool', ['int32', ref.types.uint32, 'int32', 'int32']
    ],

  'GetActiveWindow':
    [
      'int32', []
    ],
  'SetActiveWindow':
    [
      'int32', ['int32']
    ],

  'GetCursorPos':
    [
      'bool', [ref.refType(Point)]
    ],
  'SetCursorPos':
    [
      'bool', ['int32', 'int32']
    ],


  'GetWindowRect':
    [
      'bool', ['int32', ref.refType(Rect)]
    ],

  'GetWindowTextW':
    [
      'int32', ['int32', 'string', 'int32']
    ],

  'SetWindowTextW':
    [
      'bool', ['int32', 'string']
    ],

  'GetClassNameW':
    [
      'int32', ['int32', 'string', 'int32']
    ],

  'MoveWindow':
    [
      'bool', ['int32', 'int32', 'int32', 'int32', 'int32', 'bool']
    ],
  'GetWindowThreadProcessId':
    [
      'int32', ['int32', 'int32']
    ],

  'mouse_event':
    [
      'int32', ['int32', 'int32', 'int32', 'int32', 'int32']
    ],
  'SetWindowPos':
    [
      'bool', ['int32', 'int32', 'int32', 'int32', 'int32', 'int32', 'int32']
    ],

  'ChangeWindowMessageFilterEx':
    [
      'bool', ['int32', ref.types.uint32, 'int32']
    ],
  'ShowWindow':
    [
      'bool', ['int32', 'int32']
    ]
});