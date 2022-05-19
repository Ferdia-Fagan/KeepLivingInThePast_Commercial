import browser, {Runtime} from "webextension-polyfill";
import {NativeMessageOut, NativeMessageResponse, NativeRequestOut} from "./messages/NativeMessageOut";
import {MessageResponseAction, ResponseId, ResponseIdProp} from "./messages/Types";
// TODO: complete: []
export interface NativeApplicationCommunicationContract {
    sendMessage(message: NativeMessageOut<any>): void
    sendRequest(message: NativeMessageOut<any>, messageResponseAction: (() => void)): void
}

const isMessageReceivedAResponse = (response: any) => ResponseIdProp in response

export class RequestsResponseRoute {
    requestResponseMap = new Map<ResponseId, MessageResponseAction>()

    rootRequest = async (response: NativeMessageResponse) => {
        const responseAction = this.requestResponseMap.get(response.responseId)
        this.requestResponseMap.delete(response.responseId)
        responseAction(response.message)
    }

    setRequestResponse = (responseId: ResponseId, messageResponseAction: MessageResponseAction) =>
        this.requestResponseMap.set(responseId, messageResponseAction)
}

export class NativeApplicationCommunicator
    implements NativeApplicationCommunicationContract {

    requestsToRoute = new RequestsResponseRoute();

    requestResponseId = 0;

    port: Runtime.Port = browser.runtime.connectNative("keep_living_in_the_past_man");
    // constructor() {
    // }

    constructor() {
        this.port.onMessage.addListener(this.onMessageReceived.bind(this));
    }

    sendMessage(message: NativeMessageOut<any>): void{
        this.port.postMessage(message);
    }

    sendRequest(message: NativeMessageOut<any>, messageResponseAction: MessageResponseAction): void{
        const requestToSend = this.getMessageWithResponseId(message)
        this.port.postMessage(requestToSend)
        this.requestsToRoute.setRequestResponse(requestToSend.responseId, messageResponseAction)
    }

    /**
     * NOTE: not receive internal_messages that are not a response
     * @param response
     */
    onMessageReceived(response: NativeMessageResponse) {
        this.requestsToRoute.rootRequest(response)
    }

    onError(error: any) {
        // TODO: complete ???
    }

    getMessageWithResponseId(message: NativeMessageOut<any>): NativeRequestOut<any>{
        return {
            ...message,
            responseId: this.requestResponseId++
        }
    }

}

export const nativeApplicationCommunicationLink: NativeApplicationCommunicationContract = new NativeApplicationCommunicator()

export const getNativeApplicationCommunicationLink = () =>
    new NativeApplicationCommunicator()
