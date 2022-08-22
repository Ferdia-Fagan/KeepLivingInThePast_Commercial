
// TODO: complete

import {
    StoreObjectInterfaceExample
} from "../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWIthCache__StoreDummy";
import {stitch, stitchObjects} from "../../../../../../utils/Stitching";
import {EditableStoreDB_I} from "../layers/layer0_db/implementations/EditableDB";
import {NonEditableStoreDB_I} from "../layers/layer0_db/implementations/NonEditableDB";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../layers/layer0_db/store_object/StoreObject_Dtos";
import {
    ID_TYPE,
    KEY_TYPE,
    Persisted
} from "../layers/layer0_db/store_object/StoreObject_Types";
import {A_EditableDBControllerLayer} from "../layers/layer0_db/types/DB_Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache_Implementations";
import {CreateDBManagerParams, EditableDB_Manager} from "./DB_Manager";

interface NonEditableDB_WithCache_Interface<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub
>
    extends NonEditableStoreDB_I<STORE_OBJECT_T> {}

interface EditableDB_WithCache_Interface<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>
    extends EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> {}

type A_NonEditableDB_WithCache<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub
> = NonEditableDB_WithCache_Interface<STORE_OBJECT_T>

export interface DBComponent<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> {
    db: A_EditableDBControllerLayer<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>
}

export interface CacheComponent<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub
> {
    cache: DBCacheInterface<STORE_OBJECT_T>
}

export class EditableDB_WithCache_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>
    implements
        EditableDB_WithCache_Interface<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>,
        DBComponent<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>,
        CacheComponent<STORE_OBJECT_T>
{

    db: A_EditableDBControllerLayer<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>
    cache: DBCacheInterface<STORE_OBJECT_T>

    constructor(
        db: A_EditableDBControllerLayer<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>,
        methodsToNotStitch: Set<string> = new Set([
            "addObj",
            "addObjs",
            "getObjByKey",
            "getObjByIndexColumn",
            "getObjByKeys",
            "db",
            "cache",
            "deleteObjById"
        ]),
        cache: DBCacheInterface<STORE_OBJECT_T>
    ) {
        this.db = db
        this.cache = cache

        stitch<EditableDB_WithCache_Manager<
            STORE_OBJECT_T,
            UPDATE_STORE_OBJECT_T
        >>({
            _this : this,
            methodsToNotStitch : methodsToNotStitch,
            keyToObjectToSwitch : "db"
        })
    }
    
    addObj: (newElementToStore: STORE_OBJECT_T) => Promise<Persisted<STORE_OBJECT_T>> = (newElementToStore: STORE_OBJECT_T): Promise<Persisted<STORE_OBJECT_T>> =>
        this.db.addObj(newElementToStore).then(newPersObj => {
            this.cache.cacheObject(newPersObj)
            return newPersObj
        })

    addObjs: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]> = (newObjectsToAdd: Array<STORE_OBJECT_T>) =>
        this.db.addObjs(newObjectsToAdd).then((persistedNewObjs) => {
            this.cache.cacheObjects(persistedNewObjs)
            return persistedNewObjs
        })

    getObjByKey = (objKey: KEY_TYPE) => {
        const objId: ID_TYPE | null = this.cache.getObjIdByKey(objKey);
        if(objId){
            return this.db.getObjById(objId)
        } else {
            return this.db.getObjByKey(objKey).then(obj => {
                this.cache.cacheObject(obj)
                return obj
            })
        }
    }

    getObjByIndexColumn = (indexName: string, value: IDBValidKey): Promise<Persisted<STORE_OBJECT_T>> => {
        return this.db.getObjByIndexColumn(indexName, value).then(obj => {
            this.cache.cacheObject(obj)
            return obj
        })
    }

    getObjsByKeys = (objKeys: KEY_TYPE[]): Promise<Persisted<STORE_OBJECT_T>[]> => {
        const cacheResponse = this.cache.getObjIdsByKeys(objKeys)

        const cachedIds: Promise<Persisted<STORE_OBJECT_T>[]> | null = (!cacheResponse.cachedIds.length)?
            null : this.db.getObjsByIds(cacheResponse.cachedIds)
        const nonCachedKeys: Promise<Persisted<STORE_OBJECT_T>[]> | null = (!cacheResponse.keysNotCached)?
            null : this.db.getObjsByKeys(cacheResponse.keysNotCached)
        nonCachedKeys.then()
        return Promise.all(
            [
                (!cacheResponse.cachedIds.length)?
                    null : this.db.getObjsByIds(cacheResponse.cachedIds),
                (!cacheResponse.keysNotCached)?
                    null : this.db.getObjsByKeys(cacheResponse.keysNotCached)
            ].filter(v => v != null)
        ).then(result => result.flat())
    }

    async deleteObjById(objId: number): Promise<void> {
        const obj = await this.db.getObjById(objId)
        await this.db.deleteObjById(objId)
        this.cache.deleteObjByKey(obj.key)
    }

    updateObject?: (storeObject: UPDATE_STORE_OBJECT_T) => void

}

export interface CreateDBWithCacheManagerParams<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> extends CreateDBManagerParams<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T> {
    cache: DBCacheInterface<STORE_OBJECT_T>,
    cachePrePopulateData?: STORE_OBJECT_T[]
}

export function create_DB_WithCache_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>(
    {
        db, methodsToNotStitch,
        cache, cachePrePopulateData
    }: CreateDBWithCacheManagerParams<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
): EditableDB_WithCache_Manager<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> {
    const manager =  new EditableDB_WithCache_Manager(db, methodsToNotStitch,cache)
    cachePrePopulateData.forEach(obj => {
        manager.cache.cacheObject(obj as any)
    })
    return manager
}

