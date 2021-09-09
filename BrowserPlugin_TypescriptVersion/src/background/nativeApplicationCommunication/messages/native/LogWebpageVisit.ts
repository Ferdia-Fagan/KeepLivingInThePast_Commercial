
import {NativeMessage,Create_NativeMessage} from "../NativeMessage";

export interface LogWebpageVisit {
    hostName: string; 
    pathName: string;
    hostNameId: number;
}

export function Create_LogWebpageVisit_Message(hostName: string,
                                        pathName: string,
                                        hostNameId: number): NativeMessage{
    const logWebpageVisitMessage: LogWebpageVisit = {
        hostName: hostName,
        pathName: pathName,
        hostNameId: hostNameId
    };
    return Create_NativeMessage("RecordWebPageVisit", logWebpageVisitMessage);
}







