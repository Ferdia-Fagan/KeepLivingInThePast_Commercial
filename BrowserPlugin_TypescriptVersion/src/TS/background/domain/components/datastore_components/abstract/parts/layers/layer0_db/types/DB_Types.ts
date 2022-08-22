import {EditableStoreDB_I} from "../implementations/EditableDB";
import {NonEditableStoreDB_I} from "../implementations/NonEditableDB";
import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../store_object/StoreObject_Dtos";

export type A_Generic_DBController = A_NonEditableDBController<any> | A_EditableDBControllerLayer<any, any>

/**
 * This is a DB that does regular queries
 * but does only inserts and deletes (no updates).
 */
export type A_NonEditableDBController<STORE_OBJECT_T extends NonPersistedStoreObjectStub> =
    NonEditableStoreDB_I<STORE_OBJECT_T>

/**
 * This is a DB that does regular queries, and does all aswell as updates.
 */
export type A_EditableDBControllerLayer<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> = (
        EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
)

type ObjectStoreAndTransaction = [IDBTransaction, IDBObjectStore]