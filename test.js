let buf = new Buffer(50);
buf.write('你好啊', 'ucs2')
console.log(buf)
for (let i = 50 - 1; i >= 0; --i) {
  if (buf[i] !== 0) {
    console.log(buf.slice(0, i))
    break;
  }
}