import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";

interface Request_GetAllAutoAnnotators extends BaseInternalMessageDto {
}

export default function createRequest_GetAllHostnames(): Request_GetAllAutoAnnotators {
    return {
        messageType: MessageType.Request_GetAllAutoAnnotators,
    }
}