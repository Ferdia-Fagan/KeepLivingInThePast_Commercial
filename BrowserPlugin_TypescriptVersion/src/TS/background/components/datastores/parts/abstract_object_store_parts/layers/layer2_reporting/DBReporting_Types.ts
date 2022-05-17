import {PersistedStoreObject} from "../layer0_db/store_object/StoreObject_Types";
import {DBMutationOperations} from "./implementations/DBAllOperationsReporting";
import {DBInsertsReportingInterface} from "./implementations/DBInsertOperationsReporting";
import {DBOperationsReportGeneric} from "./reports/management/Types";
import {ReportName} from "./reports/ReportName";

export {
    // Interface
    // Types
    A_DBInsertsReportingController, A_DBAllOperationsReportingController
}

type ReportsData = {
    [reportName in ReportName]: DBOperationsReportGeneric;
}

type A_DBInsertsReportingController<P_STORE_REPORT_T extends PersistedStoreObject> =
    DBInsertsReportingInterface<P_STORE_REPORT_T>

type A_DBAllOperationsReportingController<
    R_STORE_REPORT_T extends PersistedStoreObject
> = DBMutationOperations<R_STORE_REPORT_T>

