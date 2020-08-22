let point = {
  x: 257,
  y: 100
}

console.log(point)
let buf1 = new Buffer(4);
buf1.writeInt32LE(point.x);

console.log('offset:', buf1.offset)
let buf2 = new Buffer(4);
buf2.writeInt32LE(point.y)

let buf3 = new Buffer(8);
for (let i = 0; i < buf1.length; i++) {
  buf3[i] = buf1[i];
  buf3[i + 4] = buf2[i];

}
console.log(buf3)
console.log(buf3.offset)

// for (let i = 0; i < buf3.length; ++i) {
//   console.log(i, buf3[i])
// }
for (let i in buf3) {
  console.log(i, buf3[i])
}