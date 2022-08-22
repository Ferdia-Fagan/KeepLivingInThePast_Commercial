"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBAllOperationsReporting = void 0;
const ReportName_1 = require("../reports/ReportName");
const DBInsertOperationsReporting_1 = require("./DBInsertOperationsReporting");
class DBAllOperationsReporting extends DBInsertOperationsReporting_1.DBInsertOperationsReporting {
    constructor(dbReports, extractReportInformationFunc) {
        super(dbReports, extractReportInformationFunc);
        this.updatedObjectReports = new Map();
        this.deletedObjectReports = new Set();
        this.reportsToCheckWhenReporting = [
            [ReportName_1.ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports],
            [ReportName_1.ReportName.UPDATED_OBJECTS_REPORT, this.updatedObjectReports],
            [ReportName_1.ReportName.DELETED_OBJECTS_REPORT, this.deletedObjectReports]
        ];
        this.updatedObjectReports = dbReports.updatedObjectReports;
        this.deletedObjectReports = dbReports.deletedObjectReports;
    }
    reportUpdateObject(updatedObject) {
        if (this.newObjectAddedReports.has(updatedObject.id)) {
            this.newObjectAddedReports.set(updatedObject.id, this.extractReportInformationFunc(updatedObject));
        }
        else {
            this.updatedObjectReports.set(updatedObject.id, this.extractReportInformationFunc(updatedObject));
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
//# sourceMappingURL=DBAllOperationsReporting.js.map