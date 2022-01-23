import {IndexObject} from "../../../../store_objects_interfaces/base_store_objects/IndexObject";
import {ReportName} from "./ReportName";
import {ReportToCheckWhenReportingDBChangesInterface} from "./ReportToCheckWhenReporting";
import {ID_TYPE} from "../../../../store_objects_interfaces/types/Types";

type REPORT_T<STORE_T extends IndexObject> = Map<ID_TYPE, STORE_T> | Set<ID_TYPE>

export default abstract class ReportToCheckWhenReportingDBStoreChanges<STORE_T extends IndexObject = IndexObject>
    implements ReportToCheckWhenReportingDBChangesInterface<STORE_T> {
    abstract report: REPORT_T<STORE_T>
    abstract reportName: ReportName

    containsReport(){ return this.report.size != 0 }
    isReportEmpty(){ return this.report.size == 0 }
    getUpdateReport(clearAfter: boolean): (number | STORE_T)[] {
        let report = [...this.report.values()]
        if(clearAfter){
            this.report.clear()
        }
        return report
    }
}

