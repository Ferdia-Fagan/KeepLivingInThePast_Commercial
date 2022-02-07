"use strict";
// TODO: abstract layer2_reporting behavior to modular dtos.tabs.
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
exports.builder = exports.DBWithCacheWithReportingOfAllOperationsOnData = exports.DBWithCacheWithReportingOfInsertedObjects = exports.DBWithCacheWithReporting = void 0;
const DBWithCache_1 = require("../cache/DBWithCache");
const DBReporting_1 = require("./utils/DBReporting");
const BuildDB_1 = require("../../factory/BuildDB");
class DBWithCacheWithReporting extends DBWithCache_1.DBWithCache {
    constructor(storeName, db, areReportingAllChanges) {
        super(storeName, db);
        this.reportingManager = new DBReporting_1.DBReportingManager(areReportingAllChanges);
    }
}
exports.DBWithCacheWithReporting = DBWithCacheWithReporting;
class DBWithCacheWithReportingOfInsertedObjects extends DBWithCacheWithReporting {
    constructor(storeName, db, areReportingAllChanges = false) {
        super(storeName, db, areReportingAllChanges);
    }
    addObject(object) {
        const _super = Object.create(null, {
            addObject: { get: () => super.addObject }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.addObject.call(this, object).then(objectId => {
                object.id = objectId;
                let newObjectReport = object;
                this.reportingManager.reportAddedObject(objectId, newObjectReport);
                return objectId;
            });
        });
    }
}
exports.DBWithCacheWithReportingOfInsertedObjects = DBWithCacheWithReportingOfInsertedObjects;
class DBWithCacheWithReportingOfAllOperationsOnData extends DBWithCacheWithReportingOfInsertedObjects {
    constructor(storeName, db) {
        super(storeName, db, true);
    }
    updateObject(object) {
        let updateReport = object;
        this.reportingManager.updateObject(object.id, updateReport);
        super.updateObject(object);
    }
    deleteObjectById(objectId) {
        this.reportingManager.deleteObject(objectId);
        super.deleteObjectById(objectId);
    }
}
exports.DBWithCacheWithReportingOfAllOperationsOnData = DBWithCacheWithReportingOfAllOperationsOnData;
function builder(DATABASE, DB_VERSION, STORE_NAME, createDBStore, objectToBuild) {
    return __awaiter(this, void 0, void 0, function* () {
        let createDB = yield BuildDB_1.CreateDBStore(DATABASE, DB_VERSION, createDBStore);
        return new objectToBuild(STORE_NAME, createDB);
    });
}
exports.builder = builder;
// export interface DBBuilderInterface {
//     // new <
//     //     STORE_T extends Interfaces, KEY_T extends IDBValidKey,
//     //     T extends DBWithCacheWithReporting<STORE_T, KEY_T>,
//     // > (storeName: string, layer0_db: IDBDatabase): T
//     new<STORE_T extends Interfaces, KEY_T extends IDBValidKey>
//         (storeName: string, layer0_db: IDBDatabase): DBWithCacheWithReporting<STORE_T, KEY_T>
// }
//
// export async function builder<
//     STORE_T extends Interfaces, KEY_T extends IDBValidKey,
//     T extends DBWithCacheWithReporting<STORE_T, KEY_T>
// >(
//     DATABASE: string, DB_VERSION: number,STORE_NAME: string,
//     createDBStore: CreateDBStoreHandler,
//     objectToBuild: DBBuilderInterface
// ): Promise<T> {
//     var createDB: IDBDatabase = await CreateDBStore(DATABASE, DB_VERSION, createDBStore)
//
//     // return new objectToBuild<STORE_T, KEY_T, T>(STORE_NAME, createDB);
//     return new objectToBuild<STORE_T, KEY_T>(STORE_NAME, createDB) as T;
// }
//# sourceMappingURL=DBWithCacheWithReporting.js.map