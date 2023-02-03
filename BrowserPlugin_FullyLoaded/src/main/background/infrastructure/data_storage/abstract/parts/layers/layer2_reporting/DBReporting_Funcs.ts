import {NonPersistedStoreObjectStub} from "../layer0_db/store_object/StoreObject_Dtos";
import {PersistedStoreObject} from "../layer0_db/store_object/StoreObject_Types";
import {DBAllOperationsReporting, DBReportInterface} from "./implementations/DBAllOperationsReporting";
import {DBInsertOperationsReporting, ExtractReportInformationFunc} from "./implementations/DBInsertOperationsReporting";

export const createDBInsertOperationsReportingComponent =
    <
        STORE_OBJECT_T extends NonPersistedStoreObjectStub,
        R_STORE_REPORT_T extends PersistedStoreObject
    > (
        dbReports: DBReportInterface<R_STORE_REPORT_T>,
        extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>
    ) =>
        new DBInsertOperationsReporting<STORE_OBJECT_T,R_STORE_REPORT_T>(dbReports, extractReportInformationFunc)

export const createDBAllOperationsReportingComponent =
    <
        STORE_OBJECT_T extends NonPersistedStoreObjectStub,
        R_STORE_REPORT_T extends PersistedStoreObject
    > (
        dbReports: DBReportInterface<R_STORE_REPORT_T>,
        extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>
    ) =>
        new DBAllOperationsReporting<STORE_OBJECT_T, R_STORE_REPORT_T>(dbReports, extractReportInformationFunc)