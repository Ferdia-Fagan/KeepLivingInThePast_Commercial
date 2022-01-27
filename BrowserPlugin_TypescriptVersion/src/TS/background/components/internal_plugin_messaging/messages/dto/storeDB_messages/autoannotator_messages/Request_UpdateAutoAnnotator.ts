import {
    AutoAnnotatorSetup, AutoAnnotatorSetupObjectUpdateInterface
} from "../../../../../datastores/components/stores/auto_annotator/auto_annotator_created/AutoAnnotatorObject";
import BaseInternalMessageDto from "../../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../../base_dto/MessageType";

interface Request_UpdateAutoAnnotator extends BaseInternalMessageDto {
    updatedAutoAnnotator: AutoAnnotatorSetupObjectUpdateInterface
}

export default function createRequest_UpdateAutoAnnotator(updatedAutoAnnotator: AutoAnnotatorSetupObjectUpdateInterface): Request_UpdateAutoAnnotator {
    return {
        messageType: MessageType.Request_UpdateAutoAnnotator,
        updatedAutoAnnotator: updatedAutoAnnotator
    }
}