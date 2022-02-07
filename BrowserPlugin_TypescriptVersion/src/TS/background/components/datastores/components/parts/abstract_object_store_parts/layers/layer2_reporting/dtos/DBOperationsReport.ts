import {PersistedStoreObject, UpdatedStoreObjectStub} from "../../layer0_db/store_object/Types";
import {
    DeleteReportSerialized,
    InsertReportSerialized,
    UpdatesReportSerialized
} from "../Types";

export enum ReportName {
    NEW_OBJECTS_ADDED_REPORT = "NEW_OBJECTS_ADDED_REPORT",
    // NEW_OBJECT_ADDED_REPORTS = "newObjectAddedReports",
    UPDATED_OBJECTS_REPORT = "UPDATED_OBJECTS_REPORT",
    // UPDATED_OBJECT_REPORTS = "updatedObjectReports",
    DELETED_OBJECTS_REPORT = "DELETED_OBJECTS_REPORT"
    // DELETED_OBJECT_REPORTS = "deletedObjectReports"
}

export interface DBOperationsReport {
    newObjectAddedReports?: InsertReportSerialized<PersistedStoreObject>
    updatedObjectReports?: UpdatesReportSerialized<UpdatedStoreObjectStub>
    deletedObjectReports?: DeleteReportSerialized
}
