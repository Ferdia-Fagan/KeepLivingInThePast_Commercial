import {WebpageUrl} from "../../../../../../domain/components/browser_state_management_component/layers/layer2_webpage_state_management/entities/Types";
import {NativeRequestOut} from "../../NativeMessageOut";
import {ResponseId} from "../../Types";
import {MessageType} from "../../values/MessageType";
import {Command_LogWebpageVisit, Response_LogWebpageVisit, WebpageDto} from "./Command_LogWebpageVisit";

export interface Command_LogWebpages {
    webpages: Command_LogWebpageVisit[]
}

export function create_Command_LogWebpages(
    responseId: ResponseId,
    webpages: Command_LogWebpageVisit[]
): NativeRequestOut<Command_LogWebpages> {
    return {
        type: MessageType.Log_WebPageVisit,
        responseId,
        messageData: {
            webpages
        }
    }
}

// RESPONSE:

export interface Webpages {
    webpages: Map<WebpageUrl, WebpageDto>
}

export type Response_LogWebpages = Webpages