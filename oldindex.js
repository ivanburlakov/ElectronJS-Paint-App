const { app, BrowserWindow, Menu } = require('electron');

let win;

let color = '#000000';
let shape = 'ellipse';
let fill = false;

const About = require("./About.js");

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
      label: "Файл",
      submenu: [
        {
          label: 'Выход',
          role: "quit",
        },
        {
          label: 'Обновить',
          role: "reload",
        },
      ],
    },
    {
      label: "Колір",
      submenu: [
        {
          label: 'Білий',
          click() {
            color = '#ffffff';
          },
        },
        {
          label: 'Жовтий',
          click() {
            color = '#ffff00';
          },
        },
        {
          label: 'Світло-зелений',
          click() {
            color = '#00ff00';
          },
        },
        {
          label: 'Блакитний',
          click() {
            color = '#00ffff';
          },
        },
        {
          label: 'Рожевий',
          click() {
            color = '#ff00ff';
          },
        },
        {
          label: 'Померанчевий',
          click() {
            color = '#ff8000';
          },
        },
        {
          label: 'Сірий',
          click() {
            color = '#c0c0c0';
          },
        },
      ],
    },
    {
      label: "Фігура",
      submenu: [
        {
          label: 'Точка',
        },
        {
          label: 'Лінія',
        },
        {
          label: 'Прямокутник',
        },
        {
          label: 'Еліпс',
        },
      ],
    },
    {
      label: "Заповненния",
      submenu: [
        {
          label: 'Вкл',
          //type: 'checkbox',
          //checked: true,
        },
        {
          label: 'Выкл',
          //type: 'checkbox',
          //checked: false,
        },
      ],
    },
    {
      label: "Справка",
      submenu: [
        {
          label: 'О программе...',
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

function runApp() {
  window.global.canvasStartX = 4;
  window.global.canvasStartY = 4;
  window.global.mousedown = false;
  window.global.shapes = [];
  
  window.global.canvas = document.getElementById('canvas');
  window.global.ctx = canvas.getContext('2d');

  window.global.canvas.height = window.innerHeight - 12;
  window.global.canvas.width = window.innerWidth - 12;

  window.global.canvas.addEventListener("mousedown", startPosition);
  window.global.canvas.addEventListener("mousemove", rubberBand);
  window.global.canvas.addEventListener("mouseup", finishedPosition);
}

// function Listener() {
//   if (typeof (document) !== 'undefined') {
//     RunApp();
//   }
// }

function drawEllipse(ellipse) {
  window.global.ctx.beginPath();
  window.global.ctx.ellipse(ellipse.centerX, ellipse.centerY, ellipse.rw, ellipse.rh, 0, 0, 2 * Math.PI);
  window.global.ctx.stroke();
}

function drawShapes() {
  window.global.ctx.strokeStyle = 'black';
  window.global.ctx.lineWidth = 5;
  window.global.shapes.forEach(drawEllipse)
}

//Mousedown
function startPosition(e) {
  window.global.color = color;
  window.global.lastMouseX = parseInt(e.clientX - window.global.canvasStartX);
  window.global.lastMouseY = parseInt(e.clientY - window.global.canvasStartY);
  window.global.mousedown = true;
}

//Mousemove
function rubberBand(e) {
  if (!window.global.mousedown) return;

  window.global.mouseX = parseInt(e.clientX - window.global.canvasStartX);
  window.global.mouseY = parseInt(e.clientY - window.global.canvasStartY);

  window.global.ctx.clearRect(0, 0, window.global.canvas.width, window.global.canvas.height);

  drawShapes();

  window.global.ctx.beginPath();
  window.global.width = window.global.mouseX - window.global.lastMouseX;
  window.global.height = window.global.mouseY - window.global.lastMouseY;
  window.global.ctx.rect(window.global.lastMouseX, window.global.lastMouseY, width, height);
  window.global.ctx.strokeStyle = 'blue';
  window.global.ctx.lineWidth = 2;
  window.global.ctx.stroke();
}

//Mouseup
function finishedPosition(e) {
  window.global.mousedown = false;

  window.global.mouseX = parseInt(e.clientX - window.global.canvasStartX);
  window.global.mouseY = parseInt(e.clientY - window.global.canvasStartY);

  window.global.width = window.global.mouseX - window.global.lastMouseX;
  window.global.height = window.global.mouseY - window.global.lastMouseY;

  const rw = Math.abs(width / 2);
  const rh = Math.abs(height / 2);

  const centerX = window.global.mouseX - width / 2;
  const centerY = window.global.mouseY - height / 2;

  window.global.shapes.push({ centerX, centerY, rw, rh })

  window.global.ctx.clearRect(0, 0, window.global.canvas.width, window.global.canvas.height);
  drawShapes();
}