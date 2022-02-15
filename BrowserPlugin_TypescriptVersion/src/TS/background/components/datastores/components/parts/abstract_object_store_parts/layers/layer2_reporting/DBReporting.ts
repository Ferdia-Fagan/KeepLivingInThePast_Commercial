import {
    ID_TYPE,
    PersistedStoreObject
} from "../layer0_db/store_object/Types";
import {DBOperationsReport, ReportName} from "./dtos/DBOperationsReport";
import {
    DBOperationsReportGeneric,
    DBOperationsReportGenericWithMappedType, DeleteReport, InsertReport,
    ReportObjectBaseDataRequirements, UpdatesReport
} from "./Types";

export {
    // Interface
    DBInsertsReportingInterface, DBMutationOperations,
    // Types
    A_DBInsertsReportingController, A_DBAllOperationsReportingController,
    // Abstract concrete
    DBReportingControllerBase,
    // concrete
    InsertOperationsReporting, AllOperationsReporting
}

type ReportsData = {
    [reportName in ReportName]: DBOperationsReportGeneric;
}

interface DBInsertsReportingInterface<P_STORE_REPORT_T extends PersistedStoreObject> {
    reportAddedObject(newSyncedObj: P_STORE_REPORT_T): void
}

type A_DBInsertsReportingController<P_STORE_REPORT_T extends PersistedStoreObject> =
    DBInsertsReportingInterface<P_STORE_REPORT_T>

interface DBMutationOperations<
    R_STORE_REPORT_T extends PersistedStoreObject
> extends DBInsertsReportingInterface<R_STORE_REPORT_T>{
    reportUpdateObject(updatedObject: R_STORE_REPORT_T): void
    reportDeletedObject(id: number): void
}

type A_DBAllOperationsReportingController<
    R_STORE_REPORT_T extends PersistedStoreObject
> = DBMutationOperations<R_STORE_REPORT_T>

abstract class DBReportingControllerBase {

    abstract reportsToCheckWhenReporting: DBOperationsReportGenericWithMappedType[]

    checkIfHaveAReport(): boolean {
        return (
            this.reportsToCheckWhenReporting.some(([_, report]) => report.size == 0)
        )
    }

    getUpdateReport(willClear: boolean = false): DBOperationsReport {
        return Object.fromEntries(
            this.reportsToCheckWhenReporting.map(([reportName, report]) => {
                if(report.size == 0){
                    return [reportName, report.entries()]
                } else {
                    return null
                }
            }).filter(el => el != null)
        )
    }
}

class InsertOperationsReporting<
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends DBReportingControllerBase
    implements DBInsertsReportingInterface<R_STORE_REPORT_T> {

    newObjectAddedReports: InsertReport<R_STORE_REPORT_T> = new Map<ID_TYPE, R_STORE_REPORT_T>()

    reportsToCheckWhenReporting: DBOperationsReportGenericWithMappedType[] = [
        [ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports]
    ]


    reportAddedObject(newSyncedObj: R_STORE_REPORT_T) {
        this.newObjectAddedReports.set(newSyncedObj.id, newSyncedObj)
    }

}

export const createDBReportingManagerForInsertOperations = <
    P_STORE_REPORT_T extends PersistedStoreObject
>() => new InsertOperationsReporting<P_STORE_REPORT_T>()

class AllOperationsReporting<
    R_STORE_REPORT_T extends PersistedStoreObject
>
    extends InsertOperationsReporting<R_STORE_REPORT_T>
    implements DBMutationOperations<R_STORE_REPORT_T> {

    updatedObjectReports: UpdatesReport<R_STORE_REPORT_T>
    deletedObjectReports: DeleteReport

    reportsToCheckWhenReporting: DBOperationsReportGenericWithMappedType[] = [
        [ReportName.NEW_OBJECTS_ADDED_REPORT, this.newObjectAddedReports],
        [ReportName.UPDATED_OBJECTS_REPORT, this.updatedObjectReports],
        [ReportName.DELETED_OBJECTS_REPORT, this.deletedObjectReports]
    ]

    reportUpdateObject(updatedObject: R_STORE_REPORT_T) {
        if(this.newObjectAddedReports.has(updatedObject.id)){
            this.newObjectAddedReports.set(updatedObject.id, updatedObject)
        } else {
            this.updatedObjectReports.set(updatedObject.id, updatedObject)
        }
    }

    reportDeletedObject(objectId: ID_TYPE) {
        if(this.newObjectAddedReports.has(objectId)) {
            this.newObjectAddedReports.delete(objectId)
        } else {
            if(this.updatedObjectReports.has(objectId)) {
                this.updatedObjectReports.delete(objectId)
            }
            this.deletedObjectReports.add(objectId)
        }
    }

}

export const createDBReportingManagerForAllOperations = <
    R_STORE_REPORT_T extends PersistedStoreObject
> () => new AllOperationsReporting<R_STORE_REPORT_T>()

