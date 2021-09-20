// import * as Browser from '../../../node_modules/webextension-polyfill/dist/browser-polyfill.js';
// import browser from "webextension-polyfill";
const browser = require("webextension-polyfill");
import * as nativeMessaging from "./messages";

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
        this.port.postMessage(mess);
    }

    sendMessageWithResponse(message: any, messageResponseAction: (() => void)) {
        
    }

    onResponse(response: any) {

    }

    onError(error: any) {

    }

    getNewResponseId(): number{
        return this.requestResponseId++;
    }

}

export const inst = new NativeApplicationCommunicator();


