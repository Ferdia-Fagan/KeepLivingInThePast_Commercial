import {WebpageTagReports} from "../../../../datastores/stores/tags/WebpageTagReports";
import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";

interface Command_GetCurrentWebpageTags extends BaseInternalMessageDto {
}

export default function createCommand_GetCurrentWebpageTags(): Command_GetCurrentWebpageTags {
    return {
        messageType: MessageType.Command_GetCurrentWebpageTags,
    }
}