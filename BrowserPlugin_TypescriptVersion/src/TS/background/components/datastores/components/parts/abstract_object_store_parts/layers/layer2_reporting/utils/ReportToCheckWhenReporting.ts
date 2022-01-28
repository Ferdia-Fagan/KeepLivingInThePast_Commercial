import {StoreObjectInterface} from "../../layer0_db/store_object/StoreObject";
import {ID_TYPE} from "../../layer0_db/store_object/DataTypes";

export type REPORT_OUTPUT_T<STORE_T extends StoreObjectInterface> = (STORE_T | number)[]

export interface ReportToCheckWhenReportingDBChangesInterface<
    STORE_T extends StoreObjectInterface = StoreObjectInterface
> {
    containsReport(): boolean,
    isReportEmpty(): boolean,
    getUpdateReport(clearAfter: boolean): (number | STORE_T)[]  // TODO: refactor: need to have this be more poly
}

export interface ReportToCheckWhenReportingDBDeletionsInterface extends ReportToCheckWhenReportingDBChangesInterface {
    addToReport(objectID: ID_TYPE) : void
}

export interface ReportToCheckWhenReportDBInsertionsAndUpdatesInterface<STORE_T extends StoreObjectInterface> extends ReportToCheckWhenReportingDBChangesInterface{
    addToReport(objectId: ID_TYPE, object: STORE_T) : void
}
