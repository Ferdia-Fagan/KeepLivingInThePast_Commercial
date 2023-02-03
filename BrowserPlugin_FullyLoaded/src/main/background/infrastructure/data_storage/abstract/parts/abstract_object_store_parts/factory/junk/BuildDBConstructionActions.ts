import {ID_NAME} from "../../../layers/layer0_db/store_object/StoreObject_Constants";

interface IndexConstructorParams {
    indexName: string,
    indexKeyPath: string,
    options?: IDBIndexParameters
}

export type CreateDBStoreHandler = (event: any) => void

export function GetCreateDBStoreHandler(
    storeName: string,
    ...indexesToCreate: IndexConstructorParams[]
): CreateDBStoreHandler {
    return (event) => {
        let objectStore = event.currentTarget.result.createObjectStore(
            storeName, {keyPath: ID_NAME, autoIncrement: true}
        )
        indexesToCreate.forEach(indexToCreate => {
            objectStore.createIndex(
                indexToCreate.indexName, indexToCreate.indexKeyPath,
                indexToCreate.options
            )
        })
    }
}

export function CreateDBStore(DATABASE: string, DB_VERSION: number,
                  createDBStore: ((event: any) => void)
): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve,reject) => {
        var openDBReq = indexedDB.open(DATABASE, DB_VERSION);

        openDBReq.onsuccess = function (evt: any){
            resolve(evt.target.result)
        }
        openDBReq.onerror = function (evt) {
            console.error("openDb:", "layer0_db request fail");
        }
        openDBReq.onupgradeneeded = createDBStore
    });
}
