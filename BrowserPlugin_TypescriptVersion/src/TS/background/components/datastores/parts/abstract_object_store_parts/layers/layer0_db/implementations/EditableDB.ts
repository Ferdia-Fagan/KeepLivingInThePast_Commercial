import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../store_object/StoreObject_Dtos";
import {NonEditableDB, NonEditableStoreDB_I} from "./NonEditableDB";


export interface EditableStoreDB_I<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> extends NonEditableStoreDB_I<STORE_OBJECT_T> {

    updateObject?: (storeObject: UPDATE_STORE_OBJECT_T) => void

}

export class EditableDB<
    STORE_T extends NonPersistedStoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub
>
    extends NonEditableDB<STORE_T>
    implements EditableStoreDB_I<STORE_T, STORE_T_UPDATE_INTERFACE> {

    updateObject(storeObject: STORE_T_UPDATE_INTERFACE): void {
        let store = this.getObjectStore('readwrite');
        store.put(storeObject);
    }
}
