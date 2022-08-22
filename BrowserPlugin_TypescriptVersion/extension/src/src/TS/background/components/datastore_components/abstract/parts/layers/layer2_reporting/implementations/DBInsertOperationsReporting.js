"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBInsertOperationsReporting = void 0;
const DBReporting_Abstract_1 = require("../DBReporting_Abstract");
const ReportName_1 = require("../reports/ReportName");
class DBInsertOperationsReporting extends DBReporting_Abstract_1.DBReportingControllerBase {
    constructor(dbReports, extractReportInformationFunc) {
        super(extractReportInformationFunc);
        this.newObjectAddedReports = new Map();
        this.reportsToCheckWhenReporting = [
            [ReportName_1.ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports]
        ];
        this.newObjectAddedReports = dbReports.newObjectAddedReports;
    }
    reportAddedObject(newSyncedObj) {
        this.newObjectAddedReports.set(newSyncedObj.id, this.extractReportInformationFunc(newSyncedObj));
    }
    reportAddedObjects(newSyncedObjs) {
        newSyncedObjs.forEach(newObjectAdded => this.reportAddedObject(newObjectAdded));
    }
}
exports.DBInsertOperationsReporting = DBInsertOperationsReporting;
//# sourceMappingURL=DBInsertOperationsReporting.js.map