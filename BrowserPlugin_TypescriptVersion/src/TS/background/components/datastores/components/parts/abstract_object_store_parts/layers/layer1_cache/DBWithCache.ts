import MapCache from "../../../../../../../utils/MapCache";
import {
    KEY_NAME,
    StoreObjectInterface,
    UpdatedStoreObjectInterface
} from "../layer0_db/store_object/StoreObject";
import {KEY_TYPE} from "../layer0_db/store_object/DataTypes";
import {CreateDBStore, CreateDBStoreHandler} from "../../factory/BuildDBConstructionActions";
import DB from "../layer0_db/DB";

// TODO: make DBSTore, DBCache and DBReport and compoenents so are composable, rather than extendable.

export default interface DBWithCacheInterface<STORE_T extends StoreObjectInterface> {
    getObjectByKey(key: KEY_TYPE): Promise<STORE_T>
}

/**
 * description:
 * by using this, 
 * store is assumed to have atleast:
 * {id, key,...}
 */
export abstract class DBWithCache<
    STORE_T extends StoreObjectInterface,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface
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
    STORE_T extends StoreObjectInterface,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
    T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
> {
    new (storeName: string, db: IDBDatabase): T
}

export async function builder<
    STORE_T extends StoreObjectInterface,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface,
    T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
>(
    DATABASE: string, DB_VERSION: number,STORE_NAME: string,
    createDBStore: CreateDBStoreHandler,
    objectToBuild: DBBuilderInterface<STORE_T, STORE_T_UPDATE_INTERFACE, T>
): Promise<T> {
    var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)

    return new objectToBuild(STORE_NAME, createDB);
}