const ffi = require('ffi-napi');
const ref = require('ref-napi');


export default new ffi.Library('kernel32', {
  'GetCurrentProcess':
    [
      'int32', []
    ],
  'GetCurrentProcessId':
    [
      'int32', []
    ],
  'GetCurrentThread':
    [
      'int32', []
    ],
  'GetCurrentThreadId':
    [
      'int32', []
    ],

  'GetLastError':
    [
      'int32', []
    ],
  'SetThreadPriority':
    [
      'int32', ['int32', 'int32']
    ],
})