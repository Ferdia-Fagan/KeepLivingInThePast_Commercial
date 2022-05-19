
// TODO: complete

import {
    StoreObjectInterfaceExample
} from "../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DBWIthCache__StoreDummy";
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
import {A_EditableDBController} from "../layers/layer0_db/types/DB_Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache_Implementations";
import {EditableDB_Manager, stitch, stitchObjects} from "./DB_Manager";

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
    db: A_EditableDBController<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>
}


export class EditableDB_WithCache_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>
    implements
        EditableDB_WithCache_Interface<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>,
        DBComponent<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
{

    db: A_EditableDBController<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>
    cache: DBCacheInterface<STORE_OBJECT_T>

    constructor(db: A_EditableDBController<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>, cache: DBCacheInterface<STORE_OBJECT_T>) {
        this.db = db
        this.cache = cache

        stitch<EditableDB_WithCache_Manager<
            STORE_OBJECT_T,
            UPDATE_STORE_OBJECT_T
        >>(
            this,
            new Set(["addObj",
                "addObjs",
                "getObjByKey",
                "getObjByIndexColumn",
                "getObjByKeys",
                "db",
                "cache",
                "deleteObjById"]),
            "db"
        )
    }

    addObj: (newElementToStore: STORE_OBJECT_T) => Promise<Persisted<STORE_OBJECT_T>> = (newElementToStore: STORE_OBJECT_T): Promise<Persisted<STORE_OBJECT_T>> =>
        this.db.addObj(newElementToStore).then(newPersObj => {
            this.cache.cacheObjectWithId(newPersObj.id, newElementToStore)
            return newPersObj
        })

    addObjs: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]> = (newObjectsToAdd: Array<STORE_OBJECT_T>) =>
        this.db.addObjs(newObjectsToAdd).then((persistedNewObjs) => {
            this.cache.cacheObjectsWithIds(persistedNewObjs)
            return persistedNewObjs
        })

    getObjByKey = (objKey: KEY_TYPE) => {
        const objId: ID_TYPE | null = this.cache.getObjectIdByKey(objKey)
        if(objId){
            return this.db.getObjById(objId)
        } else {
            return this.db.getObjByKey(objKey)
        }
    }

    getObjByIndexColumn = (indexName: string, value: IDBValidKey): Promise<Persisted<STORE_OBJECT_T>> => {
        return this.db.getObjByIndexColumn(indexName, value)
    }

    getObjByKeys = (objKeys: KEY_TYPE[]): Promise<Persisted<STORE_OBJECT_T>[]> => {
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

    async deleteObjById(objId: number): Promise<void> {
        const obj = await this.db.getObjById(objId)
        await this.db.deleteObjById(objId)
        this.cache.deleteObjByKey(obj.key)
    }

}

export function create_DB_WithCache_Manager<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
>(
    db: A_EditableDBController<STORE_OBJECT_T,UPDATE_STORE_OBJECT_T>,
    cache: DBCacheInterface<STORE_OBJECT_T>,
    prepopulateCache?: StoreObjectInterfaceExample[]
): EditableDB_WithCache_Manager<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> {
    const manager =  new EditableDB_WithCache_Manager(db,cache)
    prepopulateCache.forEach(obj => {
        manager.cache.cacheObjectWithId(obj.id, obj as any)
    })
    return manager
    // return stitchObjects(
    //     new EditableDB_WithCache_Manager(db,cache),
    //     db
    // ) as (EditableDB_WithCache_Manager<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T> & EditableStoreDB_I<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>)
}

