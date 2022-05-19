import MapCache from "../../../../../../utils/MapCache";
import {NonPersistedStoreObjectStub} from "../layer0_db/store_object/StoreObject_Dtos";
import {ID_TYPE, KEY_TYPE} from "../layer0_db/store_object/StoreObject_Types";
import {StoreObjectKeyGetter} from "./DBCache_Types";

export interface GetCachedIdsByKeys {
    ids: ID_TYPE[],
    keysNotCached: KEY_TYPE[]
}

export interface DBCacheInterface<P_STORE_OBJECT_T extends NonPersistedStoreObjectStub> {
    cacheObjectWithId: (persistedObjId: ID_TYPE, newObj: P_STORE_OBJECT_T) => void
    cacheObjectsWithIds: (newObjs: Array<P_STORE_OBJECT_T>) => void // TODO: test
    getObjectIdByKey: (key: KEY_TYPE) => ID_TYPE | undefined
    getObjectIdsByKeys: (keys: KEY_TYPE[]) => GetCachedIdsByKeys // TODO: test

    deleteObjByKey: (key: KEY_TYPE) => void // TODO: test
}

/**
 * description:
 * by using this,
 * store is assumed to have atleast:
 * {id, key,...}
 */
export class DBCache<P_STORE_OBJECT_T extends NonPersistedStoreObjectStub> implements DBCacheInterface<P_STORE_OBJECT_T> {

    protected cache: MapCache<KEY_TYPE, ID_TYPE>;

    protected getStoreObjectKey: StoreObjectKeyGetter<P_STORE_OBJECT_T>

    // TODO: tunable (change cache size etc)
    constructor(
        storeObjectKeyGetter: StoreObjectKeyGetter<P_STORE_OBJECT_T>,
        cache: MapCache<KEY_TYPE, ID_TYPE> = new MapCache<KEY_TYPE, ID_TYPE>()
    ) {

        this.cache = cache
        this.getStoreObjectKey = storeObjectKeyGetter
    }

    /**
     * Add new element (must not exist with key already) for system to indexdb and layer1_cache
     * (does not check layer1_cache)
     * @param persistedObjId
     * @param newObj
     */
    cacheObjectWithId(persistedObjId: ID_TYPE, newObj: P_STORE_OBJECT_T) {
        this.cache.set(
            this.getStoreObjectKey(newObj),
            persistedObjId
        )
    }

    cacheObjectsWithIds(newObjs: Array<P_STORE_OBJECT_T>): void {
        newObjs.forEach(newObj => {
            this.cache.set(
                this.getStoreObjectKey(newObj),
                newObj.id
            )
        })
    }

    getObjectIdByKey(key: KEY_TYPE): ID_TYPE | undefined {
        return this.cache.get(key)
    }

    getObjectIdsByKeys(objKeys: KEY_TYPE[]): GetCachedIdsByKeys | undefined {
        return objKeys.reduce((result, objKey) => {
            if (this.cache.has(objKey)) {
                result.ids.push(this.cache.get(objKey))
            } else {
                result.keysNotCached.push(objKey)
            }
            return result
        }, {
            ids: [],
            keysNotCached: []
        })
    }

    deleteObjByKey = (key: KEY_TYPE) => this.cache.deleteKey(key)

}

