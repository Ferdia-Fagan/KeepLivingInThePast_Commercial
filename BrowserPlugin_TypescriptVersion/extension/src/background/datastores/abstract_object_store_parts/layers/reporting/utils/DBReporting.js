"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBReportingManager = void 0;
const ReportToCheckWhenReportingDBDeletions_1 = __importDefault(require("./ReportToCheckWhenReportingDBDeletions"));
const ReportToCheckWhenReportingDBInsertionsOrUpdates_1 = __importDefault(require("./ReportToCheckWhenReportingDBInsertionsOrUpdates"));
const ReportName_1 = require("./ReportName");
// export interface DBReportingManager_AddOperation<STORE_T extends Interfaces> {
//     reportAddObject(objectId: number, newObject: STORE_T): void
// }
//
// export interface DBReportingManager_UpdateOperation<STORE_T extends Interfaces> {
//     reportUpdateObject(objectId: number, newObject: STORE_T): void
// }
//
// export interface DBReportingManager_DeleteOperation<STORE_T extends Interfaces> {
//     reportDeleteObject(objectId: number): void
// }
/**
 * TODO: eventually it is planned to have this "layer2_reporting manager" handle the layer2_reporting of information to the message application.
 */
class DBReportingManager {
    constructor(canIndividualExistingObjectsInThisStoreBeUpdated) {
        this.newObjectAddedReports = null;
        this.updatedObjectReports = null;
        this.deletedObjectReports = null;
        let reportsToCheckWhenReporting = new Array();
        // this.newObjectAddedReports
        this.newObjectAddedReports = new ReportToCheckWhenReportingDBInsertionsOrUpdates_1.default(new Map(), ReportName_1.ReportName.NEW_OBJECT_ADDED_REPORTS);
        reportsToCheckWhenReporting.push(this.newObjectAddedReports);
        if (canIndividualExistingObjectsInThisStoreBeUpdated) {
            this.updatedObjectReports = new ReportToCheckWhenReportingDBInsertionsOrUpdates_1.default(new Map(), ReportName_1.ReportName.UPDATED_OBJECT_REPORTS);
            this.deletedObjectReports = new ReportToCheckWhenReportingDBDeletions_1.default(new Set(), ReportName_1.ReportName.DELETED_OBJECT_REPORTS);
            reportsToCheckWhenReporting.push(this.updatedObjectReports);
            reportsToCheckWhenReporting.push(this.deletedObjectReports);
        }
        this.reportsToCheckWhenReporting = reportsToCheckWhenReporting;
    }
    checkIfHaveAReport() {
        return (this.reportsToCheckWhenReporting.some(report => report.isReportEmpty()));
    }
    getUpdateReport(willClear = false) {
        return {
            newObjectAddedReports: (this.newObjectAddedReports.containsReport()) ?
                this.newObjectAddedReports.getUpdateReport(willClear) : undefined,
            updatedObjectReports: (this.updatedObjectReports.containsReport()) ?
                this.updatedObjectReports.getUpdateReport(willClear) : undefined,
            deletedObjectReports: (this.deletedObjectReports.containsReport()) ?
                this.deletedObjectReports.getUpdateReport(willClear) : undefined
        };
    }
    reportAddObject(objectId, newObject) {
        this.newObjectAddedReports.addToReport(objectId, newObject);
    }
    reportUpdateObject(objectId, newObject) {
        this.updatedObjectReports.addToReport(objectId, newObject);
    }
    reportDeleteObject(objectId) {
        this.deletedObjectReports.addToReport(objectId);
    }
}
exports.DBReportingManager = DBReportingManager;
//# sourceMappingURL=DBReporting.js.map