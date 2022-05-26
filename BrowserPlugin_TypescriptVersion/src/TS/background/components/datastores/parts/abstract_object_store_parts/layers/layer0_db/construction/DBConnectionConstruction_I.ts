import {DBConnection_A} from "../DB_Abstract";
import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../store_object/StoreObject_Dtos";

export interface DBConnectionConstruction_NonEditable_I<T extends DBConnection_A> {
    new<
        STORE_T
    > (storeName: string, db: IDBDatabase): T
}

export interface DBConnectionConstruction_Editable_I<T extends DBConnection_A> {
    new<
        STORE_T extends NonPersistedStoreObjectStub,
        STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub
    > (storeName: string, db: IDBDatabase): T
}

