import type { Browser } from "webextension-polyfill-ts";
import { deepMock, MockzillaDeep } from "mockzilla";
const [browser, mockBrowser, mockBrowserNode] = deepMock<Browser>("browser", false);
import {NativeMessageOut} from "../messages/NativeMessageOut";
import {MessageType} from "../messages/values/MessageType";
import {
    getNativeApplicationCommunicationLink,
    NativeApplicationCommunicationContract, nativeApplicationCommunicationLink
} from "../NativeApplicationCommunicationLink";

import "mockzilla-webextension";

jest.mock("mockzilla-webextension", () => ({ browser }));

interface PortInterface {
    postMessage: (requestToSend: any) => void
}

const PortMock = () => {
    return {
        postMessage: (requestToSend: any) => {}
    }
}

const PortMockInst = PortMock()

// jest.mock("../NativeApplicationCommunicationLink.ts", () => ({
//     ...jest.requireActual("../NativeApplicationCommunicationLink.ts"),
//     // ...(jest.requireActual('../NativeApplicationCommunicationLink.ts')),
//     browser: {
//         runtime: {
//             connectNative: jest.fn((application: string) => PortMockInst)
//         }
//     }
// }))

interface SampleMessageInterface {

}
describe("native application communication link", () => {

    describe("send message", () => {
        it("message is sent through port", () => {
            // const x = jest.fn()
            // browser.runtime.connectNative = x
            // expect(x).toBeCalledWith("keep_living_in_the_past_man")
            const sampleMessageData: SampleMessageInterface = {

            }
            const messageOut: NativeMessageOut<SampleMessageInterface> = {
                type: MessageType.Test,
                messageData: sampleMessageData
            }
            const nativeApplicationCommunicationLinkInst: NativeApplicationCommunicationContract = getNativeApplicationCommunicationLink()
            console.log()

            // when:
            // const portSendMessageLink = jest.spyOn(
            //     nativeApplicationCommunicationLinkInst.port, "postMessage"
            // )
            // nativeApplicationCommunicationLinkInst.sendMessage(messageOut)
            //
            // // then:
            // expect(portSendMessageLink).toBeCalledWith(messageOut)
        })

    })

    describe("make request", () => {

    })

})



