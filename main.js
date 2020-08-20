const electron = require('electron')
const app = electron.app; //控制应用程序的事件生命周期
const BrowserWindow = electron.BrowserWindow; //创建窗体
const globalShortcut = electron.globalShortcut; //注册快捷键

// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    // width: 800,
    // height: 800,
    show: false,

    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.maximize();
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadFile('./dist/index.html');
  //打开开发者工具
  //mainWindow.webContents.openDevTools();
  mainWindow.on('close', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  //   globalShortcut.register('CommandOrControl+W', () => {
  //     console.log("ctrl + W");
  //   });

  //   globalShortcut.register('enter', () => {
  //     console.log('enter');
  //     return;
  //   })

  globalShortcut.register('CommandOrControl+Shift+Z', () => {
    console.log('ctrl + shift + z');
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});

app.on('activate', () => {
  console.log('active');
  if (BrowserWindow.getAllWindows.length === 0)
    createWindow();
});

app.on('browser-window-blur', () => {
  console.log('主窗体失去焦点');
});

app.on('browser-window-focus', () => {
  console.log('主窗体获得焦点');
});

app.on('browser-window-created', () => {
  console.log('主窗体创建');
});

console.log(app.getAppPath())