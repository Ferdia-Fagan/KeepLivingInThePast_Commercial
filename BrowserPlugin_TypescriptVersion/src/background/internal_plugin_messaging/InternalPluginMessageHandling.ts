const browser = require("webextension-polyfill");


export function recieveInternalMessage(msg: any,sender: any,sendResponse: any){


}




browser.runtime.onMessage.addListener(recieveInternalMessage)




