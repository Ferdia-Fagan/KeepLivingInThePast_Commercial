"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableDB = exports.NonEditableDB = exports.DBConnectionBase = void 0;
const DevelopmentUtils_1 = require("../../../../../../../utils/DevelopmentUtils");
class DBConnectionBase {
    constructor(storeName, db) {
        this.STORE_NAME = storeName;
        this.DB_Connection = db;
    }
    /**
     * @description
     * Get the store within a database to then perform a request on
     *
     * @param {string} store_name
     * @param {string} mode either "readonly" or "readwrite"
     */
    getObjectStore(mode) {
        const request = this.DB_Connection.transaction(this.STORE_NAME, mode);
        return request.objectStore(this.STORE_NAME);
    }
    getObjectStoreFromTransaction(mode) {
        const tx = this.DB_Connection.transaction([this.STORE_NAME], mode);
        return [
            this.DB_Connection.transaction([this.STORE_NAME], mode),
            tx.objectStore(this.STORE_NAME) // objectStore
        ];
    }
    onFailedRequest(evt) {
        console.error("error with database request", evt.target.errorCode);
    }
}
exports.DBConnectionBase = DBConnectionBase;
class NonEditableDB extends DBConnectionBase {
    // ------------ FUNCTIONALITY -------------------
    // Inserts:
    addObj(newObjectToStore) {
        return new Promise((resolve, reject) => {
            this.addObjs;
            let store = this.getObjectStore('readwrite');
            const req = store.add(newObjectToStore);
            req.onsuccess = function (evt) {
                resolve(evt.target.result);
            };
            req.onerror = this.onFailedRequest;
        });
    }
    addObjs(newObjectsToAdd) {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore('readwrite');
            const NUMBER_OF_OBJECTS_TO_ADD = newObjectsToAdd.length;
            let newObjectsAdded = [];
            newObjectsToAdd.forEach(newObjectToAdd => {
                let addReq = store.add(newObjectToAdd);
                addReq.onsuccess = function (newTagId) {
                    newObjectToAdd.id = newTagId;
                    newObjectsAdded.push(newObjectToAdd);
                    if (newObjectsAdded.length == NUMBER_OF_OBJECTS_TO_ADD) {
                        resolve(newObjectsAdded);
                    }
                };
                addReq.onerror = this.onFailedRequest;
            });
        });
    }
    // retrievals
    getObjByIndexColumn(indexName, value) {
        return new Promise((resolve, reject) => {
            let store = this.getObjectStore('readonly');
            const req = store.index(indexName).get(value);
            req.onsuccess = function (evt) {
                if (typeof evt.target.result == 'undefined') {
                    resolve(null);
                }
                else {
                    resolve(evt.target.result);
                }
            };
            req.onerror = this.onFailedRequest;
        });
    }
    getObjById(id) {
        return new Promise((resolve, reject) => {
            let store = this.getObjectStore('readonly');
            let getById = store.get(id);
            getById.onsuccess = function (event) {
                resolve(event.target.result);
            };
            getById.onerror = function (evt) {
                console.error("geting similar results did not work");
                resolve(null);
            };
        });
    }
    /**
     * TODO: write test
     * @param objIds
     * @protected
     */
    getObjsByIds(objIds) {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore('readonly');
            let getObjectsWithIdsReq = store.getAll(objIds);
            getObjectsWithIdsReq.onsuccess = function (objectsFound) {
                resolve(objectsFound.target.result);
            };
            getObjectsWithIdsReq.onerror = this.onFailedRequest;
        });
    }
    getObjByKey(key) {
        // TODO: complete
        throw new DevelopmentUtils_1.MethodNotYetImplemented();
    }
    getObjByKeys(keys) {
        // TODO: complete
        throw new DevelopmentUtils_1.MethodNotYetImplemented();
    }
    getAllObjs() {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore('readonly');
            let allTagsReq = store.getAll();
            allTagsReq.onsuccess = function (event) {
                resolve(event.target.result);
            };
            allTagsReq.onerror = function (evt) {
                console.error("geting similar results did not work");
                resolve(null);
            };
        });
    }
    // deletions
    deleteObjById(objId) {
        let store = this.getObjectStore('readwrite');
        store.delete(objId);
    }
}
exports.NonEditableDB = NonEditableDB;
class EditableDB extends NonEditableDB {
    updateObject(storeObject) {
        let store = this.getObjectStore('readwrite');
        store.put(storeObject);
    }
}
exports.EditableDB = EditableDB;
function createEditableDbController(storeName, db) {
    return new EditableDB(storeName, db);
}
function createNonEditableDbController(storeName, db) {
    return new EditableDB(storeName, db);
}
//# sourceMappingURL=DB.js.map