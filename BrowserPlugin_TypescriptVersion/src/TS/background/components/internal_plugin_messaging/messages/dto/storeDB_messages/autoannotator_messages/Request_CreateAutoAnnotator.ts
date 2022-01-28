import {
    AutoAnnotatorSetup
} from "../../../../../datastores/stores/auto_annotator/auto_annotator_created/AutoAnnotatorObject";
import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";

interface Request_CreateAutoAnnotator extends BaseInternalMessageDto {
    newAutoAnnotator: AutoAnnotatorSetup
}

export default function createRequest_CreateAutoAnnotator(newAutoAnnotator: AutoAnnotatorSetup): Request_CreateAutoAnnotator {
    return {
        messageType: MessageType.Request_CreateAutoAnnotator,
        newAutoAnnotator: newAutoAnnotator
    }
}