const fs = require('fs');

window.onload = () => {
  const fileNameEl: HTMLElement | null = document.getElementById('fileName');
  const fileContent: HTMLElement | null = document.getElementById('fileContent');
  const btn: HTMLElement | null = document.getElementById('btn');
  if (!btn) return console.error("不存在id为btn的元素");
  if (!fileNameEl) return console.error("不存在id为fileName的元素");
  if (!fileContent) return console.error("不存在id为fileContent的元素");
  const fileName = './package.json'
  fileNameEl.innerHTML = fileName;
  btn.addEventListener("click", () => {
    fs.readFile(fileName, (err: any, data: Buffer) => {

      if (err)
        return fileContent.innerHTML = err;

      fileContent.innerHTML = data.toString();
    });
  });
};