import MapCache from "../../../../utils/MapCache";
import DB from "../db/DB";
import IndexObject from "../../../store_objects_interfaces/base_store_objects/IndexObject";
import {ID_NAME, KEY_NAME} from "../../../stores/utils/Utils";
import {CreateDBStore, CreateDBStoreHandler, GetCreateDBStoreHandler} from "../../factory/BuildDB";
import {DBWithCacheWithReporting} from "../reporting/DBWithCacheWithReporting";
import TagObject from "../../../stores/tags/TagObject";
import {KEY_TYPE} from "../../../store_objects_interfaces/types/Types";
// import {TagsCollection} from "../stores/TagsCollection";

// TODO: make DBSTore, DBCache and DBReport and compoenents so are composable, rather than extendable.

// interface DBWithCacheInterface<STORE_T extends IndexObject, KEY_T extends IDBValidKey> extends
//     DBInterface<STORE_T>{
//     cache: MapCache<IDBValidKey, number>;
//
//     getObjectByKey(key_value: KEY_T): Promise<STORE_T>
// }

/**
 * description:
 * by using this, 
 * store is assumed to have atleast:
 * {id, key,...}
 */
export abstract class DBWithCache<
    STORE_T extends IndexObject,
    STORE_T_UPDATE_INTERFACE extends IndexObject
>
        extends DB<STORE_T, STORE_T_UPDATE_INTERFACE> {

    protected cache = new MapCache<IDBValidKey, number>(100, 10);

    abstract getStoreObjectKey(object: STORE_T): IDBValidKey

    // TODO: remove
    // static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string){
    //     function onUpgradeNeededHandler(event: any){    // TODO: correct any
    //         var objectStore = event.currentTarget.result.createObjectStore(
    //             STORE_NAME, { keyPath: ID, autoIncrement: true });
    //
    //         objectStore.createIndex(
    //             "KEY",
    //             "KEY",
    //             {unique: true}
    //         )
    //
    //     }
    // }

    /**
     * Add new element (must not exist with key already) for system to indexdb and cache
     * (does not check cache)
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
    STORE_T_UPDATE_INTERFACE extends IndexObject,
    T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
> {
    new (storeName: string, db: IDBDatabase): T
}

export async function builder<
    STORE_T extends IndexObject,
    STORE_T_UPDATE_INTERFACE extends IndexObject,
    T extends DB<STORE_T, STORE_T_UPDATE_INTERFACE>
>(
    DATABASE: string, DB_VERSION: number,STORE_NAME: string,
    createDBStore: CreateDBStoreHandler,
    objectToBuild: DBBuilderInterface<STORE_T, STORE_T_UPDATE_INTERFACE, T>
): Promise<T> {
    var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)

    return new objectToBuild(STORE_NAME, createDB);
}