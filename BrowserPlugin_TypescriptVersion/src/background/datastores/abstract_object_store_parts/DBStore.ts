
// export interface DBCollectionInterface {
//     getObjectStore(mode: IDBTransactionMode): IDBObjectStore,
//     onFailedRequest(evt: any): void
// }

import StoreObjectInterface  from "../abstract_store_object_parts/StoreObjectInterface";
import DBInterface from "./DBInterface";


export default abstract class DBStore<STORE_T extends StoreObjectInterface> 
                        implements DBInterface<STORE_T> {

    private STORE_NAME: string; 

    private DB: IDBDatabase;

    protected constructor(STORE_NAME: string, DB: IDBDatabase){
        this.STORE_NAME = STORE_NAME;
        this.DB = DB;
    }

    // constructor(DATABASE: string, DB_VERSION: number,STORE_NAME: string, 
    //     onUpgradeNeededHandler: (event: any) => void
    //     // onSuccessfulCreationOfStore: (evt: any) => any = null
    //     // letNoHaveCompletedBuild: Promise<null> = null
    //     ){
    //     var openDBReq = indexedDB.open(DATABASE, DB_VERSION);

    //     const self = this;

    //     // var dbStoreHasBeenCreatedPromise: Promise<null> = new Promise((resolve, reject) => {
    //     // if(onSuccessfulCreationOfStore === null) {
    //     if(letNoHaveCompletedBuild === null) {
    //         openDBReq.onsuccess = function (evt) {
    //             console.log("dsfakjfdskjlfdsalk");
    //             self.DB = openDBReq.result;
    //         }
    //     } else {
    //         console.log("arrived here")
    //         // openDBReq.onsuccess = onSuccessfulCreationOfStore(self);
    //         letNoHaveCompletedBuild.resolve()
    //     }

    //     openDBReq.onerror = function (evt) {
    //         console.error("openDb:", "db request fail");
    //     };

    //     openDBReq.onupgradeneeded = onUpgradeNeededHandler.bind(self);

    //     this.STORE_NAME = STORE_NAME;

    // }


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
     * @param newElementToStore 
     * @param onSuccessfullReq 
     */
    addElementAndThenDoSomething(newElementToStore: STORE_T,
        onSuccessfullReq: ((evt: any & Event) => void)): void{
        let store = this.getStoreObject('readwrite');

        var req;
        try {
            req = store.add(newElementToStore);
        } catch (e) {
            if (e.name == 'DataCloneError')
                console.log("This engine doesn't know how to clone a Blob, " +
                                    "use Firefox");
            throw e;
        }
        req.onsuccess = onSuccessfullReq;
    
        req.onerror = this.onFailedRequest;
    }

    // async getStoreObjectByKeyColumn( indexName: string, value: IDBValidKey,
    getStoreObjectByColumn( indexName: string, value: IDBValidKey): Promise<IDBValidKey>{        
        return new Promise<IDBValidKey>((resolve, reject) => {  // TODO: see if can just pass on the promise from one fun to another
            let store = this.getStoreObject('readonly');

            var req = store.index(indexName).get(value);

            req.onsuccess = function(evt: any & Event) {    // TODO: update type from any
                if (typeof evt.target.result == 'undefined') {
                    resolve(null);
                }else{

                    resolve(evt.target.result.id);
                }
            };
            req.onerror = this.onFailedRequest;
        });
    }

    getAllStoreObject(): Promise<Array<STORE_T>>{
        let store = this.getStoreObject('readonly');
    
        let allTagsReq = store.getAll();

        return new Promise((resolve, reject) => {
            allTagsReq.onsuccess = function(event: any & Event) {

                // var cursor = event.target.result;
                resolve(event.target.result)
                
            };
    
            allTagsReq.onerror = function (evt: any & Event) {
                console.error("geting similar results did not work")
                resolve(null);
            };
        });
    }

    deleteStoreObjectById(elementId: number){
        let store = this.getStoreObject('readwrite');
        
        store.delete(elementId);
    }

    updateStoreObject(storeObject: STORE_T){
        let store = this.getStoreObject('readwrite');

        store.put(storeObject);
    }

}

