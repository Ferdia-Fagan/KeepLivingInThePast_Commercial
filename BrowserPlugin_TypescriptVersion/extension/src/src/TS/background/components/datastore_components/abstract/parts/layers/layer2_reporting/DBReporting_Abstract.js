"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBReportingControllerBase = void 0;
/**
 * DBReporting implementation base
 */
class DBReportingControllerBase {
    constructor(extractReportInformationFunc) {
        this.extractReportInformationFunc = extractReportInformationFunc;
    }
    checkIfHaveAReport() {
        return (this.reportsToCheckWhenReporting.some(([_, report]) => report.size == 0));
    }
    getUpdateReport(willClear = false) {
        return Object.fromEntries(this.reportsToCheckWhenReporting.map(([reportName, report]) => {
            if (report.size == 0) {
                return [reportName, report.entries()];
            }
            else {
                return null;
            }
        }).filter(el => el != null));
    }
}
exports.DBReportingControllerBase = DBReportingControllerBase;
//# sourceMappingURL=DBReporting_Abstract.js.map