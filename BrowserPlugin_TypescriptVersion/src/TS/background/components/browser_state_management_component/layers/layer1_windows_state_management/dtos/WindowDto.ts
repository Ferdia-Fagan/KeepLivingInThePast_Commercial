import {
    WebpageDto
} from "../../../../native_application_communication_component/messages/message/webpage/Command_LogWebpageVisit";
import {TabId} from "../values/Types";

export interface WindowDto {
    tabs: Map<TabId, WebpageDto>
}




