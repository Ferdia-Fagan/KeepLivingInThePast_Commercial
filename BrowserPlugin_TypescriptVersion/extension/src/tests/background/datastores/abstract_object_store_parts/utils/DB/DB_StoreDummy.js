"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_StoreDummy = exports.THE_KEY_NAME = void 0;
const EditableDB_1 = require("../../../../../../src/TS/background/components/datastore_components/abstract/parts/layers/layer0_db/implementations/EditableDB");
const StoreObject_Constants_1 = require("../../../../../../src/TS/background/components/datastore_components/abstract/parts/layers/layer0_db/store_object/StoreObject_Constants");
exports.THE_KEY_NAME = "key";
class DB_StoreDummy extends EditableDB_1.EditableDB {
    // static async builder
    static builder(DATABASE, DB_VERSION, STORE_NAME, testData) {
        return __awaiter(this, void 0, void 0, function* () {
            function onUpgradeNeededHandler(event) {
                const objectStore = event.currentTarget.result.createObjectStore(STORE_NAME, {
                    keyPath: StoreObject_Constants_1.ID_NAME,
                    autoIncrement: true
                });
                objectStore.createIndex(StoreObject_Constants_1.KEY_NAME, exports.THE_KEY_NAME, { unique: true });
            }
            const DB = yield new Promise((resolve, reject) => {
                const openDBReq = indexedDB.open(DATABASE, DB_VERSION);
                openDBReq.onsuccess = function (evt) {
                    // layer0_db = evt.result;
                    if (testData) {
                        const transaction = openDBReq.result.transaction("test", 'readwrite');
                        const store = transaction.objectStore("test");
                        const clearStore = store.clear();
                        store._rawObjectStore.keyGenerator.num = 0;
                        clearStore.onsuccess = function () {
                            let testDataInsertRequests = [];
                            testData.forEach(testDataToInsert => {
                                testDataInsertRequests.push(store.add(testDataToInsert));
                            });
                            Promise.all(testDataInsertRequests).then(e => {
                                resolve(evt.target.result);
                            });
                        };
                    }
                    else {
                        resolve(openDBReq.result);
                    }
                };
                openDBReq.onerror = function (evt) {
                    console.error("openDb:", "layer0_db request fail");
                };
                openDBReq.onupgradeneeded = onUpgradeNeededHandler;
            });
            return new DB_StoreDummy(STORE_NAME, DB);
        });
    }
}
exports.DB_StoreDummy = DB_StoreDummy;
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
//# sourceMappingURL=DB_StoreDummy.js.map