import {StoreObjectInterface} from "../../layer0_db/store_object/StoreObject";
import {ReportName} from "./ReportName";
import ReportToCheckWhenReportingDBStoreChanges from "./ReportToCheckWhenReportingDBStoreChanges";
import {ReportToCheckWhenReportDBInsertionsAndUpdatesInterface} from "./ReportToCheckWhenReporting";
import {ID_TYPE} from "../../layer0_db/store_object/DataTypes";


export default class ReportToCheckWhenReportingDBInsertionsOrUpdates<STORE_T extends StoreObjectInterface>
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



