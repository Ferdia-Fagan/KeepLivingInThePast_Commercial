import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";


interface Request_GetAllTags extends BaseInternalMessageDto {
}

export default function createRequest_GetAllTags(): Request_GetAllTags {
    return {
        messageType: MessageType.Request_GetAllTags,
    }
}
