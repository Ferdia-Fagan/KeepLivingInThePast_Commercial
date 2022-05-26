import {
    EditableDB
} from "../../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer0_db/implementations/EditableDB";
import {
    ID_NAME,
    KEY_NAME
} from "../../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Constants";
import {
    NonPersistedStoreObjectStub,
    UpdatedStoreObjectStub
} from "../../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {
    KEY_TYPE, PersistedStoreObject
} from "../../../../../../src/TS/background/components/datastores/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Types";

export interface StoreObjectInterfaceExample
    extends NonPersistedStoreObjectStub {}

export interface PersistedStoreObjectInterfaceExample
    extends PersistedStoreObject {}

type StoreObjectUpdateInterfaceExample = StoreObjectInterfaceExample & UpdatedStoreObjectStub
export const THE_KEY_NAME = "key"

export class DB_StoreDummy<
    STORE_T extends NonPersistedStoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub
> extends EditableDB<STORE_T, STORE_T_UPDATE_INTERFACE> {

    // static async builder

    static async builder<
        STORE_T extends NonPersistedStoreObjectStub = StoreObjectInterfaceExample,
        STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub = PersistedStoreObjectInterfaceExample
    >(
        DATABASE: string, DB_VERSION: number,
        STORE_NAME: string,
        testData?: StoreObjectInterfaceExample[]
    ){

        function onUpgradeNeededHandler(event: any){    // TODO: correct any
            const objectStore = event.currentTarget.result.createObjectStore(
                STORE_NAME,
                {
                    keyPath: ID_NAME,
                    autoIncrement: true
                }
            );

            objectStore.createIndex(
                KEY_NAME,
                THE_KEY_NAME,
                {unique: true}
            )

        }

        const DB: IDBDatabase = await new Promise<IDBDatabase>((resolve,reject) => {
            const openDBReq = indexedDB.open(DATABASE, DB_VERSION);

            openDBReq.onsuccess = function (evt: any & Event) {
                // layer0_db = evt.result;
                if(testData){
                    const transaction = openDBReq.result.transaction("test",'readwrite')
                    const store: any & IDBObjectStore = transaction.objectStore("test")

                    const clearStore = store.clear()

                    store._rawObjectStore.keyGenerator.num = 0

                    clearStore.onsuccess = function(){
                        let testDataInsertRequests: IDBRequest<IDBValidKey>[] = []

                        testData.forEach(testDataToInsert => {
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
        return new DB_StoreDummy<STORE_T, STORE_T_UPDATE_INTERFACE>(STORE_NAME, DB);
    }

}

// export class DB_StoreDummy
//     extends DB<StoreObjectInterfaceExample, StoreObjectUpdateInterfaceExample>
//     implements NonEditableStoreDBInterface<StoreObjectInterfaceExample, StoreObjectUpdateInterfaceExample>{
//
//     private constructor(STORE_NAME: string, DB: IDBDatabase){
//         super(STORE_NAME, DB)
//     }
//
//     static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string,
//                          testData?: StoreObjectInterfaceExample[]){
//
//         function onUpgradeNeededHandler(event: any){    // TODO: correct any
//             var objectStore = event.currentTarget.result.createObjectStore(
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
//                 if(testData){
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
//                         testData.forEach(testDataToInsert => {
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
//         return new DB_StoreDummy(STORE_NAME, DB);
//     }
//
//     addObject = (newElementToStore: StoreObjectInterfaceExample): Promise<number> =>
//         super.addObject(newElementToStore)
//
//     getObjectByIndexColumn = (indexName: string, value: IDBValidKey): Promise<StoreObjectInterfaceExample> =>
//         super.getObjectByIndexColumn(indexName, value)
//
//     getAllObjects = (): Promise<Array<StoreObjectInterfaceExample>> =>
//         super.getAllObjects()
//
//     deleteObjectById = (objectId: number): void =>
//         super.deleteObjectById(objectId)
//
//     updateObject = (storeObject: StoreObjectUpdateInterfaceExample): void =>
//         super.updateObject(storeObject)
//
// }

