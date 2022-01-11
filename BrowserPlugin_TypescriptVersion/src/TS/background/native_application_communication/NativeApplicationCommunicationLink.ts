import browser from "webextension-polyfill";
import {NativeMessageOut, NativeMessageResponse, NativeRequestOut} from "./messages/NativeMessageOut";
import {MessageResponseAction, ResponseId, ResponseIdProp} from "./messages/Types";

export interface NativeApplicationCommunicationContract {
    sendMessage(message: NativeMessageOut<any>): void
    sendRequest(message: NativeMessageOut<any>, messageResponseAction: (() => void)): void
}

const isMessageReceivedAResponse = (response: any) => ResponseIdProp in response

class RequestsResponseRoute {
    requestResponseMap = new Map<ResponseId, MessageResponseAction>()

    rootRequest(response: NativeMessageResponse): void {
        // call request response
        this.requestResponseMap.get(response.responseId)(response)
    }

    setRequestResponse = (responseId: ResponseId, messageResponseAction: MessageResponseAction) =>
        this.requestResponseMap.set(responseId, messageResponseAction)
}

class NativeApplicationCommunicator
    implements NativeApplicationCommunicationContract {

    requestsToRoute = new RequestsResponseRoute();

    requestResponseId = 0;

    port = browser.runtime.connectNative("keep_living_in_the_past_man");

    constructor(){
        this.port.onMessage.addListener(this.onMessageReceived);
    }

    sendMessage(message: NativeMessageOut<any>): void{
        console.log("sned test message to message application")
        this.port.postMessage(message);
    }

    sendRequest(message: NativeMessageOut<any>, messageResponseAction: MessageResponseAction): void{
        const requestToSend = this.getMessageWithResponseId(message)
        this.port.postMessage(requestToSend)

        this.requestsToRoute.setRequestResponse(requestToSend.responseId, messageResponseAction)
    }

    /**
     * NOTE: not receive messages that are not a response
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

const nativeApplicationCommunicationLink: NativeApplicationCommunicationContract = new NativeApplicationCommunicator()

export const getNativeApplicationCommunicationLink = () => nativeApplicationCommunicationLink





