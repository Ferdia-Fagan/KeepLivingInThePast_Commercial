import {ID} from "../../../../../../utils/Aliases";
import IndexObject from "../../../../store_objects_interfaces/base_store_objects/IndexObject";

export type REPORT_OUTPUT_T<STORE_T extends IndexObject> = (STORE_T | number)[]

export interface ReportToCheckWhenReportingDBChangesInterface<
    STORE_T extends IndexObject = IndexObject
> {
    containsReport(): boolean,
    isReportEmpty(): boolean,
    getUpdateReport(clearAfter: boolean): (number | STORE_T)[]  // TODO: refactor: need to have this be more poly
}

export interface ReportToCheckWhenReportingDBDeletionsInterface extends ReportToCheckWhenReportingDBChangesInterface {
    addToReport(objectID: ID) : void
}

export interface ReportToCheckWhenReportDBInsertionsAndUpdatesInterface<STORE_T extends IndexObject> extends ReportToCheckWhenReportingDBChangesInterface{
    addToReport(objectId: ID, object: STORE_T) : void
}
