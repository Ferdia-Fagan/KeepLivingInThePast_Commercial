import {DBFullOperationsReport} from "./reports/dtos/DBFullOperationsReport";
import {DBOperationsReportGenericWithMappedType} from "./reports/management/Types";

/**
 * DBReporting implementation base
 */
export abstract class DBReportingControllerBase {

    abstract reportsToCheckWhenReporting: DBOperationsReportGenericWithMappedType[]

    checkIfHaveAReport(): boolean {
        return (
            this.reportsToCheckWhenReporting.some(([_, report]) => report.size == 0)
        )
    }

    getUpdateReport(willClear: boolean = false): DBFullOperationsReport {
        return Object.fromEntries(
            this.reportsToCheckWhenReporting.map(([reportName, report]) => {
                if (report.size == 0) {
                    return [reportName, report.entries()]
                } else {
                    return null
                }
            }).filter(el => el != null)
        )
    }
}

