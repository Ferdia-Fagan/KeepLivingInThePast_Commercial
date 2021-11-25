import DB from "../../../../../src/background/datastores/abstract_object_store_parts/DB";
import {ID} from "../../../../../src/background/datastores/stores/Utils";
import IndexObject
    from "../../../../../src/background/datastores/DTOs/baseDTOs/IndexObject";
import IndexKeyObject
    from "../../../../../src/background/datastores/DTOs/baseDTOs/StoreKeyIndexInterface";

// export interface StoreObjectInterfaceExample extends StoreObjectInterface{
//     ID?: number,
//     KEY: IDBValidKey
// }

export class DB_StoreDummy extends DB<IndexKeyObject> {

    private constructor(STORE_NAME: string, DB: IDBDatabase){
        super(STORE_NAME, DB)
    }

    static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string,
                         testData?: IndexKeyObject[]){

        function onUpgradeNeededHandler(event: any){    // TODO: correct any
            var objectStore = event.currentTarget.result.createObjectStore(
                STORE_NAME, { keyPath: ID, autoIncrement: true });

            objectStore.createIndex(
                "KEY",
                "KEY",
                {unique: true}
            )

        }

        var DB: IDBDatabase = await new Promise<IDBDatabase>((resolve,reject) => {
            var openDBReq = indexedDB.open(DATABASE, DB_VERSION);

            openDBReq.onsuccess = function (evt: any & Event) {
                // DB = evt.result;
                if(testData){
                    let transaction = openDBReq.result.transaction("test",'readwrite')
                    let store: any & IDBObjectStore = transaction.objectStore("test")

                    let clearStore = store.clear()

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
                console.error("openDb:", "db request fail");
            };

            openDBReq.onupgradeneeded = onUpgradeNeededHandler

        })
        return new DB_StoreDummy(STORE_NAME, DB);
    }
}
