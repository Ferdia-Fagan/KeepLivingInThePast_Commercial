import {NonPersistedStoreObjectStub} from "../../layer0_db/store_object/StoreObject_Dtos";
import {ID_TYPE, PersistedStoreObject} from "../../layer0_db/store_object/StoreObject_Types";
import {DBOperationsReportGenericWithMappedType} from "../reports/management/Types";
import {ReportName} from "../reports/ReportName";
import {DeleteReport, UpdatesReport} from "../reports/dtos/IndividualReports";
import {
    DBInsertOperationsReporting,
    DBInsertOperationsReporting_I,
    DBInsertsReporting_I, ExtractReportInformationFunc
} from "./DBInsertOperationsReporting";

export interface DBAllOperationsReporting_I<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends DBInsertsReporting_I<STORE_OBJECT_T, R_STORE_REPORT_T> {

    reportUpdateObject(updatedObject: STORE_OBJECT_T): void

    reportDeletedObject(id: number): void
}

export interface DBReportInterface<
    R_STORE_REPORT_T extends PersistedStoreObject
> extends DBInsertOperationsReporting_I<R_STORE_REPORT_T> {
    updatedObjectReports: UpdatesReport<R_STORE_REPORT_T>
    deletedObjectReports: DeleteReport
}

export class DBAllOperationsReporting<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends DBInsertOperationsReporting<STORE_OBJECT_T,R_STORE_REPORT_T>
    implements
        DBAllOperationsReporting_I<STORE_OBJECT_T,R_STORE_REPORT_T>,
        DBReportInterface<R_STORE_REPORT_T>
{

    updatedObjectReports: UpdatesReport<R_STORE_REPORT_T> = new Map<ID_TYPE, R_STORE_REPORT_T>()
    deletedObjectReports: DeleteReport = new Set<ID_TYPE>()

    constructor(
        dbReports: DBReportInterface<R_STORE_REPORT_T>,
        extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>
    ) {
        super(dbReports, extractReportInformationFunc);
        this.updatedObjectReports = dbReports.updatedObjectReports
        this.deletedObjectReports = dbReports.deletedObjectReports
    }

    reportsToCheckWhenReporting: DBOperationsReportGenericWithMappedType[] = [
        [ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports],
        [ReportName.UPDATED_OBJECTS_REPORT, this.updatedObjectReports],
        [ReportName.DELETED_OBJECTS_REPORT, this.deletedObjectReports]
    ]

    reportUpdateObject(updatedObject: STORE_OBJECT_T): void {
        if (this.newObjectAddedReports.has(updatedObject.id)) {
            this.newObjectAddedReports.set(
                updatedObject.id,
                this.extractReportInformationFunc(updatedObject)
            )
        } else {
            this.updatedObjectReports.set(
                updatedObject.id,
                this.extractReportInformationFunc(updatedObject)
            )
        }
    }

    reportDeletedObject(objectId: ID_TYPE): void {
        if (this.newObjectAddedReports.has(objectId)) {
            this.newObjectAddedReports.delete(objectId)
        } else {
            if (this.updatedObjectReports.has(objectId)) {
                this.updatedObjectReports.delete(objectId)
            }
            this.deletedObjectReports.add(objectId)
        }
    }

}
