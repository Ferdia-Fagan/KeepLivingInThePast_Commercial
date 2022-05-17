import MapCache from "../../../../../../utils/MapCache";
import {NonPersistedStoreObjectStub} from "../layer0_db/store_object/StoreObject_Dtos";
import {ID_TYPE, KEY_TYPE} from "../layer0_db/store_object/StoreObject_Types";
import {DBCache, DBCacheInterface} from "./DBCache_Implementations";

/**
 * Notes:
 * 1) Cache does not handle updates
 */


export {
    // Interface
    // Types
    A_DBCacheController
}

type A_DBCacheController<STORE_T extends NonPersistedStoreObjectStub> = DBCacheInterface<STORE_T>

export type StoreObjectKeyGetter<STORE_T extends NonPersistedStoreObjectStub> = (object: STORE_T) => IDBValidKey