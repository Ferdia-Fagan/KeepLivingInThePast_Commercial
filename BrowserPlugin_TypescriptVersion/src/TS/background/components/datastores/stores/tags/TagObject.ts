import {
    NonPersistedStoreObjectStub
} from "../../parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {
    ID_TYPE
} from "../../parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Types";
import {TagName} from "./Types";

export default interface TagObject extends NonPersistedStoreObjectStub {
    id?: ID_TYPE,
    tag: TagName
}
