"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNativeApplicationCommunicationLink = exports.NativeApplicationCommunicator = void 0;
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
const Types_1 = require("./messages/Types");
const isMessageReceivedAResponse = (response) => Types_1.ResponseIdProp in response;
class RequestsResponseRoute {
    constructor() {
        this.requestResponseMap = new Map();
        this.rootRequest = (response) => this.requestResponseMap.get(response.responseId)(response);
        this.setRequestResponse = (responseId, messageResponseAction) => this.requestResponseMap.set(responseId, messageResponseAction);
    }
}
class NativeApplicationCommunicator {
    // constructor() {
    // }
    constructor() {
        this.requestsToRoute = new RequestsResponseRoute();
        this.requestResponseId = 0;
        this.port = webextension_polyfill_1.default.runtime.connectNative("keep_living_in_the_past_man");
        this.port.onMessage.addListener(this.onMessageReceived);
    }
    sendMessage(message) {
        // this.port.postMessage(message);
    }
    sendRequest(message, messageResponseAction) {
        // const requestToSend = this.getMessageWithResponseId(message)
        // this.port.postMessage(requestToSend)
        // this.requestsToRoute.setRequestResponse(requestToSend.responseId, messageResponseAction)
    }
    /**
     * NOTE: not receive messages that are not a response
     * @param response
     */
    onMessageReceived(response) {
        this.requestsToRoute.rootRequest(response);
    }
    onError(error) {
        // TODO: complete ???
    }
    getMessageWithResponseId(message) {
        return Object.assign(Object.assign({}, message), { responseId: this.requestResponseId++ });
    }
}
exports.NativeApplicationCommunicator = NativeApplicationCommunicator;
// export const nativeApplicationCommunicationLink: NativeApplicationCommunicationContract = new NativeApplicationCommunicator()
// export const c = () => {
//     return nativeApplicationCommunicationLink
// }
exports.getNativeApplicationCommunicationLink = () => new NativeApplicationCommunicator();
//# sourceMappingURL=NativeApplicationCommunicationLink.js.map