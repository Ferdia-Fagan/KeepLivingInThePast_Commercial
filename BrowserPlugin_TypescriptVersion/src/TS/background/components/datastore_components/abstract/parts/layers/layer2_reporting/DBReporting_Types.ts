import {NonPersistedStoreObjectStub} from "../layer0_db/store_object/StoreObject_Dtos";
import {PersistedStoreObject} from "../layer0_db/store_object/StoreObject_Types";
import {DBAllOperationsReporting_I} from "./implementations/DBAllOperationsReporting";
import {DBInsertsReporting_I} from "./implementations/DBInsertOperationsReporting";
import {DBOperationsReportGeneric} from "./reports/management/Types";
import {ReportName} from "./reports/ReportName";

export type ReportsData = {
    [reportName in ReportName]: DBOperationsReportGeneric;
}

export type A_DBInsertsReportingController<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
> =
    DBInsertsReporting_I<STORE_OBJECT_T, R_STORE_REPORT_T>

export type A_DBAllOperationsReportingController<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
> =
    DBAllOperationsReporting_I<STORE_OBJECT_T, R_STORE_REPORT_T>

