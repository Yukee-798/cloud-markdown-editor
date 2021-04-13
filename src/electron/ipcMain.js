const {ipcMain} = require('electron');

/** 监听来自渲染进程发送过来的消息 */
function initIpcMain() {
    ipcMain.on('message', (event, args) => {

    })
}
exports.initIpcMain = initIpcMain;