const browser = require("webextension-polyfill");

// TODO: COmplete and test
export function recieveInternalMessage(msg: any,sender: any,sendResponse: any){


}




browser.runtime.onMessage.addListener(recieveInternalMessage)




