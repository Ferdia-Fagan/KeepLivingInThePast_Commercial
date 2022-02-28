import {MethodNotYetImplemented} from "../../../../../../../utils/DevelopmentUtils";
import {
    ID_TYPE,
    KEY_TYPE,
    Persisted,
    PersistedStoreObject,
    PersistedStoreObjectStub,
    StoreObjectStub,
    UpdatedStoreObjectStub
} from "./store_object/Types";

export {
    // Interfaces
    NonEditableStoreDBInterface, EditableStoreDBInterface,
    // Generic type
    A_Generic_DBController,
    // Types
    A_NonEditableDBController, A_EditableDBController,
    // Abstract concrete
    DBConnectionBase, NonEditableDB, EditableDB
}

type A_Generic_DBController = A_NonEditableDBController<any> | A_EditableDBController<any, any>

// type addObjectFuncInter<STORE_OBJECT_T extends StoreObjectStub> = (newElementToStore: STORE_OBJECT_T) => Promise<number>

interface NonEditableStoreDBInterface<
    STORE_OBJECT_T extends StoreObjectStub
> {

    /**
     *  TODO: unhandled error if add what does exist for indexes.
     * @param newObjectToStore
     * @param onSuccessfullReq
     * @return promise containing id of new oobject added.
     */
    addObj?: (newElementToStore: STORE_OBJECT_T) => Promise<number>

    /**
     * TODO: write test
     * @param newObjectsToAdd
     * @protected
     * @return promise containing new added objects ids.
     */
    addObjs?: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]>

    getObjByIndexColumn?: (indexName: string, value: IDBValidKey) => Promise<Persisted<STORE_OBJECT_T>>
    getObjById?: (id: number) => Promise<Persisted<STORE_OBJECT_T>>
    getObjsByIds?: (objectIds: number[]) => Promise<Persisted<STORE_OBJECT_T>[]>
    getObjByKey?: (key: KEY_TYPE) => Promise<Persisted<STORE_OBJECT_T>>
    getObjByKeys?: (keys: KEY_TYPE[]) => Promise<Persisted<STORE_OBJECT_T>[]>

    getAllObjs?: () => Promise<Persisted<STORE_OBJECT_T>[]>

    deleteObjById?: (objId: number) => void
}

/**
 * This is a DB that does regular queries
 * but does only inserts and deletes (no updates).
 */
type A_NonEditableDBController<STORE_OBJECT_T extends StoreObjectStub> = (
    NonEditableStoreDBInterface<STORE_OBJECT_T>
)

interface EditableStoreDBInterface<
    STORE_OBJECT_T extends StoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> extends NonEditableStoreDBInterface<STORE_OBJECT_T>{
    updateObject: (storeObject: UPDATE_STORE_OBJECT_T) => void
}

/**
 * This is a DB that does regular queries, and does all aswell as updates.
 */
type A_EditableDBController<
    STORE_OBJECT_T extends StoreObjectStub,
    UPDATE_STORE_OBJECT_T extends UpdatedStoreObjectStub
> = (
    EditableStoreDBInterface<STORE_OBJECT_T, UPDATE_STORE_OBJECT_T>
)


type ObjectStoreAndTransaction = [IDBTransaction, IDBObjectStore]

abstract class DBConnectionBase {

    private readonly STORE_NAME: string;

    private DB_Connection: IDBDatabase;

    constructor(storeName: string, db: IDBDatabase) {
        this.STORE_NAME = storeName;
        this.DB_Connection = db
    }

    /**
     * @description
     * Get the store within a database to then perform a request on
     *
     * @param {string} store_name
     * @param {string} mode either "readonly" or "readwrite"
     */
    protected getObjectStore(mode: IDBTransactionMode): IDBObjectStore {
        const request: IDBTransaction = this.DB_Connection.transaction(this.STORE_NAME, mode);
        return request.objectStore(this.STORE_NAME);
    }

    protected getObjectStoreFromTransaction(mode: IDBTransactionMode): [IDBTransaction, IDBObjectStore]{
        const tx: IDBTransaction = this.DB_Connection.transaction([this.STORE_NAME], mode);
        return [
            this.DB_Connection.transaction([this.STORE_NAME], mode),    // tx
            tx.objectStore(this.STORE_NAME) // objectStore
        ]
    }

    protected onFailedRequest(evt: any): void{ // TODO: update evt interface
        console.error("error with database request", evt.target.errorCode);
    }
}

class NonEditableDB<
    STORE_OBJECT_T extends StoreObjectStub
