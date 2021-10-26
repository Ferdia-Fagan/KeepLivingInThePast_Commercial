"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as Browser from '../../../node_modules/webextension-polyfill/dist/browser-polyfill.js';
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
// export default class NativeApplicationCommunicator {
class NativeApplicationCommunicator {
    constructor() {
        this.requestsToRoute = new Map();
        this.requestResponseId = 0;
        this.port = webextension_polyfill_1.default.runtime.connectNative("keep_living_in_the_past_man");
        this.port.onMessage.addListener(this.onResponse);
    }
    sendMessage(message) {
        this.port.postMessage({
            "type": "testRequest", "message": ""
        });
    }
    onResponse(response) {
    }
    onError(error) {
    }
}
var inst = new NativeApplicationCommunicator();
console.log("print");
//# sourceMappingURL=NativeApplicationCommunicator.js.map