import {
    WebpageId
} from "../../../browser_state_management/layers/layer2_webpage_state_management/entities/Types";
import IndexObject from "../../store_objects_interfaces/base_store_objects/IndexObject";
import {ID_TYPE} from "../../store_objects_interfaces/types/Types";
import {BookmarkType} from "./values/BookmarkType";

export interface BookmarkObject extends IndexObject {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number,
    webpageId?: WebpageId
}

export interface BookmarkFolderObject extends IndexObject {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number
}

export interface BookmarkObjectUpdateReport extends IndexObject {
    parentId: number
}
