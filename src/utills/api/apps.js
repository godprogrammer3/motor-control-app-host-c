


export function shutdown(){
    let result;
    try{
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.send('shutdown-request-event');
        result =  Response.success;
    }catch(error){
        console.log('-> Error in api.apps.shutdown');
        console.log(error);
        result = Response.failed;
    }finally{
        return result;
    }
}

const Response = {
    success:{
        successful:true
    },
    failed:{
        successful:false
    }
}

