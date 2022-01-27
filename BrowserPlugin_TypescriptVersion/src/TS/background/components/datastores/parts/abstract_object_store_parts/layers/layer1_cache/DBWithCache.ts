import MapCache from "../../../../../../utils/MapCache";
import {KEY_NAME} from "../../../../components/stores/utils/Utils";
import {IndexObject, UpdateObjectIndex} from "../../../store_objects_interfaces/base_store_objects/IndexObject";
import {KEY_TYPE} from "../../../store_objects_interfaces/types/Types";
import {CreateDBStore, CreateDBStoreHandler} from "../../factory/BuildDB";
import DB from "../layer0_db/DB";

// TODO: make DBSTore, DBCache and DBReport and compoenents so are composable, rather than extendable.

export default interface DBWithCacheInterface<STORE_T extends IndexObject> {
    getObjectByKey(key: KEY_TYPE): Promise<STORE_T>
}

/**
 * description:
 * by using this, 
 * store is assumed to have atleast:
 * {id, key,...}
 */
export abstract class DBWithCache<
    STORE_T extends IndexObject,
    STORE_T_UPDATE_INTERFACE extends UpdateObjectIndex
>
        extends DB<STORE_T, STORE_T_UPDATE_INTERFACE> {

    protected cache = new MapCache<IDBValidKey, number>(100, 10);

    abstract getStoreObjectKey(object: STORE_T): IDBValidKey

    /**
     * Add new element (must not exist with key already) for system to indexdb and layer1_cache
     * (does not check layer1_cache)
     * @param object
     */
    protected addObject(object: STORE_T): Promise<number>{
        return super.addObject(object).then(
            objectId => {
                this.cache.set(
                    this.getStoreObjectKey(object),
                    objectId
                )
                return objectId
            }
        )
    }

    protected addObjects(newObjectsToAdd: Array<STORE_T>): Promise<STORE_T[]> {
        return super.addObjects(newObjectsToAdd).then(newObjectsHaveAdded => {
            return newObjectsHaveAdded.map((newObjectHaveAdded): STORE_T => {
                    this.cache.set(
                        this.getStoreObjectKey(newObjectHaveAdded),
                        newObjectHaveAdded.id
                    )
                    return newObjectHaveAdded
            })
        })
    }

    protected getObjectByKey(key: KEY_TYPE): Promise<STORE_T>{
        if(this.cache.has(key)){
            let cachedIdValue = this.cache.get(key);
            return super.getObjectById(cachedIdValue)
        } else {
            return super.getObjectByIndexColumn(
                KEY_NAME, key
            );
        }
    }

}

export interface DBBuilderInterface<
    STORE_T extends IndexObject,
    STORE_T_UPDATE_INTERFACE extends UpdateObjectIndex,
    T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
> {
    new (storeName: string, db: IDBDatabase): T
}

export async function builder<
    STORE_T extends IndexObject,
    STORE_T_UPDATE_INTERFACE extends UpdateObjectIndex,
    T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
>(
    DATABASE: string, DB_VERSION: number,STORE_NAME: string,
    createDBStore: CreateDBStoreHandler,
    objectToBuild: DBBuilderInterface<STORE_T, STORE_T_UPDATE_INTERFACE, T>
): Promise<T> {
    var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)

    return new objectToBuild(STORE_NAME, createDB);
}