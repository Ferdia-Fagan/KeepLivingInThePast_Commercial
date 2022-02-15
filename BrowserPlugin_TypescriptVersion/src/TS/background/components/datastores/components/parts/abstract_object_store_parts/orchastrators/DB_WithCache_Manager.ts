
import {
    A_EditableDBController,
    A_NonEditableDBController, DBConnectionBase, EditableDB,
    EditableStoreDBInterface, NonEditableDB,
    NonEditableStoreDBInterface
} from "../layers/layer0_db/DB";
import {
    ID_TYPE,
    KEY_TYPE,
    Persisted,
    StoreObjectStub,
    UpdatedStoreObjectStub
} from "../layers/layer0_db/store_object/Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache";

type A_GenericDBController = A_NonEditableDBController<any> | A_EditableDBController<any, any>

interface DB_Manager_DataRequirements<
    STORE_OBJECT_T extends StoreObjectStub
> {
    cache: DBCacheInterface<STORE_OBJECT_T>
}

abstract class DB_WithCache_Manager_Base<
    STORE_OBJECT_T extends StoreObjectStub
> extends DBConnectionBase {

    cache: DBCacheInterface<STORE_OBJECT_T>

    constructor(storeName: string, db: IDBDatabase, cache: DBCacheInterface<STORE_OBJECT_T>) {
        super(storeName, db)
        this.cache = cache
    }
}

interface NonEditableDB_WithCache_Manager_Interface<
    STORE_OBJECT_T extends StoreObjectStub
    >
    extends
        DB_WithCache_Manager_Base<STORE_OBJECT_T>,
        NonEditableDB<STORE_OBJECT_T>,
        DB_Manager_DataRequirements<STORE_OBJECT_T>,
        NonEditableStoreDBInterface<STORE_OBJECT_T> {

    deleteObj: (objId: ID_TYPE, objKey: KEY_TYPE) => void

}

interface EditableDB_WithCache_Manager_Interface<
    STORE_OBJECT_T extends StoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
    >
    extends
        DB_WithCache_Manager_Base<STORE_OBJECT_T>,
        EditableDB<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>,
        DB_Manager_DataRequirements<STORE_OBJECT_T>,
        NonEditableDB_WithCache_Manager_Interface<STORE_OBJECT_T>,
        EditableStoreDBInterface<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> {

}

// IMPLEMENTATIONS:

export class NonEditableDB_WithCache_Manager<
    STORE_OBJECT_T extends StoreObjectStub
>
    extends
        NonEditableDB<STORE_OBJECT_T>
    implements NonEditableDB_WithCache_Manager_Interface<STORE_OBJECT_T> {

    cache: DBCacheInterface<STORE_OBJECT_T>

    getObjByIndexColumn: (indexName: string, value: IDBValidKey) => Promise<import("../../../../../../../../../tests/utils/Types").RequiredKeys<STORE_OBJECT_T, "id">>;
    getObjsByIds: (objectIds: number[]) => Promise<import("../../../../../../../../../tests/utils/Types").RequiredKeys<STORE_OBJECT_T, "id">[]>;

    addObj = (newElementToStore: STORE_OBJECT_T) =>
        super.addObj(newElementToStore).then(persistedObjectId => {
            this.cache.cacheObjectWithId(persistedObjectId, newElementToStore)
            return persistedObjectId
        })

    addObjs = (newObjectsToAdd: Array<STORE_OBJECT_T>) =>
        super.addObjs(newObjectsToAdd).then((persistedNewObjs) => {
            this.cache.cacheObjectsWithIds(persistedNewObjs)
            return persistedNewObjs
        })

    getObjByKey = (objKey: KEY_TYPE) => {
        const objId: ID_TYPE | null = this.cache.getObjectIdByKey(objKey)
        if(objId){
            return super.getObjById(objId)
        } else {
            return super.getObjByKey(objKey)
        }
    }

    getObjByKeys = (objKeys: KEY_TYPE[]) => {
        const cacheResponse = this.cache.getObjectIdsByKeys(objKeys)

        return Promise.all(
            [
                (!cacheResponse.ids.length)?
                    null : super.getObjsByIds(cacheResponse.ids),
                (!cacheResponse.keysNotCached)?
                    null : super.getObjByKeys(cacheResponse.keysNotCached)
            ].filter(v => v != null)
        ).then(result => result.flat())
    }

    deleteObj = (objId: ID_TYPE, objKey: KEY_TYPE) => {
        this.deleteObjById(objId)
        this.cache.deleteObjByKey(objKey)
    }
}

export class EditableDB_WithCache_Manager<
    STORE_OBJECT_T extends StoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> extends
    NonEditableDB_WithCache_Manager<STORE_OBJECT_T>

    implements EditableDB_WithCache_Manager_Interface<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>{

    cache: DBCacheInterface<STORE_OBJECT_T>

    updateObject(storeObject: UPDATE_STORE_OBJECT_T): void {

    }


}
