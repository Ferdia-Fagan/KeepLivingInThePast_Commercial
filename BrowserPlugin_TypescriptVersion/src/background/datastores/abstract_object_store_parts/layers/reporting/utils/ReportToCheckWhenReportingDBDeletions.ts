import IndexObject from "../../../../store_objects_interfaces/base_store_objects/IndexObject";
import {ID} from "../../../../../../utils/Aliases";
import {ReportName} from "./ReportName";
import ReportToCheckWhenReportingDBStoreChanges from "./ReportToCheckWhenReportingDBStoreChanges";
import {ReportToCheckWhenReportingDBDeletionsInterface} from "./ReportToCheckWhenReporting";

export default class ReportToCheckWhenReportingDBDeletions
    extends ReportToCheckWhenReportingDBStoreChanges
    implements ReportToCheckWhenReportingDBDeletionsInterface{
    report: Set<ID>
    reportName: ReportName;
    constructor(report: Set<ID>, reportName: ReportName) {
        super()
        this.report = report
        this.reportName = reportName
    }
    addToReport(objectID: ID) : void {
        this.report.add(objectID)
    }
}
