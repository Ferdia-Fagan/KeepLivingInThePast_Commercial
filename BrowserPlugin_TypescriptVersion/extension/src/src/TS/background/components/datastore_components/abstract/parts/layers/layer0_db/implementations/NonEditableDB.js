"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonEditableDB = void 0;
const DevelopmentUtils_1 = require("../../../../../../../utils/DevelopmentUtils");
const DB_Abstract_1 = require("../DB_Abstract");
const StoreObject_Constants_1 = require("../store_object/StoreObject_Constants");
class NonEditableDB extends DB_Abstract_1.DBConnection_A {
    // ------------ FUNCTIONALITY -------------------
    // Inserts:
    addObj(newElementToStore) {
        return new Promise((resolve, reject) => {
            let store = this.getObjectStore('readwrite');
            const req = store.add(newElementToStore);
            req.onsuccess = function (evt) {
                newElementToStore.id = evt.target.result;
                // @ts-ignore
                resolve(newElementToStore);
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
        return this.getObjByIndexColumn(StoreObject_Constants_1.KEY_NAME, key);
    }
    getObjsByKeys(keys) {
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
        return new Promise((resolve, reject) => {
            let store = this.getObjectStore('readwrite');
            const deleteOperation = store.delete(objId);
            deleteOperation.onsuccess = function () {
                resolve();
            };
            deleteOperation.onerror = function (evt) {
                console.error("geting similar results did not work");
                resolve(null);
            };
        });
    }
}
exports.NonEditableDB = NonEditableDB;
//# sourceMappingURL=NonEditableDB.js.map