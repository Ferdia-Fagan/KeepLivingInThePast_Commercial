import {UnaryReport} from "../../../../../../domain/components/browser_state_management_component/handlers/reporting/UnaryReport";
import {WebpageTagReports} from "../../../../../../domain/components/datastore_components/concrete/tags/objs/Tag";
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