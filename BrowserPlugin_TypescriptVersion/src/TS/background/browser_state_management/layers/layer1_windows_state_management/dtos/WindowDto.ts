import {
    WebpageDto
} from "../../../../native_application_communication/messages/message/webpage/Command_LogWebpageVisit";
import {TabId} from "../values/Types";

export interface WindowDto {
    tabs: Map<TabId, WebpageDto>
}




