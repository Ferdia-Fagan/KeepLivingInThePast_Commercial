import {
    WebpageId
} from "../../../browser_state_management/layers/layer2_webpage_state_management/entities/Types";
import {StoreObjectInterface} from "../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject";
import {ID_TYPE} from "../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/DataTypes";
import {BookmarkType} from "./values/BookmarkType";

export interface BookmarkObject extends StoreObjectInterface {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number,
    webpageId?: WebpageId
}

export interface BookmarkFolderObject extends StoreObjectInterface {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number
}

export interface BookmarkObjectUpdateReport extends StoreObjectInterface {
    parentId: number
}
