"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNativeApplicationCommunicationLink = exports.nativeApplicationCommunicationLink = exports.NativeApplicationCommunicator = exports.RequestsResponseRoute = void 0;
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
const Types_1 = require("./messages/Types");
const isMessageReceivedAResponse = (response) => Types_1.ResponseIdProp in response;
class RequestsResponseRoute {
    constructor() {
        this.requestResponseMap = new Map();
        this.rootRequest = (response) => __awaiter(this, void 0, void 0, function* () {
            const responseAction = this.requestResponseMap.get(response.responseId);
            this.requestResponseMap.delete(response.responseId);
            responseAction(response.message);
        });
        this.setRequestResponse = (responseId, messageResponseAction) => this.requestResponseMap.set(responseId, messageResponseAction);
    }
}
exports.RequestsResponseRoute = RequestsResponseRoute;
class NativeApplicationCommunicator {
    // constructor() {
    // }
    constructor() {
        this.requestsToRoute = new RequestsResponseRoute();
        this.requestResponseId = 0;
        this.port = webextension_polyfill_1.default.runtime.connectNative("keep_living_in_the_past_man");
        this.port.onMessage.addListener(this.onMessageReceived.bind(this));
    }
    sendMessage(message) {
        this.port.postMessage(message);
    }
    sendRequest(message, messageResponseAction) {
        const requestToSend = this.getMessageWithResponseId(message);
        this.port.postMessage(requestToSend);
        this.requestsToRoute.setRequestResponse(requestToSend.responseId, messageResponseAction);
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
exports.nativeApplicationCommunicationLink = new NativeApplicationCommunicator();
const getNativeApplicationCommunicationLink = () => new NativeApplicationCommunicator();
exports.getNativeApplicationCommunicationLink = getNativeApplicationCommunicationLink;
//# sourceMappingURL=NativeApplicationCommunicationLink.js.map