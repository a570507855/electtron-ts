electron = require('electron')
const app = electron.app; //控制应用程序的事件生命周期
const BrowserWindow = electron.BrowserWindow; //创建窗体
const globalShortcut = electron.globalShortcut; //注册快捷键


// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  //mainWindow.maximize();
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.loadFile('./dist/index.html');
  mainWindow.on('close', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows.length === 0)
    createWindow();
});

// app.on('browser-window-blur', () => {
//   console.log('主窗体失去焦点');
// });

// app.on('browser-window-focus', () => {
//   console.log('主窗体获得焦点');
// });

// app.on('browser-window-created', () => {
//   console.log('主窗体创建');
// });

// globalShortcut.register("CommandOrControl+E", () => {
//   //切换开发者工具
//   mainWindow.webContents.toggleDevTools();
// });