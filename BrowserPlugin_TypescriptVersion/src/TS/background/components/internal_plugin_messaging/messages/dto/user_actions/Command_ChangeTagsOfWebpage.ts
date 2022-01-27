import {UnaryReport} from "../../../../browser_state_management/handlers/reporting/UnaryReport";
import {WebpageTagReports} from "../../../../datastores/components/stores/tags/WebpageTagReports";
import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";

interface Command_ChangeTagsOfWebpage extends BaseInternalMessageDto {
    webpageId: number,
    tagsReport: WebpageTagReports
}

export default function createCommand_ChangeTagsOfWebpage(
    webpageId: number,
    tagsReport: WebpageTagReports
): Command_ChangeTagsOfWebpage {
    return {
        messageType: MessageType.Command_ChangeTagsOfWebpage,

        webpageId: webpageId,
        tagsReport: tagsReport
    }
}