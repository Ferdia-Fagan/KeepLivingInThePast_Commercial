import {
    WebpageId
} from "../../../browser_state_management/layers/layer2_webpage_state_management/entities/Types";
import {
    ID_TYPE,
    StoreObjectStub
} from "../../components/parts/abstract_object_store_parts/layers/layer0_db/store_object/Types";
import {BookmarkType} from "./values/BookmarkType";

export interface BookmarkObject extends StoreObjectStub {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number,
    webpageId?: WebpageId
}

export interface BookmarkFolderObject extends StoreObjectStub {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number
}

export interface BookmarkObjectUpdateReport extends StoreObjectStub {
    parentId: number
}
