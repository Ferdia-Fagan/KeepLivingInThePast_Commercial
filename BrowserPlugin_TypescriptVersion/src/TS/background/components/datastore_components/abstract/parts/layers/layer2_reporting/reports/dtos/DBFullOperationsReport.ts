import {UpdatedStoreObjectStub} from "../../../layer0_db/store_object/StoreObject_Dtos";
import {PersistedStoreObject} from "../../../layer0_db/store_object/StoreObject_Types";
import {DeleteReportSerialized, InsertReportSerialized, UpdatesReportSerialized} from "./IndividualReports";

export interface DBFullOperationsReport {
    newObjectAddedReports?: InsertReportSerialized<PersistedStoreObject>
    updatedObjectReports?: UpdatesReportSerialized<UpdatedStoreObjectStub>
    deletedObjectReports?: DeleteReportSerialized
}
