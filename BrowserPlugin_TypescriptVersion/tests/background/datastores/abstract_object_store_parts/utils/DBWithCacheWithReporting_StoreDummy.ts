import {
    NonPersistedStoreObjectStub
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {
    ID_TYPE, KEY_TYPE, PersistedStoreObject
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Types";
import {
    DBAllOperationsReporting, DBReportInterface
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer2_reporting/implementations/DBAllOperationsReporting";
import {
    ExtractReportInformationFunc
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer2_reporting/implementations/DBInsertOperationsReporting";
import {
    DeleteReport, InsertReport,
    UpdatesReport
} from "../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer2_reporting/reports/dtos/IndividualReports";

export interface StoreObjectInterfaceExample
    extends PersistedStoreObject {
    dataToHaveForUpdateReport: string
    otherDate: string
}
export interface StoreObjectUpdateReportInterfaceExample
    extends PersistedStoreObject {
    dataToHaveForUpdateReport: string
}

// TODO: improve
export function extractStoreObjectReportExample(obj: StoreObjectInterfaceExample): StoreObjectUpdateReportInterfaceExample {
    return {
        id: obj.id,
        key: obj.key,
        dataToHaveForUpdateReport: obj.dataToHaveForUpdateReport
    }
}

const THE_KEY_NAME = "theKey"

export class DBWithCacheWithReporting_StoreDummy<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends DBAllOperationsReporting<STORE_OBJECT_T,R_STORE_REPORT_T>{

    static builder<
        STORE_OBJECT_T extends NonPersistedStoreObjectStub,
        R_STORE_REPORT_T extends PersistedStoreObject
    >(params: {
        newObjectAddedReports?: InsertReport<R_STORE_REPORT_T>,
        updatedObjectReports?: UpdatesReport<R_STORE_REPORT_T>,
        deletedObjectReports?: DeleteReport,
        extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>
    }) {
        if(params.newObjectAddedReports == null){
            params.newObjectAddedReports = new Map<ID_TYPE, R_STORE_REPORT_T>()
        }
        if(params.updatedObjectReports == null){
            params.updatedObjectReports = new Map<ID_TYPE, R_STORE_REPORT_T>()
        }
        if(params.deletedObjectReports == null){
            params.deletedObjectReports = new Set<ID_TYPE>()
        }
        const dbCacheDummyInstance = new DBWithCacheWithReporting_StoreDummy<
            STORE_OBJECT_T,R_STORE_REPORT_T
        >(
    {
                newObjectAddedReports: params.newObjectAddedReports,
                updatedObjectReports: params.updatedObjectReports,
                deletedObjectReports: params.deletedObjectReports
            },
            params.extractReportInformationFunc
        )
        
        return dbCacheDummyInstance
    }

    // reportAddedObject(newSyncedObj: STORE_OBJECT_T): void {
    //     return super.reportAddedObject(newSyncedObj)
    // }
    //
    // reportDeletedObject(id: number): void {
    //     return super.reportDeletedObject(id)
    // }
    //
    // reportUpdateObject(updatedObject: STORE_OBJECT_T): void {
    //     return super.reportUpdateObject(updatedObject)
    // }

}

// export class DBWithCacheWithReporting_StoreDummy
//     extends DBWithCacheWithReportingOfAllOperationsOnData<StoreObjectInterfaceExample, StoreObjectUpdateReportInterfaceExample>
//     implements  NonEditableStoreDBInterface<StoreObjectInterfaceExample, StoreObjectUpdateReportInterfaceExample>,
//                 DBWithCacheInterface<StoreObjectInterfaceExample>,
//                 DBWithCacheWithReportingOfOperationsOnDataInterfaces<StoreObjectInterfaceExample, StoreObjectUpdateReportInterfaceExample> {
//
//     private constructor(STORE_NAME: string, DB: IDBDatabase){
//         super(STORE_NAME, DB)
//     }
//
//     getStoreObjectKey(storeObj: StoreObjectInterfaceExample): IDBValidKey {
//         return storeObj.theKey;
//     }
//
//     static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string,
//                          testDataForDB?: StoreObjectInterfaceExample[],
//                          testDataForCache?: StoreObjectInterfaceExample[],){
//
//         function onUpgradeNeededHandler(event: any){    // TODO: correct any
//             let databaseToCreate: IDBDatabase = event.target.result
//             var objectStore = databaseToCreate.createObjectStore(
//                 STORE_NAME, { keyPath: ID_NAME, autoIncrement: true });
//
//             objectStore.createIndex(
//                 KEY_NAME,
//                 THE_KEY_NAME,
//                 {unique: true}
//             )
//
//         }
//
//         var DB: IDBDatabase = await new Promise<IDBDatabase>((resolve,reject) => {
//             var openDBReq = indexedDB.open(DATABASE, DB_VERSION);
//
//             openDBReq.onsuccess = function (evt: any & Event) {
//                 // layer0_db = evt.result;
//                 if(testDataForDB){
//                     let transaction = openDBReq.result.transaction("test",'readwrite')
//                     let store: any & IDBObjectStore = transaction.objectStore("test")
//
//                     let clearStore = store.clear()
//
//                     store._rawObjectStore.keyGenerator.num = 0
//
//                     clearStore.onsuccess = function(){
//                         let testDataInsertRequests: IDBRequest<IDBValidKey>[] = []
//
//                         testDataForDB.forEach(testDataToInsert => {
//                             testDataInsertRequests.push(store.add(testDataToInsert))
//                         })
//                         Promise.all(testDataInsertRequests).then(e => {
//                             resolve(evt.target.result)
//                         })
//                     }
//
//                 } else {
//                     resolve(openDBReq.result)
//                 }
//             }
//
//             openDBReq.onerror = function (evt) {
//                 console.error("openDb:", "layer0_db request fail");
//             };
//
//             openDBReq.onupgradeneeded = onUpgradeNeededHandler
//
//         })
//         let instance = new DBWithCacheWithReporting_StoreDummy(STORE_NAME, DB);
//         if(testDataForCache){
//             testDataForCache.forEach(testDataForCache => {
//                 instance.cache.set(
//                     testDataForCache.theKey, testDataForCache.id)
//             })
//         }
//
//         return instance
//     }
//
//     addObject = (newElementToStore: StoreObjectInterfaceExample): Promise<number> => {
//         return super.addObject(newElementToStore).then(result =>
//             result
//         )
//     }
//
//
//     getObjectByIndexColumn = (indexName: string, value: IDBValidKey): Promise<StoreObjectInterfaceExample> =>
//         super.getObjectByIndexColumn(indexName, value)
//
//     getAllObjects = (): Promise<Array<StoreObjectInterfaceExample>> =>
//         super.getAllObjects()
//
//     getObjectByKey = (key: string): Promise<StoreObjectInterfaceExample> =>
//         super.getObjectByKey(key)
//
//     updateObject = (storeObject: StoreObjectUpdateReportInterfaceExample): void =>
//         super.updateObject(storeObject)
//
//     deleteObjectById = (objectId: number): void =>
//         super.deleteObjectById(objectId)
// }