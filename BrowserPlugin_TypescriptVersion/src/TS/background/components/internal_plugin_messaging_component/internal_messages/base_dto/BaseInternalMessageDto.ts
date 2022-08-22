import {MessageType} from "./MessageType";

export default interface BaseInternalMessageDto {
    messageType: MessageType,
    messageData?: any
}

