import {StoreObjectInterface, UpdatedStoreObjectInterface} from "./store_object/StoreObject";

export interface DBInterface<STORE_T extends StoreObjectInterface,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface> {
    addObject(newElementToStore: STORE_T): Promise<number>

    getObjectByIndexColumn(indexName: string, value: IDBValidKey): Promise<STORE_T>

    getAllObjects(): Promise<Array<STORE_T>>

    updateObject(storeObject: STORE_T_UPDATE_INTERFACE): void

    deleteObjectById(elementId: number): void
}

export default abstract class DB<
    STORE_T extends StoreObjectInterface,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectInterface
> {

    private STORE_NAME: string; 

    private DB: IDBDatabase;

    constructor(storeName: string, db: IDBDatabase) {
        this.STORE_NAME = storeName;
        this.DB = db
    }

    /**
     * @description
     * Get the store within a database to then perform a request on
     * 
     * @param {string} store_name
     * @param {string} mode either "readonly" or "readwrite"
     */
    protected getStoreObject(mode: IDBTransactionMode): IDBObjectStore {
        var request: IDBTransaction = this.DB.transaction(this.STORE_NAME, mode);
        return request.objectStore(this.STORE_NAME);
    }

    protected getObjectStoreFromTransaction(mode: IDBTransactionMode): [IDBTransaction, IDBObjectStore]{
        var tx: IDBTransaction = this.DB.transaction([this.STORE_NAME], mode);
        var objectStore: IDBObjectStore = tx.objectStore(this.STORE_NAME);
        return [tx,objectStore]
    }

    protected onFailedRequest(evt: any): void{ // TODO: update evt interface
        console.error("error with database request", evt.target.errorCode);
    }

    // ---------------------------------------------------------

    /**
     *  TODO: unhandled error if add what does exist for indexes.
     * @param newObjectToStore
     * @param onSuccessfullReq
     * @return promise containing id of new oobject added.
     */
    protected addObject(newObjectToStore: STORE_T): Promise<number>{
        return new Promise<number>((resolve, reject) => {
            let store = this.getStoreObject('readwrite');
            var req = store.add(newObjectToStore);

            req.onsuccess = function(evt: any & Event) {
                resolve(evt.target.result)
            };

            req.onerror = this.onFailedRequest;
        })
    }

    /**
     * TODO: write test
     * @param newObjectsToAdd
     * @protected
     * @return promise containing new added objects ids.
     */
    protected addObjects(newObjectsToAdd: Array<STORE_T>): Promise<STORE_T[]> {
        return new Promise<STORE_T[]>((resolve, reject) => {
            const store = this.getStoreObject('readwrite');
            const NUMBER_OF_OBJECTS_TO_ADD = newObjectsToAdd.length
            let newObjectsAdded: STORE_T[] = []
            newObjectsToAdd.forEach(newObjectToAdd => {
                let addReq = store.add(newObjectToAdd);

                addReq.onsuccess = function (newTagId: any) {
                    newObjectToAdd.id = newTagId
                    newObjectsAdded.push(newObjectToAdd);
                    if(newObjectsAdded.length == NUMBER_OF_OBJECTS_TO_ADD){
                        resolve(newObjectsAdded)
                    }
                }

                addReq.onerror = this.onFailedRequest
            })
        })
    }

    protected getObjectByIndexColumn(indexName: string, value: IDBValidKey): Promise<STORE_T>{
        return new Promise<STORE_T>((resolve, reject) => {  // TODO: see if can just pass on the promise from one fun to another
            let store = this.getStoreObject('readonly');

            var req = store.index(indexName).get(value);

            req.onsuccess = function(evt: any & Event) {    // TODO: update type from any
                if (typeof evt.target.result == 'undefined') {
                    resolve(null);
                }else{

                    resolve(evt.target.result);
                }
            };
            req.onerror = this.onFailedRequest;
        });
    }

    protected getObjectById(id: number): Promise<STORE_T>{
        return new Promise((resolve, reject) => {
            let store = this.getStoreObject('readonly');

            let getById = store.get(id)
            getById.onsuccess = function(event: any & Event) {
                resolve(event.target.result)
            };
            getById.onerror = function (evt: any & Event) {
                console.error("geting similar results did not work")
                resolve(null);
            };
        })
    }

    protected getAllObjects(): Promise<Array<STORE_T>>{
        return new Promise((resolve, reject) => {
            const store = this.getStoreObject('readonly');

            let allTagsReq = store.getAll();

            allTagsReq.onsuccess = function(event: any) {
                resolve(event.target.result)
            };
    
            allTagsReq.onerror = function (evt: any) {
                console.error("geting similar results did not work")
                resolve(null);
            };
        });
    }

    /**
     * TODO: write test
     * @param objectIds
     * @protected
     */
    protected getObjectsWithIds(objectIds: number[]): Promise<STORE_T[]> {
        return new Promise<STORE_T[]>((resolve, reject) => {
            const store = this.getStoreObject('readonly');

            let getObjectsWithIdsReq = store.getAll(objectIds)

            getObjectsWithIdsReq.onsuccess = function (objectsFound: any){
                resolve(objectsFound.target.result)
            }

            getObjectsWithIdsReq.onerror = this.onFailedRequest
        })
    }

    protected updateObject(storeObject: STORE_T_UPDATE_INTERFACE): void{
        let store = this.getStoreObject('readwrite');
        store.put(storeObject);
    }

    protected deleteObjectById(elementId: number): void{
        let store = this.getStoreObject('readwrite');

        store.delete(elementId);
    }

}

// interface DBBuilderInterface {
//     new <STORE_T extends Interfaces, T extends layer0_db<STORE_T>> (storeName: string, layer0_db: IDBDatabase): T
// }
//
// export async function builder<STORE_T extends Interfaces, T extends layer0_db<STORE_T>>(
//     DATABASE: string, DB_VERSION: number,STORE_NAME: string,
//     createDBStore: CreateDBStoreHandler,
//     objectToBuild: DBBuilderInterface
// ): Promise<layer0_db<STORE_T>> {
//     var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)
//
//     // return new objectToBuild<STORE_T, T>(STORE_NAME, createDB);
//     return TagsCollection()
// }