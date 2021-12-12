import IndexObject from "../../store_objects_interfaces/base_store_objects/IndexObject";
import {ID_TYPE} from "../../store_objects_interfaces/types/Types";

enum BookmarkType {
    BookmarkFolder,
    BookmarkWebpage
}

export default interface BookmarkObject extends IndexObject {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number,
    webpageLoggingId?: number
}

export interface BookmarkObjectUpdateReport extends IndexObject {
    parentId: number
}
