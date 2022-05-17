"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDBAllOperationsReportingComponent = exports.createDBInsertOperationsReportingComponent = exports.DBAllOperationsReporting = exports.DBInsertOperationsReporting = exports.DBReportingControllerBase = void 0;
const DBOperationsReport_1 = require("./dtos/DBOperationsReport");
class DBReportingControllerBase {
    checkIfHaveAReport() {
        return (this.reportsToCheckWhenReporting.some(([_, report]) => report.size == 0));
    }
    getUpdateReport(willClear = false) {
        return Object.fromEntries(this.reportsToCheckWhenReporting.map(([reportName, report]) => {
            if (report.size == 0) {
                return [reportName, report.entries()];
            }
            else {
                return null;
            }
        }).filter(el => el != null));
    }
}
exports.DBReportingControllerBase = DBReportingControllerBase;
class DBInsertOperationsReporting extends DBReportingControllerBase {
    constructor() {
        super(...arguments);
        this.newObjectAddedReports = new Map();
        this.reportsToCheckWhenReporting = [
            [DBOperationsReport_1.ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports]
        ];
    }
    reportAddedObject(newSyncedObj) {
        this.newObjectAddedReports.set(newSyncedObj.id, newSyncedObj);
    }
}
exports.DBInsertOperationsReporting = DBInsertOperationsReporting;
const createDBInsertOperationsReportingComponent = () => new DBInsertOperationsReporting();
exports.createDBInsertOperationsReportingComponent = createDBInsertOperationsReportingComponent;
class DBAllOperationsReporting extends DBInsertOperationsReporting {
    constructor() {
        super(...arguments);
        this.reportsToCheckWhenReporting = [
            [DBOperationsReport_1.ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports],
            [DBOperationsReport_1.ReportName.UPDATED_OBJECTS_REPORT, this.updatedObjectReports],
            [DBOperationsReport_1.ReportName.DELETED_OBJECTS_REPORT, this.deletedObjectReports]
        ];
    }
    reportUpdateObject(updatedObject) {
        if (this.newObjectAddedReports.has(updatedObject.id)) {
            this.newObjectAddedReports.set(updatedObject.id, updatedObject);
        }
        else {
            this.updatedObjectReports.set(updatedObject.id, updatedObject);
        }
    }
    reportDeletedObject(objectId) {
        if (this.newObjectAddedReports.has(objectId)) {
            this.newObjectAddedReports.delete(objectId);
        }
        else {
            if (this.updatedObjectReports.has(objectId)) {
                this.updatedObjectReports.delete(objectId);
            }
            this.deletedObjectReports.add(objectId);
        }
    }
}
exports.DBAllOperationsReporting = DBAllOperationsReporting;
const createDBAllOperationsReportingComponent = () => new DBAllOperationsReporting();
exports.createDBAllOperationsReportingComponent = createDBAllOperationsReportingComponent;
//# sourceMappingURL=DBReporting.js.map