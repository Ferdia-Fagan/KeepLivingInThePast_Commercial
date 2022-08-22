import {BookmarkId} from "../../../../components/datastore_components/concrete/bookmarks/values/Types";
import {TagId} from "../../../../datastore_components/concrete/tags/objs/Types";
import BaseInternalMessageDto from "../../base_dto/BaseInternalMessageDto";
import {MessageType} from "../../base_dto/MessageType";

interface Query {
    queryString: string

    tags: TagId[]
    bookmarks: BookmarkId[]

    filterByToday: boolean
    filterDates: Date[]
}

export function createQuery(
    queryString: string,

    tags: TagId[],
    bookmarks: BookmarkId[],

    filterByToday: boolean,
    filterDates: Date[],
): Query {
    return {
        queryString,

        tags,
        bookmarks,

        filterByToday,
        filterDates
    }
}

interface Request_Query extends BaseInternalMessageDto {
    query: Query
}

export default function createRequest_Query(query: Query): Request_Query {
    return {
        messageType: MessageType.RequestQuery,
        query: query
    }
}