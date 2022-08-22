import MapCache from "../../../../../../utils/MapCache";
import {NonPersistedStoreObjectStub} from "../layer0_db/store_object/StoreObject_Dtos";
import {ID_TYPE, KEY_TYPE, Persisted} from "../layer0_db/store_object/StoreObject_Types";
import {StoreObjectKeyGetter} from "./DBCache_Types";

export interface GetCachedIdsByKeys {
    cachedIds: ID_TYPE[],
    keysNotCached: KEY_TYPE[]
}

export interface DBCacheInterface<STORE_OBJECT_T extends NonPersistedStoreObjectStub> {
    cacheObject: (persistedObj: Persisted<STORE_OBJECT_T>) => void
    cacheObjects: (newObjs: Array<STORE_OBJECT_T>) => void // TODO: test
    getObjIdByKey: (key: KEY_TYPE) => ID_TYPE | undefined
    getObjIdsByKeys: (keys: KEY_TYPE[]) => GetCachedIdsByKeys // TODO: test

    deleteObjByKey: (key: KEY_TYPE) => void // TODO: test
}

/**
 * description:
 * by using this,
 * store is assumed to have atleast:
 * {id, key,...}
 */
export class DBCache<STORE_OBJECT_T extends NonPersistedStoreObjectStub> implements DBCacheInterface<STORE_OBJECT_T> {

    protected cache: MapCache<KEY_TYPE, ID_TYPE>;

    protected getStoreObjectKey: StoreObjectKeyGetter<STORE_OBJECT_T>

    // TODO: tunable (change cache size etc)
    constructor(
        storeObjectKeyGetter: StoreObjectKeyGetter<STORE_OBJECT_T>,
        cache: MapCache<KEY_TYPE, ID_TYPE> = new MapCache<KEY_TYPE, ID_TYPE>()
    ) {

        this.cache = cache
        this.getStoreObjectKey = storeObjectKeyGetter
    }

    /**
     * Add new element (must not exist with key already) for system to indexdb and layer1_cache
     * (does not check layer1_cache)
     * @param persistedObj
     */
    cacheObject(persistedObj: Persisted<STORE_OBJECT_T>): void {
        this.cache.set(
            this.getStoreObjectKey(persistedObj),
            persistedObj.id
        )
    }

    cacheObjects(newObjs: Array<STORE_OBJECT_T>): void {
        newObjs.forEach(newObj => {
            this.cache.set(
                this.getStoreObjectKey(newObj),
                newObj.id
            )
        })
    }

    getObjIdByKey(key: KEY_TYPE): ID_TYPE | undefined {
        return this.cache.get(key)
    }

    getObjIdsByKeys(objKeys: KEY_TYPE[]): GetCachedIdsByKeys | undefined {
        return objKeys.reduce((result, objKey) => {
            if (this.cache.has(objKey)) {
                result.cachedIds.push(this.cache.get(objKey))
            } else {
                result.keysNotCached.push(objKey)
            }
            return result
        }, {
            cachedIds: [],
            keysNotCached: []
        })
    }

    deleteObjByKey = (key: KEY_TYPE) => this.cache.deleteKey(key)

}

