import {UnaryReport} from "../../../../browser_state_management/handlers/reporting/UnaryReport";
import {TagReport} from "../../../../datastores/stores/tags/TagReport";
import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";

interface Command_ChangeTagsOfWebpage extends BaseInternalMessageDto {
    webpageId: number,
    tagsReport: TagReport
}

export default function createCommand_ChangeTagsOfWebpage(
    webpageId: number,
    tagsReport: TagReport
): Command_ChangeTagsOfWebpage {
    return {
        messageType: MessageType.Command_ChangeTagsOfWebpage,

        webpageId: webpageId,
        tagsReport: tagsReport
    }
}