import {PersistedStoreObject} from "../layer0_db/store_object/StoreObject_Types";
import {DBAllOperationsReporting_I} from "./implementations/DBAllOperationsReporting";
import {DBInsertsReporting_I} from "./implementations/DBInsertOperationsReporting";
import {DBOperationsReportGeneric} from "./reports/management/Types";
import {ReportName} from "./reports/ReportName";

export type ReportsData = {
    [reportName in ReportName]: DBOperationsReportGeneric;
}

export type A_DBInsertsReportingController<P_STORE_REPORT_T extends PersistedStoreObject> =
    DBInsertsReporting_I<P_STORE_REPORT_T>

export type A_DBAllOperationsReportingController<
    R_STORE_REPORT_T extends PersistedStoreObject
> = DBAllOperationsReporting_I<R_STORE_REPORT_T>

