import {
    Hostname, Pathname,
    WebpageId
} from "../../../../browser_state_management_component/layers/layer2_webpage_state_management/entities/Types";
import {Webpage} from "../../../../browser_state_management_component/layers/layer2_webpage_state_management/entities/Webpage";
import {NativeRequestOut} from "../../NativeMessageOut";
import {ResponseId} from "../../Types";
import {MessageType} from "../../values/MessageType";

export interface Command_LogWebpageVisit {
    hostName: string; 
    pathName: string;
    hostNameId?: number;
}

export function create_Command_LogWebpageVisit(
    responseId: ResponseId,
    data: Command_LogWebpageVisit
): NativeRequestOut<Command_LogWebpageVisit> {
    return {
        type: MessageType.Log_WebPageVisit,
        responseId,
        messageData: data
    }
}

// RESPONSE:

export interface WebpageDto
    extends Webpage {
    hostName: Hostname, pathName: Pathname
}

export type Response_LogWebpageVisit = WebpageDto

