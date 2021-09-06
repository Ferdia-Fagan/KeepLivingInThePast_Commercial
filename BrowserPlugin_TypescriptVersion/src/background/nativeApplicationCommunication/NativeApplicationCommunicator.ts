// import * as Browser from '../../../node_modules/webextension-polyfill/dist/browser-polyfill.js';
// import browser from "webextension-polyfill";
const browser = require("webextension-polyfill");


// export default class NativeApplicationCommunicator {
class NativeApplicationCommunicator {


    requestsToRoute = new Map();

    requestResponseId = 0;

    port = browser.runtime.connectNative("keep_living_in_the_past_man");

    constructor(){
        this.port.onMessage.addListener(this.onResponse);
    }

    sendMessage(message: any){
        console.log("sned test message to native application")
        this.port.postMessage({
            "type": "testRequest", "message": ""
        });
    }

    onResponse(response: any) {

    }

    onError(error: any) {

    }    




}

var inst = new NativeApplicationCommunicator();
inst.sendMessage(null);

console.log("print")



