
// TODO: complete

import {A_NonEditableDBController, NonEditableStoreDBInterface} from "../layers/layer0_db/DB";
import {ID_TYPE, KEY_TYPE, Persisted, StoreObjectStub} from "../layers/layer0_db/store_object/Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache";

interface NonEditableDB_WithCache_Interface<
    STORE_OBJECT_T extends StoreObjectStub
> extends Omit<
    NonEditableStoreDBInterface<STORE_OBJECT_T>,
    'deleteObjById'
> {
    deleteObjById: (objId: number, objKey: KEY_TYPE) => void
}

type A_NonEditableDB_WithCache<
    STORE_OBJECT_T extends StoreObjectStub
> = NonEditableDB_WithCache_Interface<STORE_OBJECT_T>

class NonEditableDB_WithCache_Manager<
    STORE_OBJECT_T extends StoreObjectStub
>
    implements A_NonEditableDB_WithCache<STORE_OBJECT_T>{

    private db: A_NonEditableDBController<STORE_OBJECT_T>
    private cache: DBCacheInterface<STORE_OBJECT_T>

    constructor(db: A_NonEditableDBController<STORE_OBJECT_T>, cache: DBCacheInterface<STORE_OBJECT_T>) {
        this.db = db
        this.cache = cache
    }

    getObjByIndexColumn: (indexName: string, value: IDBValidKey) => Promise<import("../../../../../../../../../tests/utils/Types").RequiredKeys<STORE_OBJECT_T, "id">>;
    getObjsByIds: (objectIds: number[]) => Promise<import("../../../../../../../../../tests/utils/Types").RequiredKeys<STORE_OBJECT_T, "id">[]>;

    addObj: (newElementToStore: STORE_OBJECT_T) => Promise<number> = (newElementToStore: STORE_OBJECT_T) =>
        this.db.addObj(newElementToStore).then(persistedObjectId => {
            this.cache.cacheObjectWithId(persistedObjectId, newElementToStore)
            return persistedObjectId
        })

    addObjs: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]> = (newObjectsToAdd: Array<STORE_OBJECT_T>) =>
        this.db.addObjs(newObjectsToAdd).then((persistedNewObjs) => {
            this.cache.cacheObjectsWithIds(persistedNewObjs)
            return persistedNewObjs
        })

    getAllObjs(): Promise<Persisted<STORE_OBJECT_T>[]> {
        return this.db.getAllObjs()
    }

    getObjById: (id: number) => Promise<Persisted<STORE_OBJECT_T>> = (id: number) =>
        this.db.getObjById(id)

    getObjByKey = (objKey: KEY_TYPE) => {
        const objId: ID_TYPE | null = this.cache.getObjectIdByKey(objKey)
        if(objId){
            return this.db.getObjById(objId)
        } else {
            return this.db.getObjByKey(objKey)
        }
    }

    getObjByKeys = (objKeys: KEY_TYPE[]) => {
        const cacheResponse = this.cache.getObjectIdsByKeys(objKeys)

        const cachedIds: Promise<Persisted<STORE_OBJECT_T>[]> | null = (!cacheResponse.ids.length)?
            null : this.db.getObjsByIds(cacheResponse.ids)
        const nonCachedKeys: Promise<Persisted<STORE_OBJECT_T>[]> | null = (!cacheResponse.keysNotCached)?
            null : this.db.getObjByKeys(cacheResponse.keysNotCached)
        nonCachedKeys.then()
        return Promise.all(
            [
                (!cacheResponse.ids.length)?
                    null : this.db.getObjsByIds(cacheResponse.ids),
                (!cacheResponse.keysNotCached)?
                    null : this.db.getObjByKeys(cacheResponse.keysNotCached)
            ].filter(v => v != null)
        ).then(result => result.flat())
    }

    deleteObjById(objId: number, objKey: KEY_TYPE): void {
        this.db.deleteObjById(objId)
        this.cache.deleteObjByKey(objKey)
    }

}
