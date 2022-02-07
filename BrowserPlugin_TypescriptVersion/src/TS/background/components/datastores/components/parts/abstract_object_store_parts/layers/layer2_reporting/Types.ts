import {ID_TYPE, StoreObjectStub, UpdatedStoreObject, UpdatedStoreObjectStub} from "../layer0_db/store_object/Types";
import {ReportName} from "./dtos/DBOperationsReport";

export type ReportObjectBaseDataRequirements = UpdatedStoreObject

export type InsertReport<STORE_T extends StoreObjectStub> = Map<ID_TYPE, STORE_T>
export type InsertReportSerialized<STORE_T extends StoreObjectStub> = [[ID_TYPE, STORE_T]]
export type UpdatesReport<UPDATE_REPORT_T extends UpdatedStoreObjectStub> = Map<ID_TYPE, UPDATE_REPORT_T>
export type UpdatesReportSerialized<UPDATE_REPORT_T extends UpdatedStoreObjectStub> = [[ID_TYPE, UPDATE_REPORT_T]]
export type DeleteReport = Set<ID_TYPE>
export type DeleteReportSerialized = ID_TYPE[]

export type InsertOrUpdatesReport = InsertReport<any> | UpdatesReport<any>
export type DBOperationsReportGeneric = InsertOrUpdatesReport | DeleteReport
export type DBOperationsReportGenericWithMappedType = [ReportName, DBOperationsReportGeneric]