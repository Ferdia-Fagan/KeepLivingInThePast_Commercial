import {
    WebpageId
} from "../../../browser_state_management/layers/layer2_webpage_state_management/entities/Types";
import {
    NonPersistedStoreObjectStub
} from "../../parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {
    ID_TYPE
} from "../../parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Types";
import {BookmarkType} from "./values/BookmarkType";

export interface BookmarkObject extends NonPersistedStoreObjectStub {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number,
    webpageId?: WebpageId
}

export interface BookmarkFolderObject extends NonPersistedStoreObjectStub {
    id?: ID_TYPE,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number
}

export interface BookmarkObjectUpdateReport extends NonPersistedStoreObjectStub {
    parentId: number
}
