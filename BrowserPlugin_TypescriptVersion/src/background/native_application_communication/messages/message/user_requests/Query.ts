import {NativeMessageBaseInterface} from "../../NativeMessageBaseInterface";
import {MessageType} from "../../values/MessageType";

export interface Query {
    filterDates? : string[];
    filterByToday? : boolean;
    tags? : number[];
    bookmarks? : number[];
    query? : string;
}

export function create_Query_Request(
    responseId: number,
    filterDates? : string[],
    filterByToday? : boolean,
    tags? : number[],
    bookmarks? : number[],
    query? : string
): NativeMessageBaseInterface<Query> {
    return {
        type: MessageType.Request_Query,
        responseId: responseId,
        message: {
            filterDates : filterDates,
            filterByToday : filterByToday,
            tags : tags,
            bookmarks : bookmarks,
            query : query,
        }
    }
}


