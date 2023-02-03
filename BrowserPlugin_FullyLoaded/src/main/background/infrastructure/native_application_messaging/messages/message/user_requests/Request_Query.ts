import {NativeMessageOut} from "../../NativeMessageOut";
import {MessageType} from "../../values/MessageType";

export interface Request_Query {
    filterDates? : string[];
    filterByToday? : boolean;
    tags? : number[];
    bookmarks? : number[];
    query? : string;
}

export function create_Request_Query(
    responseId: number,
    queryReq: Request_Query
): NativeMessageOut<Request_Query> {
    return {
        type: MessageType.Request_Query,
        responseId: responseId,
        messageData: queryReq
    }
}


