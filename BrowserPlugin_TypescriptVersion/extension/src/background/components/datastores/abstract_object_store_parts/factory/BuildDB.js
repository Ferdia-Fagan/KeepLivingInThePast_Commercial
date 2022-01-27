"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDBStore = exports.GetCreateDBStoreHandler = void 0;
const Utils_1 = require("../../stores/utils/Utils");
function GetCreateDBStoreHandler(storeName, ...indexesToCreate) {
    return (event) => {
        let objectStore = event.currentTarget.result.createObjectStore(storeName, { keyPath: Utils_1.ID_NAME, autoIncrement: true });
        indexesToCreate.forEach(indexToCreate => {
            objectStore.createIndex(indexToCreate.indexName, indexToCreate.indexKeyPath, indexToCreate.options);
        });
    };
}
exports.GetCreateDBStoreHandler = GetCreateDBStoreHandler;
function CreateDBStore(DATABASE, DB_VERSION, createDBStore) {
    return new Promise((resolve, reject) => {
        var openDBReq = indexedDB.open(DATABASE, DB_VERSION);
        openDBReq.onsuccess = function (evt) {
            resolve(evt.target.result);
        };
        openDBReq.onerror = function (evt) {
            console.error("openDb:", "layer0_db request fail");
        };
        openDBReq.onupgradeneeded = createDBStore;
    });
}
exports.CreateDBStore = CreateDBStore;
//# sourceMappingURL=BuildDB.js.map