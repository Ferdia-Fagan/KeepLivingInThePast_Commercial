import {NativeMessage,Create_NativeMessage_WithResponse} from "../NativeMessage";

export interface Query {
    filterDates? : string[];
    filterByToday? : boolean;
    tags? : number[];
    bookmarks? : number[];
    query? : string;
}

export function Create_Query_Message(responseId: number,
                                    filterDates? : string[],
                                    filterByToday? : boolean,
                                    tags? : number[],
                                    bookmarks? : number[],
                                    query? : string): NativeMessage{
    const queryMessage: Query = {
        filterDates : filterDates,
        filterByToday : filterByToday,
        tags : tags,
        bookmarks : bookmarks,
        query : query,
    };
    return Create_NativeMessage_WithResponse("RecordWebPageVisit", queryMessage, responseId);
}


