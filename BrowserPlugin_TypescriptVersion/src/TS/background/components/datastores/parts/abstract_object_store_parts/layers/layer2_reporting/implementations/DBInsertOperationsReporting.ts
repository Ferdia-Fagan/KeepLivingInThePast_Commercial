import {ID_TYPE, PersistedStoreObject} from "../../layer0_db/store_object/StoreObject_Types";
import {DBReportingControllerBase} from "../DBReporting_Abstract";
import {DBOperationsReportGenericWithMappedType} from "../reports/management/Types";
import {ReportName} from "../reports/ReportName";
import {InsertReport} from "../reports/dtos/IndividualReports";

interface DBInsertsReportingInterface<P_STORE_REPORT_T extends PersistedStoreObject> {
    reportAddedObject(newSyncedObj: P_STORE_REPORT_T): void
}

class DBInsertOperationsReporting<R_STORE_REPORT_T extends PersistedStoreObject>
    extends DBReportingControllerBase
    implements DBInsertsReportingInterface<R_STORE_REPORT_T> {

    newObjectAddedReports: InsertReport<R_STORE_REPORT_T> = new Map<ID_TYPE, R_STORE_REPORT_T>()

    reportsToCheckWhenReporting: DBOperationsReportGenericWithMappedType[] = [
        [ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports]
    ]


    reportAddedObject(newSyncedObj: R_STORE_REPORT_T) {
        this.newObjectAddedReports.set(newSyncedObj.id, newSyncedObj)
    }

}

export {DBInsertOperationsReporting};
export {DBInsertsReportingInterface};