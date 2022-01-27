"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReportToCheckWhenReportingDBStoreChanges_1 = __importDefault(require("./ReportToCheckWhenReportingDBStoreChanges"));
class ReportToCheckWhenReportingDBDeletions extends ReportToCheckWhenReportingDBStoreChanges_1.default {
    constructor(report, reportName) {
        super();
        this.report = report;
        this.reportName = reportName;
    }
    addToReport(objectID) {
        this.report.add(objectID);
    }
}
exports.default = ReportToCheckWhenReportingDBDeletions;
//# sourceMappingURL=ReportToCheckWhenReportingDBDeletions.js.map