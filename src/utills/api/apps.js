const { ipcRenderer } = window.require('electron');


export function shutdown(){
    ipcRenderer.send('shutdown-request-event');
}

