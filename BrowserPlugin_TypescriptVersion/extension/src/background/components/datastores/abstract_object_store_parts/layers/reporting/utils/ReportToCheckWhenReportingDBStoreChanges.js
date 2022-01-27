"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportToCheckWhenReportingDBStoreChanges {
    containsReport() { return this.report.size != 0; }
    isReportEmpty() { return this.report.size == 0; }
    getUpdateReport(clearAfter) {
        let report = [...this.report.values()];
        if (clearAfter) {
            this.report.clear();
        }
        return report;
    }
}
exports.default = ReportToCheckWhenReportingDBStoreChanges;
//# sourceMappingURL=ReportToCheckWhenReportingDBStoreChanges.js.map