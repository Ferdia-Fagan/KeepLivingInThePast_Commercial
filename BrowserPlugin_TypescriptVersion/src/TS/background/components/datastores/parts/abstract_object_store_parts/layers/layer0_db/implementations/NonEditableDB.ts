import {MethodNotYetImplemented} from "../../../../../../../utils/DevelopmentUtils";
import {DBConnection_A} from "../DB_Abstract";
import {KEY_NAME} from "../store_object/StoreObject_Constants";
import {NonPersistedStoreObjectStub} from "../store_object/StoreObject_Dtos";
import {A_NonEditableDBController} from "../types/DB_Types";
import {ID_TYPE, KEY_TYPE, Persisted} from "../store_object/StoreObject_Types";

export interface NonEditableStoreDB_I<STORE_OBJECT_T extends NonPersistedStoreObjectStub> {

    /**
     *  TODO: unhandled error if add what does exist for indexes.
     * @param newObjectToStore
     * @param onSuccessfullReq
     * @return promise containing id of new oobject added.
     */
    addObj?: (newElementToStore: STORE_OBJECT_T) => Promise<Persisted<STORE_OBJECT_T>>
    /**
     * TODO: write test
     * @param newObjectsToAdd
     * @protected
     * @return promise containing new added objects ids.
     */
    addObjs?: (newObjectsToAdd: Array<STORE_OBJECT_T>) => Promise<Persisted<STORE_OBJECT_T>[]> // TODO: test

    getObjByIndexColumn?: (indexName: string, value: IDBValidKey) => Promise<Persisted<STORE_OBJECT_T>>
    getObjById?: (id: number) => Promise<Persisted<STORE_OBJECT_T>>
    getObjsByIds?: (objectIds: number[]) => Promise<Persisted<STORE_OBJECT_T>[]> // TODO: test
    getObjByKey?: (key: KEY_TYPE) => Promise<Persisted<STORE_OBJECT_T>>
    getObjsByKeys?: (keys: KEY_TYPE[]) => Promise<Persisted<STORE_OBJECT_T>[]> // TODO: test

    getAllObjs?: () => Promise<Persisted<STORE_OBJECT_T>[]>

    deleteObjById?: (objId: number) => Promise<void>
}

export class NonEditableDB<STORE_OBJECT_T extends NonPersistedStoreObjectStub>
    extends DBConnection_A
    implements A_NonEditableDBController<STORE_OBJECT_T> {
    // ------------ FUNCTIONALITY -------------------

    // Inserts:

    addObj(newElementToStore: STORE_OBJECT_T): Promise<Persisted<STORE_OBJECT_T>> {
        return new Promise<Persisted<STORE_OBJECT_T>>((resolve, reject) => {
            let store = this.getObjectStore('readwrite');
            const req = store.add(newElementToStore);

            req.onsuccess = function (evt: any & Event) {
                newElementToStore.id = evt.target.result
                // @ts-ignore
                resolve(newElementToStore)
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
                    if (newObjectsAdded.length == NUMBER_OF_OBJECTS_TO_ADD) {
                        resolve(newObjectsAdded)
                    }
                }

                addReq.onerror = this.onFailedRequest
            })
        })
    }

    // retrievals

    getObjByIndexColumn(indexName: string, value: IDBValidKey): Promise<Persisted<STORE_OBJECT_T>> {
        return new Promise<Persisted<STORE_OBJECT_T>>((resolve, reject) => {  // TODO: see if can just pass on the promise from one fun to another
            let store = this.getObjectStore('readonly');

            const req = store.index(indexName).get(value);

            req.onsuccess = function (evt: any & Event) {    // TODO: update type from any
                if (typeof evt.target.result == 'undefined') {
                    resolve(null);
                } else {

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
            getById.onsuccess = function (event: any & Event) {
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

            getObjectsWithIdsReq.onsuccess = function (objectsFound: any) {
                resolve(objectsFound.target.result)
            }

            getObjectsWithIdsReq.onerror = this.onFailedRequest
        })
    }

    getObjByKey(key: KEY_TYPE): Promise<Persisted<STORE_OBJECT_T>> {

        return this.getObjByIndexColumn(KEY_NAME, key)
    }

    getObjsByKeys(keys: KEY_TYPE[]): Promise<Persisted<STORE_OBJECT_T>[]> {
        // TODO: complete
        throw new MethodNotYetImplemented()
    }

    getAllObjs(): Promise<Array<Persisted<STORE_OBJECT_T>>> {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore('readonly');

            let allTagsReq = store.getAll();

            allTagsReq.onsuccess = function (event: any) {
                resolve(event.target.result)
            };

            allTagsReq.onerror = function (evt: any) {
                console.error("geting similar results did not work")
                resolve(null);
            };
        });
    }

    // deletions
    deleteObjById(objId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let store = this.getObjectStore('readwrite');
            const deleteOperation = store.delete(objId);
            deleteOperation.onsuccess = function () {
                resolve()
            };

            deleteOperation.onerror = function (evt: any) {
                console.error("geting similar results did not work")
                resolve(null);
            };
        })
    }

}
