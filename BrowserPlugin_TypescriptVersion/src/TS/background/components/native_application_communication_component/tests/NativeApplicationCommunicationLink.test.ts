import "mockzilla-webextension";
import { mockEvent, MockzillaEventOf } from "mockzilla-webextension";
import {deepMock, MockzillaDeep} from "mockzilla";
import {MockzillaEvent} from "mockzilla-webextension/dist/mockEvent";

import {Runtime} from "webextension-polyfill";
import {NativeMessageOut, NativeMessageResponse, NativeRequestOut} from "../messages/NativeMessageOut";
import {MessageResponseAction} from "../messages/Types";
import {MessageType} from "../messages/values/MessageType";
import {
    NativeApplicationCommunicator, RequestsResponseRoute
} from "../NativeApplicationCommunicationLink";

describe("RequestsResponseRoute", () => {
    it("allows adding a set response for response id, and then rooting that reponse", () => {
        const responseFunction: MessageResponseAction = jest.fn(((response: any) => {}))

        const requestsResponseRouteInst = new RequestsResponseRoute()
        const responseId = 1
        requestsResponseRouteInst.setRequestResponse(responseId, responseFunction)

        const messageToRouteToResponse: NativeMessageResponse = {
            responseId: responseId,
            message: {
                responseDataProp: ""
            }
        }
        requestsResponseRouteInst.rootRequest(messageToRouteToResponse)
        expect(responseFunction).toHaveBeenCalledTimes(1)
        expect(responseFunction).toHaveBeenCalledWith(messageToRouteToResponse.message)
    })
})


const [runtimePort, mockRuntimePort, mockzillaRuntimeNode] = deepMock<Runtime.Port>("Runtime.Port", false)
// TODO: complete []

interface PortInterface {
    postMessage: (requestToSend: any) => void
}

interface SampleMessageInterface {

}
describe("native application communication link", () => {

    describe("send message", () => {
        beforeEach(() => {
            mockBrowser.runtime.connectNative.expect("keep_living_in_the_past_man").andReturn(runtimePort)
        })
        it("message is sent through port", () => {
            const sampleMessageData: SampleMessageInterface = {}
            const messageOut: NativeMessageOut<SampleMessageInterface> = {
                type: MessageType.Test,
                messageData: sampleMessageData
            }
            mockRuntimePort.onMessage.addListener.expect(expect.anything())
            mockRuntimePort.postMessage.expect(messageOut)

            const nativeApplicationCommunicationLinkInst = new NativeApplicationCommunicator()

            // when:
            nativeApplicationCommunicationLinkInst.sendMessage(messageOut)
        })

    })

    describe("make request", () => {
        beforeEach(() => {
            mockBrowser.runtime.connectNative.expect("keep_living_in_the_past_man").andReturn(runtimePort)
        })
        it("sends request to native application, and add a request response handler", () => {
            const sampleMessageData: SampleMessageInterface = {

            }
            const messageOut: NativeRequestOut<SampleMessageInterface> = {
                type: MessageType.Test,
                responseId: 0,
                messageData: sampleMessageData
            }

            mockRuntimePort.onMessage.addListener.expect(expect.anything())
            mockRuntimePort.postMessage.expect(messageOut)

            const nativeApplicationCommunicationLinkInst = new NativeApplicationCommunicator()

            const spy = jest.spyOn(nativeApplicationCommunicationLinkInst.requestsToRoute, "setRequestResponse")

            const responseAction = jest.fn()
            nativeApplicationCommunicationLinkInst.sendRequest(messageOut, responseAction)

            expect(spy).toBeCalledWith(0, responseAction)
        })
    })

    describe("onMessageReceived", () => {
        beforeEach(() => {
            mockBrowser.runtime.connectNative.expect("keep_living_in_the_past_man")
                .andReturn(runtimePort)
        })
        it("when receive message, use response id to root message to response handler action", () => {
            // TODO: complete -> this test does not send event
            expect(true).toBe(false)
            // mockRuntimePort.onMessage.addListener.expect(expect.anything())
            // const nativeApplicationCommunicationLinkInst = new NativeApplicationCommunicator()
            //
            // const spyOnNatAppRequestsToRouteSetRequestResponse = jest.spyOn(nativeApplicationCommunicationLinkInst.requestsToRoute, "setRequestResponse")
            //
            // const responseAction = jest.fn()
            // const responseId = 0
            // nativeApplicationCommunicationLinkInst.requestsToRoute.setRequestResponse(responseId, responseAction)
            // expect(spyOnNatAppRequestsToRouteSetRequestResponse).toHaveBeenCalledWith(responseId, )
        })
    })

})

