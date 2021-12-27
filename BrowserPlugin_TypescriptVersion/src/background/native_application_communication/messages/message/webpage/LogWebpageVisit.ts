import {NativeMessageBaseInterface} from "../../NativeMessageBaseInterface";
import {MessageType} from "../../values/MessageType";

export interface LogWebpageVisit {
    hostName: string; 
    pathName: string;
    hostNameId: number;
}

export function create_LogWebpageVisit_Message(
    responseId: number,
    data: LogWebpageVisit
): NativeMessageBaseInterface<LogWebpageVisit> {
    return {
        type: MessageType.Log_WebPageVisit,
        responseId: responseId,
        message: data
    }
}

