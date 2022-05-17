import {PersistedStoreObject} from "../layer0_db/store_object/StoreObject_Types";
import {DBAllOperationsReporting} from "./implementations/DBAllOperationsReporting";
import {DBInsertOperationsReporting} from "./implementations/DBInsertOperationsReporting";

export const createDBInsertOperationsReportingComponent = <P_STORE_REPORT_T extends PersistedStoreObject>() => new DBInsertOperationsReporting<P_STORE_REPORT_T>()
export const createDBAllOperationsReportingComponent = <R_STORE_REPORT_T extends PersistedStoreObject>() => new DBAllOperationsReporting<R_STORE_REPORT_T>()