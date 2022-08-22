import {DBConnection_A} from "../DB_Abstract";
import {EditableStoreDB_I} from "../implementations/EditableDB";
import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../store_object/StoreObject_Dtos";

export interface DBConnectionConstruction_NonEditable_I<T extends DBConnection_A> {
    new<
        STORE_T
    > (storeName: string, db: IDBDatabase): T
}

export interface DBConnectionConstruction_Editable_I<
    DB_INTERFACE extends EditableStoreDB_I<any, any>
> {
    new (storeName: string, db: IDBDatabase): DB_INTERFACE
}

