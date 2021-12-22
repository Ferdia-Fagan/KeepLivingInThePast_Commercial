import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";

interface Request_GetAutoAnnotator extends BaseInternalMessageDto {
    autoAnnotatorId: number
}

export default function createRequest_GetAutoAnnotator(autoAnnotatorId: number): Request_GetAutoAnnotator {
    return {
        messageType: MessageType.Request_GetAutoAnnotator,
        autoAnnotatorId
    }
}