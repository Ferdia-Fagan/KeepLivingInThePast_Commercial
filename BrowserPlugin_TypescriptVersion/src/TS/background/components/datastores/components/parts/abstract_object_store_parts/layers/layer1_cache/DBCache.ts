import MapCache from "../../../../../../../utils/MapCache";
import {ID_TYPE, KEY_TYPE, StoreObjectStub} from "../layer0_db/store_object/Types";

/**
 * Notes:
 * 1) Cache does not handle updates
 */


export {
    // Interface
    DBCacheInterface,
    // Types
    A_DBCacheController,
    // Abstract concrete
    DBCache
}

interface DBCacheInterface<P_STORE_OBJECT_T extends StoreObjectStub> {
    cacheObjectWithId: (persistedObjId: ID_TYPE, newObj: P_STORE_OBJECT_T) => void
    cacheObjectsWithIds: (newObjs: Array<P_STORE_OBJECT_T>) => void
    getObjectIdByKey: (key: KEY_TYPE) => ID_TYPE | undefined
    getObjectIdsByKeys: (keys: KEY_TYPE[]) => GetCachedIdsByKeys

    deleteObjByKey: (key: KEY_TYPE) => void
}

type A_DBCacheController<STORE_T extends StoreObjectStub> = DBCacheInterface<STORE_T>

export type StoreObjectKeyGetter<STORE_T extends StoreObjectStub> = (object: STORE_T) => IDBValidKey

interface GetCachedIdsByKeys {
    ids: ID_TYPE[],
    keysNotCached: KEY_TYPE[]
}

/**
 * description:
 * by using this, 
 * store is assumed to have atleast:
 * {id, key,...}
 */
class DBCache<
    P_STORE_OBJECT_T extends StoreObjectStub
> implements DBCacheInterface<P_STORE_OBJECT_T>{

    protected cache: MapCache<KEY_TYPE, ID_TYPE>;

    protected getStoreObjectKey: StoreObjectKeyGetter<P_STORE_OBJECT_T>

    // TODO: tunable (change cache size etc)
    constructor(
        storeObjectKeyGetter: StoreObjectKeyGetter<P_STORE_OBJECT_T>,
        cache: MapCache<KEY_TYPE, ID_TYPE>
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

    getObjectIdsByKeys(objKeys: KEY_TYPE[]): GetCachedIdsByKeys {
        return objKeys.reduce((result,objKey) => {
            if(this.cache.has(objKey)) {
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

function createDbCache<STORE_T extends StoreObjectStub>(
    storeObjectKeyGetter: StoreObjectKeyGetter<STORE_T>,
    cacheInitData: STORE_T[] = []
) {
    return new DBCache(
        storeObjectKeyGetter,
        new MapCache<KEY_TYPE, ID_TYPE>(
            new Map<KEY_TYPE, ID_TYPE>(
                cacheInitData.map(testDataToAdd => [
                    storeObjectKeyGetter(testDataToAdd), testDataToAdd.id
                ])
            ),
            100, 10
        )
    )
}

// export interface DBBuilderInterface<
//     STORE_T extends StoreObjectInterface,
//     STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
//     T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
// > {
//     new (storeName: string, db: IDBDatabase): T
// }
//
// export async function builder<
//     STORE_T extends StoreObjectInterface,
//     STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
//     T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
// >(
//     DATABASE: string, DB_VERSION: number,STORE_NAME: string,
//     createDBStore: CreateDBStoreHandler,
//     objectToBuild: DBBuilderInterface<STORE_T, STORE_T_UPDATE_INTERFACE, T>
// ): Promise<T> {
//     var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)
//
//     return new objectToBuild(STORE_NAME, createDB);
// }