"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_DB_WithCache_WithReporting_Manager = void 0;
const DBAllOperationsReporting_1 = require("../layers/layer2_reporting/implementations/DBAllOperationsReporting");
const DB_WithCache_Manager_1 = require("./DB_WithCache_Manager");
class EditableDB_WithCache_WithReporting_Manager extends DB_WithCache_Manager_1.EditableDB_WithCache_Manager {
    constructor(db, cache, report) {
        super(db, new Set([
            "addObj",
            "addObjs",
            "getObjByKey",
            "getObjByIndexColumn",
            "getObjByKeys",
            "db",
            "cache",
            "deleteObjById"
        ]), cache);
        this.addObj = (newElementToStore) => super.addObj(newElementToStore).then((newObj) => {
            this.report.reportAddedObject(newObj);
            return newObj;
        });
        this.addObjs = (newObjectsToAdd) => super.addObjs(newObjectsToAdd).then(newObjectsAdded => {
            this.report.reportAddedObjects(newObjectsAdded);
            return newObjectsAdded;
        });
        this.updateObject = (storeObject) => {
            super.updateObject(storeObject);
            this.report.reportUpdateObject(storeObject);
        };
        this.report = report;
    }
    deleteObjById(objId) {
        return super.deleteObjById(objId).then(_ => {
            this.report.reportDeletedObject(objId);
        });
    }
}
function create_DB_WithCache_WithReporting_Manager({ db, methodsToNotStitch, cache, cachePrePopulateData = [], extractReportInformationFunc, reportPrePopulateData }) {
    const manager = new EditableDB_WithCache_WithReporting_Manager(db, cache, new DBAllOperationsReporting_1.DBAllOperationsReporting(reportPrePopulateData, extractReportInformationFunc));
    cachePrePopulateData.forEach(obj => {
        manager.cache.cacheObject(obj);
    });
    return manager;
}
exports.create_DB_WithCache_WithReporting_Manager = create_DB_WithCache_WithReporting_Manager;
//# sourceMappingURL=DB_WithCache_WithReporting_Manager.js.map