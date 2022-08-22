import {NonPersistedStoreObjectStub} from "../../layer0_db/store_object/StoreObject_Dtos";
import {ID_TYPE, PersistedStoreObject} from "../../layer0_db/store_object/StoreObject_Types";
import {DBReportingControllerBase} from "../DBReporting_Abstract";
import {DBOperationsReportGenericWithMappedType} from "../reports/management/Types";
import {ReportName} from "../reports/ReportName";
import {InsertReport} from "../reports/dtos/IndividualReports";

export type ExtractReportInformationFunc<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
> = (obj: STORE_OBJECT_T) => R_STORE_REPORT_T

export interface DBInsertsReporting_I<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
> {

    extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>

    reportAddedObject(newSyncedObj: STORE_OBJECT_T): void
    reportAddedObjects(newSyncedObjs: STORE_OBJECT_T[]): void

}

export interface DBInsertOperationsReporting_I<
    R_STORE_REPORT_T extends PersistedStoreObject
    > {
    newObjectAddedReports: InsertReport<R_STORE_REPORT_T>
}

export class DBInsertOperationsReporting<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends DBReportingControllerBase<STORE_OBJECT_T, R_STORE_REPORT_T>
    implements
        DBInsertsReporting_I<STORE_OBJECT_T, R_STORE_REPORT_T>,
        DBInsertOperationsReporting_I<R_STORE_REPORT_T>
{

    newObjectAddedReports: InsertReport<R_STORE_REPORT_T> = new Map<ID_TYPE, R_STORE_REPORT_T>()

    reportsToCheckWhenReporting: DBOperationsReportGenericWithMappedType[] = [
        [ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports]
    ]

    constructor(
        dbReports: DBInsertOperationsReporting_I<R_STORE_REPORT_T>,
        extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>
    ) {
        super(extractReportInformationFunc)
        this.newObjectAddedReports = dbReports.newObjectAddedReports
    }

    reportAddedObject(newSyncedObj: STORE_OBJECT_T): void {
        this.newObjectAddedReports.set(
            newSyncedObj.id,
            this.extractReportInformationFunc(newSyncedObj)
        )
    }

    reportAddedObjects(newSyncedObjs: STORE_OBJECT_T[]): void {
        newSyncedObjs.forEach( newObjectAdded => this.reportAddedObject(newObjectAdded) )
    }

}

