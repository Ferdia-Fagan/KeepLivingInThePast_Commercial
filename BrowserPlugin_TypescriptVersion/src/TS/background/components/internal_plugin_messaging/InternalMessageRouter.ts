import browser, {Runtime} from "webextension-polyfill";
import BaseInternalMessageDto from "./internal_messages/base_dto/BaseInternalMessageDto";

type InternalMessageAction = (messageData?: any, sender?: Runtime.MessageSender) => void

/**
 * Requirement on refactor: format and section accordingly
 */
export const InternalMessageRouter: {[messageTypeAsId: number]: InternalMessageAction} = {
    // [MessageType.Command_AddHostnameOfWebpageToHostnames]:
}

type InternalMessage = BaseInternalMessageDto

function routerInternalMessages(message: InternalMessage, sender: Runtime.MessageSender) {
    InternalMessageRouter[message.messageType](message.messageData, sender)
}
browser.runtime.onMessage.addListener(routerInternalMessages)
