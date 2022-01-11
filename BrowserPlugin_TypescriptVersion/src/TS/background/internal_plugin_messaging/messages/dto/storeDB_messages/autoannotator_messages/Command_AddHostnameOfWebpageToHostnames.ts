import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";

interface Command_AddHostnameOfWebpageToHostnames extends BaseInternalMessageDto {
    webpageId: number
}

export default function createRequestToAddHostnameToCollection(webpageId: number): Command_AddHostnameOfWebpageToHostnames {
    return {
        messageType: MessageType.Command_AddHostnameOfWebpageToHostnames,
        webpageId: webpageId
    }
}