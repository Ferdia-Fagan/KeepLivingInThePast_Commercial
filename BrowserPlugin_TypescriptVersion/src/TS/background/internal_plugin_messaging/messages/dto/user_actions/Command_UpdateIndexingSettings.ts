import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";

interface IndexingSettings {
    indexAllPages: boolean

    minimumTotalTimeOnPageToIndex: number
    minimumTotalVisitsOnPageToIndex: number

    minimumAndConditions: boolean   // TODO: refactor: better name
}

interface Command_UpdateIndexingSettings extends BaseInternalMessageDto {
    indexingSettings: IndexingSettings
}

export default function createCommand_UpdateIndexingSettings(
    indexAllPages: boolean,

    minimumTotalTimeOnPageToIndex: number,
    minimumTotalVisitsOnPageToIndex: number,

    minimumAndConditions: boolean,   // TODO: refactor: better name
): Command_UpdateIndexingSettings {
    return {
        messageType: MessageType.Command_UpdateIndexingSettings,
        indexingSettings: {
            indexAllPages,
            minimumTotalTimeOnPageToIndex,
            minimumTotalVisitsOnPageToIndex,
            minimumAndConditions
        }
    }
}