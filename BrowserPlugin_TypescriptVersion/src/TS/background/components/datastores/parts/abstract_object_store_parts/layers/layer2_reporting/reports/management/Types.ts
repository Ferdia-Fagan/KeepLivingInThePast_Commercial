import {DeleteReport, InsertReport, UpdatesReport} from "../dtos/IndividualReports";
import {ReportName} from "../ReportName";

export type InsertOrUpdatesReport = InsertReport<any> | UpdatesReport<any>
export type DBOperationsReportGeneric = InsertOrUpdatesReport | DeleteReport
export type DBOperationsReportGenericWithMappedType = [ReportName, DBOperationsReportGeneric]