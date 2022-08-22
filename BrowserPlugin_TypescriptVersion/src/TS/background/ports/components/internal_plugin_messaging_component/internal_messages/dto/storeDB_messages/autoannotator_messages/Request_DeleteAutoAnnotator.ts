import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";

interface Request_DeleteAutoAnnotator extends BaseInternalMessageDto {
    autoAnnotatorId: number
}

export default function createRequest_DeleteAutoAnnotator(autoAnnotatorId: number): Request_DeleteAutoAnnotator {
    return {
        messageType: MessageType.Request_DeleteAutoAnnotator,
        autoAnnotatorId
    }
}