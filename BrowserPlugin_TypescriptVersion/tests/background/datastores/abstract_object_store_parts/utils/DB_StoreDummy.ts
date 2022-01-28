import DB, {
    DBInterface
} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/DB";
import {ID_NAME, KEY_NAME, StoreObjectInterface, UpdatedStoreObjectInterface}
    from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject";
import { KEY_TYPE} from "../../../../../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/store_object/DataTypes";

export interface StoreObjectInterfaceExample extends StoreObjectInterface{
    theKey: KEY_TYPE
}
type StoreObjectUpdateInterfaceExample = StoreObjectInterfaceExample & UpdatedStoreObjectInterface
const THE_KEY_NAME = "theKey"

export class DB_StoreDummy
    extends DB<StoreObjectInterfaceExample, StoreObjectUpdateInterfaceExample>
    implements DBInterface<StoreObjectInterfaceExample, StoreObjectUpdateInterfaceExample>{

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
                // layer0_db = evt.result;
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
                console.error("openDb:", "layer0_db request fail");
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

    updateObject = (storeObject: StoreObjectUpdateInterfaceExample): void =>
        super.updateObject(storeObject)

}

