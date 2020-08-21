const ffi = require('ffi-napi');
// const ref = require('ref-napi');
// const refArray = require('ref-array-napi');
// 通过ffi加载user32.dll
const user32 = new ffi.Library('user32', {
    'MessageBoxW': // 声明这个dll中的一个函数
        [
            'int32', ['int32', 'string', 'string', 'int32'], // 用json的格式罗列其返回类型和参数类型
        ],
    'FindWindow':
        [
            'string', ['string', 'string']
        ]
});

function showText(text: string) {
    return new Buffer(text, 'ucs2').toString('binary');
};

interface User32 {
    MessageBoxW: Function;
    FindWindow: Function;
}
let myUser32: User32 = {
    MessageBoxW: (content: string, title: string) => {
        return user32.MessageBoxW(0, showText(content), showText(title), 1);
    },
    FindWindow: (className: string, title: string) => {
        return user32.FindWindow(className, title);
    }
};

module.exports = myUser32;