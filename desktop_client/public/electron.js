const { app, BrowserWindow, Menu } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');
const URL_PORT = 'http://localhost:3000';


let mainWindow;
let menuApplication = [
  {
    label: 'Opciones',
    submenu: [
      {
        label: 'Ventas',
        accelerator: 'Ctrl + S',
        click: () => openSales()
      }
    ]
  },
  {
    label: 'Herramientas',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: 'F12',
        click: () => mainWindow.webContents.toggleDevTools()
      },
      {
        label: 'Reload',
        accelerator: 'Ctrl + R',
        click: () => mainWindow.webContents.reload()
      }
    ]
  }
];

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1150,
    height: 680,
    icon: __dirname + '/heladeria.ico',
    center: true,
    minWidth: 1150,
    minHeight: 680,
  });
  mainWindow.loadURL(isDev ? `${URL_PORT}` : `file://${path.join(__dirname, '../build/index.html')}`);

  // Open the DevTools.
  //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
  // if (isDev) mainWindow.webContents.openDevTools();

  let menu = Menu.buildFromTemplate(menuApplication);
  mainWindow.setMenu(menu);
  mainWindow.on('closed', () => mainWindow = null);
}

// To open option Sales
function openSales() {
  let saleWindow = new BrowserWindow({
    icon: __dirname + '/heladeria.ico',
    width: 1150,
    height: 680,
    show: false,
    fullscreen: true,
    autoHideMenuBar: true,
    minWidth: 1150,
    minHeight: 680,
  });
  saleWindow.loadURL(isDev ? `${URL_PORT}` : `file://${path.join(__dirname, '../build/index.html')}`);
  // saleWindow.setMenu(null);
  saleWindow.once('ready-to-show', () => saleWindow.show());
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});