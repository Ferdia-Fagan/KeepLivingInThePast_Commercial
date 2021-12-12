import {DBInterface} from "../../../../../src/background/datastores/abstract_object_store_parts/layers/db/DBInterface";
import DBWithCacheInterface
    from "../../../../../src/background/datastores/abstract_object_store_parts/layers/cache/DBWithCacheInterface";
import {ID_NAME, KEY_NAME} from "../../../../../src/background/datastores/stores/utils/Utils";
import {DBWithCacheWithReportingOfAllOperationsOnData} from "../../../../../src/background/datastores/abstract_object_store_parts/layers/reporting/DBWithCacheWithReporting";
import DBWithCacheWithReportingOfAllOperationsOnDataInterface
    from "../../../../../src/background/datastores/abstract_object_store_parts/layers/reporting/interfaces/DBWithCacheWithReportingOfAllOperationsOnDataInterface";
import IndexObject
    from "../../../../../src/background/datastores/store_objects_interfaces/base_store_objects/IndexObject";
import {ID_TYPE, KEY_TYPE} from "../../../../../src/background/datastores/store_objects_interfaces/types/Types";

export interface StoreObjectInterfaceExample extends IndexObject{
    id?: ID_TYPE
    theKey: KEY_TYPE,
    dataToHaveForUpdateReport?: number
}
export interface StoreObjectUpdateReportInterfaceExample extends IndexObject{
    id: ID_TYPE
    dataToHaveForUpdateReport?: number
}

const THE_KEY_NAME = "theKey"

export class DBWithCacheWithReporting_StoreDummy extends DBWithCacheWithReportingOfAllOperationsOnData<StoreObjectInterfaceExample, StoreObjectUpdateReportInterfaceExample>
    implements  DBInterface<StoreObjectInterfaceExample>,
                DBWithCacheInterface<StoreObjectInterfaceExample>,
                DBWithCacheWithReportingOfAllOperationsOnDataInterface<StoreObjectInterfaceExample> {

    private constructor(STORE_NAME: string, DB: IDBDatabase){
        super(STORE_NAME, DB)
    }

    getStoreObjectKey(storeObj: StoreObjectInterfaceExample): IDBValidKey {
        return storeObj.theKey;
    }

    static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string,
                         testDataForDB?: StoreObjectInterfaceExample[],
                         testDataForCache?: StoreObjectInterfaceExample[],){

        function onUpgradeNeededHandler(event: any){    // TODO: correct any
            let databaseToCreate: IDBDatabase = event.target.result
            var objectStore = databaseToCreate.createObjectStore(
                STORE_NAME, { keyPath: ID_NAME, autoIncrement: true });

            objectStore.createIndex(
                KEY_NAME,
                THE_KEY_NAME,
                {unique: true}
            )

        }

        var DB: IDBDatabase = await new Promise<IDBDatabase>((resolve,reject) => {
            var openDBReq = indexedDB.open(DATABASE, DB_VERSION);

            openDBReq.onsuccess = function (evt: any & Event) {
                // db = evt.result;
                if(testDataForDB){
                    let transaction = openDBReq.result.transaction("test",'readwrite')
                    let store: any & IDBObjectStore = transaction.objectStore("test")

                    let clearStore = store.clear()

                    store._rawObjectStore.keyGenerator.num = 0

                    clearStore.onsuccess = function(){
                        let testDataInsertRequests: IDBRequest<IDBValidKey>[] = []

                        testDataForDB.forEach(testDataToInsert => {
                            testDataInsertRequests.push(store.add(testDataToInsert))
                        })
                        Promise.all(testDataInsertRequests).then(e => {
                            resolve(evt.target.result)
                        })
                    }

                } else {
                    resolve(openDBReq.result)
                }
            }

            openDBReq.onerror = function (evt) {
                console.error("openDb:", "db request fail");
            };

            openDBReq.onupgradeneeded = onUpgradeNeededHandler

        })
        let instance = new DBWithCacheWithReporting_StoreDummy(STORE_NAME, DB);
        if(testDataForCache){
            testDataForCache.forEach(testDataForCache => {
                instance.cache.set(
                    testDataForCache.theKey, testDataForCache.id)
            })
        }

        return instance
    }

    addObject = (newElementToStore: StoreObjectInterfaceExample): Promise<number> => {
        return super.addObject(newElementToStore).then(result =>
            result
        )
    }


    getObjectByIndexColumn = (indexName: string, value: IDBValidKey): Promise<StoreObjectInterfaceExample> =>
        super.getObjectByIndexColumn(indexName, value)

    getAllObjects = (): Promise<Array<StoreObjectInterfaceExample>> =>
        super.getAllObjects()

    getObjectByKey = (key: string): Promise<StoreObjectInterfaceExample> =>
        super.getObjectByKey(key)

    updateObject = (storeObject: StoreObjectInterfaceExample): void =>
        super.updateObject(storeObject)

    deleteObjectById = (objectId: number): void =>
        super.deleteObjectById(objectId)
}