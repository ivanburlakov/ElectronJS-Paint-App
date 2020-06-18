const { BrowserWindow } = require('electron');

let child;

function Create(win) {
    child = new BrowserWindow({
        parent: win,
        modal: true,
        show: false,
        width: 325,
        height: 150,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
          },
    });
    
    child.removeMenu();
    
    child.loadFile('About.html');
    
    //child.webContents.openDevTools();
    
    child.once('ready-to-show', () => {
        child.show();
    });

    child.on('closed', () => {
        child = null;
    });
};

function Close() {
    child.close();
};

module.exports.Create = Create;
module.exports.Close = Close;
