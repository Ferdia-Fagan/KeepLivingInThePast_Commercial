import {NativeMessageOut, NativeRequestOut} from "../../NativeMessageOut";
import {ResponseId} from "../../Types";
import {MessageType} from "../../values/MessageType";

export interface Command_LogWebpageVisit {
    hostName: string; 
    pathName: string;
    hostNameId?: number;
}

export function create_Command_LogWebpageVisit(
    data: Command_LogWebpageVisit
): NativeRequestOut<Command_LogWebpageVisit> {
    return {
        type: MessageType.Log_WebPageVisit,
        message: data
    }
}

