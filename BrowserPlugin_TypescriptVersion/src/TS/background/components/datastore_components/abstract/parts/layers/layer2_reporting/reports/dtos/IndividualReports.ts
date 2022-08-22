import {NonPersistedStoreObjectStub, UpdatedStoreObjectStub} from "../../../layer0_db/store_object/StoreObject_Dtos";
import {ID_TYPE} from "../../../layer0_db/store_object/StoreObject_Types";

export type ReportObjectBaseDataRequirements = UpdatedStoreObjectStub

export type InsertReport<STORE_T extends NonPersistedStoreObjectStub> = Map<ID_TYPE, STORE_T>
export type InsertReportSerialized<STORE_T extends NonPersistedStoreObjectStub> = [[ID_TYPE, STORE_T]]

export type UpdatesReport<UPDATE_REPORT_T extends UpdatedStoreObjectStub> = Map<ID_TYPE, UPDATE_REPORT_T>
export type UpdatesReportSerialized<UPDATE_REPORT_T extends UpdatedStoreObjectStub> = [[ID_TYPE, UPDATE_REPORT_T]]

export type DeleteReport = Set<ID_TYPE>
export type DeleteReportSerialized = ID_TYPE[]

