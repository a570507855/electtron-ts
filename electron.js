const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile('./dist/index.html'); //加载html页面
  mainWindow.on('close', () => {
    mainWindow = null;
  })
});