> extends DBConnectionBase 
    implements A_NonEditableDBController<STORE_OBJECT_T> {



    // ------------ FUNCTIONALITY -------------------
    
    // Inserts:

    addObj(newObjectToStore: STORE_OBJECT_T): Promise<number>{
        return new Promise<number>((resolve, reject) => {
            this.addObjs
            let store = this.getObjectStore('readwrite');
            const req = store.add(newObjectToStore);

            req.onsuccess = function(evt: any & Event) {
                resolve(evt.target.result)
            };

            req.onerror = this.onFailedRequest;
        })
    }

    addObjs(newObjectsToAdd: Array<STORE_OBJECT_T>): Promise<Persisted<STORE_OBJECT_T>[]> {
        return new Promise<Persisted<STORE_OBJECT_T>[]>((resolve, reject) => {
            const store = this.getObjectStore('readwrite');
            const NUMBER_OF_OBJECTS_TO_ADD = newObjectsToAdd.length
            let newObjectsAdded: Persisted<STORE_OBJECT_T>[] = []
            newObjectsToAdd.forEach(newObjectToAdd => {
                let addReq = store.add(newObjectToAdd);

                addReq.onsuccess = function (newTagId: any) {
                    newObjectToAdd.id = newTagId
                    newObjectsAdded.push(newObjectToAdd as Persisted<STORE_OBJECT_T>);
                    if(newObjectsAdded.length == NUMBER_OF_OBJECTS_TO_ADD){
                        resolve(newObjectsAdded)
                    }
                }

                addReq.onerror = this.onFailedRequest
            })
        })
    }
    
    // retrievals

    getObjByIndexColumn(indexName: string, value: IDBValidKey): Promise<Persisted<STORE_OBJECT_T>>{
        return new Promise<Persisted<STORE_OBJECT_T>>((resolve, reject) => {  // TODO: see if can just pass on the promise from one fun to another
            let store = this.getObjectStore('readonly');

            const req = store.index(indexName).get(value);

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

    getObjById(id: number): Promise<Persisted<STORE_OBJECT_T>> {
        return new Promise<Persisted<STORE_OBJECT_T>>((resolve, reject) => {
            let store = this.getObjectStore('readonly');

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

    /**
     * TODO: write test
     * @param objIds
     * @protected
     */
    getObjsByIds(objIds: ID_TYPE[]): Promise<Persisted<STORE_OBJECT_T>[]> {
        return new Promise<Persisted<STORE_OBJECT_T>[]>((resolve, reject) => {
            const store = this.getObjectStore('readonly');

            let getObjectsWithIdsReq = store.getAll(objIds)

            getObjectsWithIdsReq.onsuccess = function (objectsFound: any){
                resolve(objectsFound.target.result)
            }

            getObjectsWithIdsReq.onerror = this.onFailedRequest
        })
    }

    getObjByKey(key: KEY_TYPE): Promise<Persisted<STORE_OBJECT_T>> {
        // TODO: complete
        throw new MethodNotYetImplemented()
    }

    getObjByKeys(keys: KEY_TYPE[]): Promise<Persisted<STORE_OBJECT_T>[]> {
        // TODO: complete
        throw new MethodNotYetImplemented()
    }

    getAllObjs(): Promise<Array<Persisted<STORE_OBJECT_T>>>{
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore('readonly');

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
    
    // deletions

    deleteObjById(objId: number): void{
        let store = this.getObjectStore('readwrite');

        store.delete(objId);
    }

}

class EditableDB<
    STORE_T extends StoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub
>
    extends NonEditableDB<STORE_T>
    implements EditableStoreDBInterface<STORE_T, STORE_T_UPDATE_INTERFACE> {

    updateObject(storeObject: STORE_T_UPDATE_INTERFACE): void{
        let store = this.getObjectStore('readwrite');
        store.put(storeObject);
    }
}

function createEditableDbController<STORE_OBJECT_T extends StoreObjectStub>(
    storeName: string, db: IDBDatabase
): A_NonEditableDBController<STORE_OBJECT_T> {
    return new EditableDB(storeName, db)
}

function createNonEditableDbController<
    STORE_T extends StoreObjectStub,
    STORE_T_UPDATE_INTERFACE extends UpdatedStoreObjectStub
>(
    storeName: string, db: IDBDatabase
): A_EditableDBController<STORE_T, STORE_T_UPDATE_INTERFACE> {
    return new EditableDB(storeName, db)
}





