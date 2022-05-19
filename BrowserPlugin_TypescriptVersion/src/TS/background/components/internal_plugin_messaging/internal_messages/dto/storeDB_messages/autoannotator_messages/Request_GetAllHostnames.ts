import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";

interface Request_GetAllHostnames extends BaseInternalMessageDto {
}

export default function createRequest_GetAllHostnames(): Request_GetAllHostnames {
    return {
        messageType: MessageType.Request_GetAllHostnames,
    }
}