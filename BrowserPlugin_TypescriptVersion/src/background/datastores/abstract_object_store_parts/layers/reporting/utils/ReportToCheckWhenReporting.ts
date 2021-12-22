import IndexObject from "../../../../store_objects_interfaces/base_store_objects/IndexObject";
import {ID_TYPE} from "../../../../store_objects_interfaces/types/Types";

export type REPORT_OUTPUT_T<STORE_T extends IndexObject> = (STORE_T | number)[]

export interface ReportToCheckWhenReportingDBChangesInterface<
    STORE_T extends IndexObject = IndexObject
> {
    containsReport(): boolean,
    isReportEmpty(): boolean,
    getUpdateReport(clearAfter: boolean): (number | STORE_T)[]  // TODO: refactor: need to have this be more poly
}

export interface ReportToCheckWhenReportingDBDeletionsInterface extends ReportToCheckWhenReportingDBChangesInterface {
    addToReport(objectID: ID_TYPE) : void
}

export interface ReportToCheckWhenReportDBInsertionsAndUpdatesInterface<STORE_T extends IndexObject> extends ReportToCheckWhenReportingDBChangesInterface{
    addToReport(objectId: ID_TYPE, object: STORE_T) : void
}
