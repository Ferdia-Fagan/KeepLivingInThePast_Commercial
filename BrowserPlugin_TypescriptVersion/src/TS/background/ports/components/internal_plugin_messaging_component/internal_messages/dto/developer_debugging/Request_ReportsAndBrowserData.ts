import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";

// TODO: used to be called getData
interface Request_ReportsAndBrowserData extends BaseInternalMessageDto {
}

function createRequest_ReportsAndBrowserData(): Request_ReportsAndBrowserData {
    return {
        messageType: MessageType.Request_ReportsAndBrowserData
    }
}
