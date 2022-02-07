
// TODO: complete

import {cache} from "awesome-typescript-loader/dist/cache";
import {MethodNotYetImplemented} from "../../../../../../utils/DevelopmentUtils";
import {A_NonEditableDBController, NonEditableStoreDBInterface} from "../layers/layer0_db/DB";
import {KEY_TYPE, Persisted, StoreObjectStub} from "../layers/layer0_db/store_object/Types";
import {DBCacheInterface} from "../layers/layer1_cache/DBCache";

class NonEditableDB_WithCache_Manager<
    STORE_OBJECT_T extends StoreObjectStub
>
    implements NonEditableStoreDBInterface<STORE_OBJECT_T>{

    private db: A_NonEditableDBController<STORE_OBJECT_T>
    private cache: DBCacheInterface<STORE_OBJECT_T>

    constructor(db: A_NonEditableDBController<STORE_OBJECT_T>, cache: DBCacheInterface<STORE_OBJECT_T>) {
        this.db = db
        this.cache = cache
    }

    addObject: (newElementToStore: STORE_OBJECT_T) => Promise<number> = (newElementToStore: STORE_OBJECT_T) =>
        this.db.addObject(newElementToStore).then(persistedObjectId => {
            this.cache.cacheObjectWithId(persistedObjectId, newElementToStore)
            return persistedObjectId
        })

    addObjects: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]> = (newObjectsToAdd: Array<STORE_OBJECT_T>) =>
        this.db.addObjects(newObjectsToAdd).then((persistedNewObjs) => {
            this.cache.cacheObjectsWithIds(persistedNewObjs)
            return persistedNewObjs
        })

    deleteObjectById(elementId: number): void {
        // TODO Complete
        throw new MethodNotYetImplemented()
    }

    getAllObjects(): Promise<Persisted<STORE_OBJECT_T>[]> {
        // TODO Complete
        throw new MethodNotYetImplemented()
    }

    getObjectById: (id: number) => Promise<Persisted<STORE_OBJECT_T>> = (id: number) =>
        this.db.getObjectById(id)

    getObjectByKey: (key: KEY_TYPE) => Promise<Persisted<STORE_OBJECT_T>> = (key: KEY_TYPE) =>
        this.cache.getObjectIdByKey(key)

    getObjectByKeys: (keys: KEY_TYPE[]) => Promise<Persisted<STORE_OBJECT_T>[]>

}

