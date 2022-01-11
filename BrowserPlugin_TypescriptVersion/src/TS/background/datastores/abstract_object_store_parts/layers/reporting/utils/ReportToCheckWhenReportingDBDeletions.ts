import {ReportName} from "./ReportName";
import ReportToCheckWhenReportingDBStoreChanges from "./ReportToCheckWhenReportingDBStoreChanges";
import {ReportToCheckWhenReportingDBDeletionsInterface} from "./ReportToCheckWhenReporting";
import {ID_TYPE} from "../../../../store_objects_interfaces/types/Types";

export default class ReportToCheckWhenReportingDBDeletions
    extends ReportToCheckWhenReportingDBStoreChanges
    implements ReportToCheckWhenReportingDBDeletionsInterface{
    report: Set<ID_TYPE>
    reportName: ReportName;
    constructor(report: Set<ID_TYPE>, reportName: ReportName) {
        super()
        this.report = report
        this.reportName = reportName
    }
    addToReport(objectID: ID_TYPE) : void {
        this.report.add(objectID)
    }
}
