import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";

interface Command_SendUpdateReport extends BaseInternalMessageDto {

}

export default function createCommand_SendUpdateReport(): Command_SendUpdateReport {
    return {
        messageType: MessageType.Command_SendUpdateReport,
    }
}