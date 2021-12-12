import DB from "../../../../../src/background/datastores/abstract_object_store_parts/layers/db/DB";
import {ID_NAME, KEY_NAME} from "../../../../../src/background/datastores/stores/utils/Utils";
import IndexObject
    from "../../../../../src/background/datastores/store_objects_interfaces/base_store_objects/IndexObject";
import {DBInterface} from "../../../../../src/background/datastores/abstract_object_store_parts/layers/db/DBInterface";
import { KEY_TYPE} from "../../../../../src/background/datastores/store_objects_interfaces/types/Types";

export interface StoreObjectInterfaceExample extends IndexObject{
    theKey: KEY_TYPE
}
const THE_KEY_NAME = "theKey"

export class DB_StoreDummy extends DB<StoreObjectInterfaceExample>
    implements DBInterface<StoreObjectInterfaceExample>{

    private constructor(STORE_NAME: string, DB: IDBDatabase){
        super(STORE_NAME, DB)
    }

    static async builder(DATABASE: string, DB_VERSION: number,STORE_NAME: string,
                         testData?: StoreObjectInterfaceExample[]){

        function onUpgradeNeededHandler(event: any){    // TODO: correct any
            var objectStore = event.currentTarget.result.createObjectStore(
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

    addObject = (newElementToStore: StoreObjectInterfaceExample): Promise<number> =>
        super.addObject(newElementToStore)

    getObjectByIndexColumn = (indexName: string, value: IDBValidKey): Promise<StoreObjectInterfaceExample> =>
        super.getObjectByIndexColumn(indexName, value)

    getAllObjects = (): Promise<Array<StoreObjectInterfaceExample>> =>
        super.getAllObjects()

    deleteObjectById = (objectId: number): void =>
        super.deleteObjectById(objectId)

    updateObject = (storeObject: StoreObjectInterfaceExample): void =>
        super.updateObject(storeObject)

}

