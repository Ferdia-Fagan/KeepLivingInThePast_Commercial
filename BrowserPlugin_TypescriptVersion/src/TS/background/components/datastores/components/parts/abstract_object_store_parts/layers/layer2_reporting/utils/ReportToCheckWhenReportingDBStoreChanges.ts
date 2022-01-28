import {StoreObjectInterface} from "../../layer0_db/store_object/StoreObject";
import {ReportName} from "./ReportName";
import {ReportToCheckWhenReportingDBChangesInterface} from "./ReportToCheckWhenReporting";
import {ID_TYPE} from "../../layer0_db/store_object/DataTypes";

type REPORT_T<STORE_T extends StoreObjectInterface> = Map<ID_TYPE, STORE_T> | Set<ID_TYPE>

export default abstract class ReportToCheckWhenReportingDBStoreChanges<STORE_T extends StoreObjectInterface = StoreObjectInterface>
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

