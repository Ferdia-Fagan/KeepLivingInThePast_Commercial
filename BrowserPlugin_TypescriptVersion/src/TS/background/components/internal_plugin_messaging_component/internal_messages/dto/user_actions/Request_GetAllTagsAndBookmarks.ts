import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";


interface Request_GetAllTagsAndBookmarks extends BaseInternalMessageDto {
}

export default function createRequest_GetAllTagsAndBookmarks(): Request_GetAllTagsAndBookmarks {
    return {
        messageType: MessageType.Request_GetAllTagsAndBookmarks,
    }
}
