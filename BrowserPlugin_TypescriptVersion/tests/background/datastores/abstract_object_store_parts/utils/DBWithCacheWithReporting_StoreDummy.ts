import {
    DBInterface
} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/DB";
import DBWithCacheInterface
    from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer1_cache/DBWithCache";
import {
    ID_NAME, KEY_NAME,
    StoreObjectInterface, UpdatedStoreObjectInterface
} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject";
import {
    DBWithCacheWithReportingOfAllOperationsOnData,
    DBWithCacheWithReportingOfOperationsOnDataInterfaces
} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer2_reporting/DBWithCacheWithReporting";
import {ID_TYPE, KEY_TYPE} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/store_object/DataTypes";

export interface StoreObjectInterfaceExample extends StoreObjectInterface{
    id?: ID_TYPE
    theKey: KEY_TYPE,
    dataToHaveForUpdateReport?: number
}
export interface StoreObjectUpdateReportInterfaceExample extends UpdatedStoreObjectInterface{
    id: ID_TYPE
    dataToHaveForUpdateReport?: number
}

const THE_KEY_NAME = "theKey"

export class DBWithCacheWithReporting_StoreDummy
    extends DBWithCacheWithReportingOfAllOperationsOnData<StoreObjectInterfaceExample, StoreObjectUpdateReportInterfaceExample>
    implements  DBInterface<StoreObjectInterfaceExample, StoreObjectUpdateReportInterfaceExample>,
                DBWithCacheInterface<StoreObjectInterfaceExample>,
                DBWithCacheWithReportingOfOperationsOnDataInterfaces<StoreObjectInterfaceExample, StoreObjectUpdateReportInterfaceExample> {

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
                // layer0_db = evt.result;
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
                console.error("openDb:", "layer0_db request fail");
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

    updateObject = (storeObject: StoreObjectUpdateReportInterfaceExample): void =>
        super.updateObject(storeObject)

    deleteObjectById = (objectId: number): void =>
        super.deleteObjectById(objectId)
}