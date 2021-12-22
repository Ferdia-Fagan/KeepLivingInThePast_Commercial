import IndexObject from "../../../../store_objects_interfaces/base_store_objects/IndexObject";
import {
    ReportToCheckWhenReportDBInsertionsAndUpdatesInterface,
    ReportToCheckWhenReportingDBChangesInterface
} from "./ReportToCheckWhenReporting";
import ReportToCheckWhenReportingDBDeletions from "./ReportToCheckWhenReportingDBDeletions";
import ReportToCheckWhenReportingDBInsertionsOrUpdates from "./ReportToCheckWhenReportingDBInsertionsOrUpdates";
import {ReportName} from "./ReportName";
import {ID_TYPE} from "../../../../store_objects_interfaces/types/Types";

interface ReportFromDBReportingManager<STORE_T extends IndexObject> {
    newObjectAddedReports?: (STORE_T)[],
    updatedObjectReports?: (STORE_T)[],
    deletedObjectReports?: (number)[]
}

// export interface DBReportingManager_AddOperation<STORE_T extends IndexObject> {
//     reportAddObject(objectId: number, newObject: STORE_T): void
// }
//
// export interface DBReportingManager_UpdateOperation<STORE_T extends IndexObject> {
//     reportUpdateObject(objectId: number, newObject: STORE_T): void
// }
//
// export interface DBReportingManager_DeleteOperation<STORE_T extends IndexObject> {
//     reportDeleteObject(objectId: number): void
// }


/**
 * TODO: eventually it is planned to have this "reporting manager" handle the reporting of information to the native application.
 */
export class DBReportingManager<UPDATE_REPORT_INTERFACE extends IndexObject> {
    newObjectAddedReports: ReportToCheckWhenReportDBInsertionsAndUpdatesInterface<UPDATE_REPORT_INTERFACE> = null
    updatedObjectReports: ReportToCheckWhenReportDBInsertionsAndUpdatesInterface<UPDATE_REPORT_INTERFACE> = null
    deletedObjectReports: ReportToCheckWhenReportingDBDeletions = null

    readonly reportsToCheckWhenReporting: Array<ReportToCheckWhenReportingDBChangesInterface>

    constructor(canIndividualExistingObjectsInThisStoreBeUpdated: boolean) {
        let reportsToCheckWhenReporting = new Array<ReportToCheckWhenReportingDBChangesInterface>()
        // this.newObjectAddedReports
        this.newObjectAddedReports = new ReportToCheckWhenReportingDBInsertionsOrUpdates(new Map<ID_TYPE, UPDATE_REPORT_INTERFACE>(), ReportName.NEW_OBJECT_ADDED_REPORTS)
        reportsToCheckWhenReporting.push(this.newObjectAddedReports)
        if (canIndividualExistingObjectsInThisStoreBeUpdated) {
            this.updatedObjectReports = new ReportToCheckWhenReportingDBInsertionsOrUpdates(new Map<ID_TYPE, UPDATE_REPORT_INTERFACE>(), ReportName.UPDATED_OBJECT_REPORTS)
            this.deletedObjectReports = new ReportToCheckWhenReportingDBDeletions(new Set<ID_TYPE>(), ReportName.DELETED_OBJECT_REPORTS)
            reportsToCheckWhenReporting.push(this.updatedObjectReports)
            reportsToCheckWhenReporting.push(this.deletedObjectReports)
        }
        this.reportsToCheckWhenReporting = reportsToCheckWhenReporting
    }

    checkIfHaveAReport(): boolean {
        return (
            this.reportsToCheckWhenReporting.some(report => report.isReportEmpty())
        )
    }

    getUpdateReport(willClear: boolean = false): ReportFromDBReportingManager<UPDATE_REPORT_INTERFACE> {
        return {
            newObjectAddedReports: (this.newObjectAddedReports.containsReport()) ?
                this.newObjectAddedReports.getUpdateReport(willClear) as UPDATE_REPORT_INTERFACE[] : undefined,
            updatedObjectReports: (this.updatedObjectReports.containsReport()) ?
                this.updatedObjectReports.getUpdateReport(willClear) as UPDATE_REPORT_INTERFACE[] : undefined,
            deletedObjectReports: (this.deletedObjectReports.containsReport()) ?
                this.deletedObjectReports.getUpdateReport(willClear) as number[] : undefined
        }
    }

    reportAddObject(objectId: number, newObject: UPDATE_REPORT_INTERFACE) {
        this.newObjectAddedReports.addToReport(objectId, newObject)
    }

    reportUpdateObject(objectId: number, newObject: UPDATE_REPORT_INTERFACE) {
        this.updatedObjectReports.addToReport(objectId, newObject)
    }

    reportDeleteObject(objectId: number) {
        this.deletedObjectReports.addToReport(objectId)
    }
}