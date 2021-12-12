import IndexObject from "../../../../store_objects_interfaces/base_store_objects/IndexObject";
import {ID} from "../../../../../../utils/Aliases";
import {ReportName} from "./ReportName";
import ReportToCheckWhenReportingDBStoreChanges from "./ReportToCheckWhenReportingDBStoreChanges";
import {ReportToCheckWhenReportDBInsertionsAndUpdatesInterface} from "./ReportToCheckWhenReporting";


export default class ReportToCheckWhenReportingDBInsertionsOrUpdates<STORE_T extends IndexObject>
    extends ReportToCheckWhenReportingDBStoreChanges<STORE_T>
    implements ReportToCheckWhenReportDBInsertionsAndUpdatesInterface<STORE_T>{
    report: Map<ID, STORE_T>
    reportName: ReportName;
    constructor(report: Map<ID, STORE_T>, reportName: ReportName) {
        super()
        this.report = report
        this.reportName = reportName
    }
    addToReport(objectId: ID, object: STORE_T) : void {
        this.report.set(objectId, object)
    }
}



