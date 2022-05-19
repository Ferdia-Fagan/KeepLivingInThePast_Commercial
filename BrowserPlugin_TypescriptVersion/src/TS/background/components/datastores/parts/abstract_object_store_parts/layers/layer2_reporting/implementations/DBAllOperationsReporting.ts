import {ID_TYPE, PersistedStoreObject} from "../../layer0_db/store_object/StoreObject_Types";
import {DBOperationsReportGenericWithMappedType} from "../reports/management/Types";
import {ReportName} from "../reports/ReportName";
import {DeleteReport, UpdatesReport} from "../reports/dtos/IndividualReports";
import {DBInsertOperationsReporting, DBInsertsReporting_I} from "./DBInsertOperationsReporting";

export interface DBAllOperationsReporting_I<
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends DBInsertsReporting_I<R_STORE_REPORT_T> {

    reportUpdateObject(updatedObject: R_STORE_REPORT_T): void

    reportDeletedObject(id: number): void
}

export class DBAllOperationsReporting<
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends DBInsertOperationsReporting<R_STORE_REPORT_T>
    implements DBAllOperationsReporting_I<R_STORE_REPORT_T> {

    updatedObjectReports: UpdatesReport<R_STORE_REPORT_T> = new Map<ID_TYPE, R_STORE_REPORT_T>()
    deletedObjectReports: DeleteReport = new Set<ID_TYPE>()

    reportsToCheckWhenReporting: DBOperationsReportGenericWithMappedType[] = [
        [ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports],
        [ReportName.UPDATED_OBJECTS_REPORT, this.updatedObjectReports],
        [ReportName.DELETED_OBJECTS_REPORT, this.deletedObjectReports]
    ]

    reportUpdateObject(updatedObject: R_STORE_REPORT_T) {
        if (this.newObjectAddedReports.has(updatedObject.id)) {
            this.newObjectAddedReports.set(updatedObject.id, updatedObject)
        } else {
            this.updatedObjectReports.set(updatedObject.id, updatedObject)
        }
    }

    reportDeletedObject(objectId: ID_TYPE) {
        if (this.newObjectAddedReports.has(objectId)) {
            this.newObjectAddedReports.delete(objectId)
        } else {
            if (this.updatedObjectReports.has(objectId)) {
                this.updatedObjectReports.delete(objectId)
            }
            this.deletedObjectReports.add(objectId)
        }
    }

}
