import {IndexObject} from "../../../../store_objects_interfaces/base_store_objects/IndexObject";
import {ReportName} from "./ReportName";
import ReportToCheckWhenReportingDBStoreChanges from "./ReportToCheckWhenReportingDBStoreChanges";
import {ReportToCheckWhenReportDBInsertionsAndUpdatesInterface} from "./ReportToCheckWhenReporting";
import {ID_TYPE} from "../../../../store_objects_interfaces/types/Types";


export default class ReportToCheckWhenReportingDBInsertionsOrUpdates<STORE_T extends IndexObject>
    extends ReportToCheckWhenReportingDBStoreChanges<STORE_T>
    implements ReportToCheckWhenReportDBInsertionsAndUpdatesInterface<STORE_T>{
    report: Map<ID_TYPE, STORE_T>
    reportName: ReportName;
    constructor(report: Map<ID_TYPE, STORE_T>, reportName: ReportName) {
        super()
        this.report = report
        this.reportName = reportName
    }
    addToReport(objectId: ID_TYPE, object: STORE_T) : void {
        this.report.set(objectId, object)
    }
}



