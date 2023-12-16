const { app, BrowserWindow } = require('electron');

function createWindow(){
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        icon: 'src/images/crimsonlogo.ico',
        autoHideMenuBar: true,
        fullscreenable: true,
        webPreferences: {
            devTools: false,
            scrollBounce: true
        }
    })

    win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})