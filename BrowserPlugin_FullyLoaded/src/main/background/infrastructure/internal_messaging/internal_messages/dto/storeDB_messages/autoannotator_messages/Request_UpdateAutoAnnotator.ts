import {
    AutoAnnotatorSetup, AutoAnnotatorSetupObjectUpdateInterface
} from "../../../../../../../domain/components/datastore_components/concrete/auto_annotator/auto_annotator_created/AutoAnnotatorObject";
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