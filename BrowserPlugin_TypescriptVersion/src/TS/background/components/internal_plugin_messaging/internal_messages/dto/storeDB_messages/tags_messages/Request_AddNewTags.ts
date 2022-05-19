import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";

interface Request_AddNewTags extends BaseInternalMessageDto {
    newTags: string[]
}

export default function createCommandWithResponse_AddNewTags(newTags: string[]): Request_AddNewTags {
    return {
        messageType: MessageType.CommandWithResponse_AddNewTags,
        newTags: newTags
    }
}

