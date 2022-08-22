"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyIndexKeyAssignement = exports.buildDBLayer = void 0;
const DB_StoreDummy_1 = require("../../../../../../../../../../tests/background/datastores/abstract_object_store_parts/utils/DB/DB_StoreDummy");
const StoreObject_Constants_1 = require("../store_object/StoreObject_Constants");
function buildDBLayer(params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!params.keyIndexAssignement) {
            params.keyIndexAssignement = exports.KeyIndexKeyAssignement;
        }
        if (!params.otherKeysIndexAssignements) {
            params.otherKeysIndexAssignements = [];
        }
        const DB = yield new Promise((resolve, reject) => {
            const openDBReq = indexedDB.open(params.DATABASE, params.DB_VERSION);
            openDBReq.onsuccess = useThisSuccessHandler(resolve, openDBReq, params.STORE_NAME, params.startingData);
            openDBReq.onerror = useThisErrorHandler("error creating datastore");
            openDBReq.onupgradeneeded = useThisUpgradeNeededHandler(params.STORE_NAME, params.keyIndexAssignement, params.otherKeysIndexAssignements);
        });
        return new params.dbConstructor(params.STORE_NAME, DB); //<STORE_T, STORE_T_UPDATE_INTERFACE>
    });
}
exports.buildDBLayer = buildDBLayer;
exports.KeyIndexKeyAssignement = {
    keyPath: DB_StoreDummy_1.THE_KEY_NAME,
    options: {
        unique: true
    }
};
function useThisUpgradeNeededHandler(storeName, keyIndexAssignement = exports.KeyIndexKeyAssignement, otherKeysIndexAssignements = []) {
    return function onUpgradeNeededHandler(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            // create object store with index
            const objectStore = ev.currentTarget.result.createObjectStore(storeName, {
                keyPath: StoreObject_Constants_1.ID_NAME,
                autoIncrement: true
            });
            // add key
            objectStore.createIndex(StoreObject_Constants_1.KEY_NAME, keyIndexAssignement.keyPath, keyIndexAssignement.options);
            // add other keys
            otherKeysIndexAssignements.forEach(keyIndexAssignement => {
                objectStore.createIndex(keyIndexAssignement.name, keyIndexAssignement.keyPath, keyIndexAssignement.options);
            });
        });
    };
}
function useThisSuccessHandler(resolve, openDBReq, STORE_NAME, startingData) {
    return function onSuccessHandler(evt) {
        if (startingData) {
            const transaction = openDBReq.result.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const clearStore = store.clear();
            store._rawObjectStore.keyGenerator.num = 0;
            clearStore.onsuccess = function () {
                let testDataInsertRequests = [];
                startingData.forEach(testDataToInsert => {
                    testDataInsertRequests.push(store.add(testDataToInsert));
                });
                Promise.all(testDataInsertRequests).then(e => {
                    resolve(evt.target.result);
                });
            };
        }
        else {
            resolve(openDBReq.result);
        }
    };
}
function useThisErrorHandler(error) {
    return function onErrorHandler(event) {
        console.error(error);
    };
}
//# sourceMappingURL=Builder.js.map