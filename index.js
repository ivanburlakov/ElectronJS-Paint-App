const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const About = require("./About.js");

let win;

let color = '#ffff00';
let shape = 'PointShape';
let fill = true;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    },
  });

  win.loadFile('index.html');

  //win.webContents.openDevTools();

  let menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          label: 'Close',
          role: "quit",
        },
        {
          label: 'Reload',
          role: "reload",
        },
      ],
    },
    {
      label: "Color",
      submenu: [
        {
          label: 'White',
          id: 'White',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('White').checked = true;
            menu.getMenuItemById('Yellow').checked = false;
            menu.getMenuItemById('Green').checked = false;
            menu.getMenuItemById('Blue').checked = false;
            menu.getMenuItemById('Pink').checked = false;
            menu.getMenuItemById('Orange').checked = false;
            menu.getMenuItemById('Grey').checked = false;
            color = '#ffffff';
          },
        },
        {
          label: 'Yellow',
          id: 'Yellow',
          type: 'checkbox',
          checked: true,
          click() {
            menu.getMenuItemById('White').checked = false;
            menu.getMenuItemById('Yellow').checked = true;
            menu.getMenuItemById('Green').checked = false;
            menu.getMenuItemById('Blue').checked = false;
            menu.getMenuItemById('Pink').checked = false;
            menu.getMenuItemById('Orange').checked = false;
            menu.getMenuItemById('Grey').checked = false;
            color = '#ffff00';
          },
        },
        {
          label: 'Green',
          id: 'Green',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('White').checked = false;
            menu.getMenuItemById('Yellow').checked = false;
            menu.getMenuItemById('Green').checked = true;
            menu.getMenuItemById('Blue').checked = false;
            menu.getMenuItemById('Pink').checked = false;
            menu.getMenuItemById('Orange').checked = false;
            menu.getMenuItemById('Grey').checked = false;
            color = '#00ff00';
          },
        },
        {
          label: 'Blue',
          id: 'Blue',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('White').checked = false;
            menu.getMenuItemById('Yellow').checked = false;
            menu.getMenuItemById('Green').checked = false;
            menu.getMenuItemById('Blue').checked = true;
            menu.getMenuItemById('Pink').checked = false;
            menu.getMenuItemById('Orange').checked = false;
            menu.getMenuItemById('Grey').checked = false;
            color = '#00ffff';
          },
        },
        {
          label: 'Pink',
          id: 'Pink',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('White').checked = false;
            menu.getMenuItemById('Yellow').checked = false;
            menu.getMenuItemById('Green').checked = false;
            menu.getMenuItemById('Blue').checked = false;
            menu.getMenuItemById('Pink').checked = true;
            menu.getMenuItemById('Orange').checked = false;
            menu.getMenuItemById('Grey').checked = false;
            color = '#ff00ff';
          },
        },
        {
          label: 'Orange',
          id: 'Orange',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('White').checked = false;
            menu.getMenuItemById('Yellow').checked = false;
            menu.getMenuItemById('Green').checked = false;
            menu.getMenuItemById('Blue').checked = false;
            menu.getMenuItemById('Pink').checked = false;
            menu.getMenuItemById('Orange').checked = true;
            menu.getMenuItemById('Grey').checked = false;
            color = '#ff8000';
          },
        },
        {
          label: 'Grey',
          id: 'Grey',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('White').checked = false;
            menu.getMenuItemById('Yellow').checked = false;
            menu.getMenuItemById('Green').checked = false;
            menu.getMenuItemById('Blue').checked = false;
            menu.getMenuItemById('Pink').checked = false;
            menu.getMenuItemById('Orange').checked = false;
            menu.getMenuItemById('Grey').checked = true;
            color = '#c0c0c0';
          },
        },
      ],
    },
    {
      label: "Shape",
      submenu: [
        {
          label: 'Point (Brush)',
          id: 'PointShape',
          type: 'checkbox',
          checked: true,
          click() {
            menu.getMenuItemById('PointShape').checked = true;
            menu.getMenuItemById('LineShape').checked = false;
            menu.getMenuItemById('RectShape').checked = false;
            menu.getMenuItemById('EllipseShape').checked = false;
            menu.getMenuItemById('LineOOShape').checked = false;
            menu.getMenuItemById('CubeShape').checked = false;
            shape = 'PointShape';
          },
        },
        {
          label: 'Line',
          id: 'LineShape',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('PointShape').checked = false;
            menu.getMenuItemById('LineShape').checked = true;
            menu.getMenuItemById('RectShape').checked = false;
            menu.getMenuItemById('EllipseShape').checked = false;
            menu.getMenuItemById('LineOOShape').checked = false;
            menu.getMenuItemById('CubeShape').checked = false;
            shape = 'LineShape';
          },
        },
        {
          label: 'Rectangle',
          id: 'RectShape',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('PointShape').checked = false;
            menu.getMenuItemById('LineShape').checked = false;
            menu.getMenuItemById('RectShape').checked = true;
            menu.getMenuItemById('EllipseShape').checked = false;
            menu.getMenuItemById('LineOOShape').checked = false;
            menu.getMenuItemById('CubeShape').checked = false;
            shape = 'RectShape';
          },
        },
        {
          label: 'Ellipse',
          id: 'EllipseShape',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('PointShape').checked = false;
            menu.getMenuItemById('LineShape').checked = false;
            menu.getMenuItemById('RectShape').checked = false;
            menu.getMenuItemById('EllipseShape').checked = true;
            menu.getMenuItemById('LineOOShape').checked = false;
            menu.getMenuItemById('CubeShape').checked = false;
            shape = 'EllipseShape';
          },
        },
        {
          label: 'Line \'n\' Circles',
          id: 'LineOOShape',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('PointShape').checked = false;
            menu.getMenuItemById('LineShape').checked = false;
            menu.getMenuItemById('RectShape').checked = false;
            menu.getMenuItemById('EllipseShape').checked = false;
            menu.getMenuItemById('LineOOShape').checked = true;
            menu.getMenuItemById('CubeShape').checked = false;
            shape = 'LineOOShape';
          },
        },
        {
          label: 'Cube',
          id: 'CubeShape',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('PointShape').checked = false;
            menu.getMenuItemById('LineShape').checked = false;
            menu.getMenuItemById('RectShape').checked = false;
            menu.getMenuItemById('EllipseShape').checked = false;
            menu.getMenuItemById('LineOOShape').checked = false;
            menu.getMenuItemById('CubeShape').checked = true;
            shape = 'CubeShape';
          },
        },
      ],
    },
    {
      label: "Fill",
      submenu: [
        {
          label: 'On',
          id: 'fillOn',
          type: 'checkbox',
          checked: true,
          click() {
            menu.getMenuItemById('fillOff').checked = false;
            menu.getMenuItemById('fillOn').checked = true;
            fill = true;
          },
        },
        {
          label: 'Off',
          id: 'fillOff',
          type: 'checkbox',
          checked: false,
          click() {
            menu.getMenuItemById('fillOn').checked = false;
            menu.getMenuItemById('fillOff').checked = true;
            fill = false;
          },
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: 'About',
          click() {
            About.Create(win);
          },
        },
      ],
    },
  ])
  Menu.setApplicationMenu(menu);

  win.on('closed', () => {
    win = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('getSettings', (event) => {
  event.reply('letSettings', color, shape, fill);
});