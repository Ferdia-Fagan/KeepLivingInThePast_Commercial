"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDBAllOperationsReportingComponent = exports.createDBInsertOperationsReportingComponent = void 0;
const DBAllOperationsReporting_1 = require("./implementations/DBAllOperationsReporting");
const DBInsertOperationsReporting_1 = require("./implementations/DBInsertOperationsReporting");
const createDBInsertOperationsReportingComponent = (dbReports, extractReportInformationFunc) => new DBInsertOperationsReporting_1.DBInsertOperationsReporting(dbReports, extractReportInformationFunc);
exports.createDBInsertOperationsReportingComponent = createDBInsertOperationsReportingComponent;
const createDBAllOperationsReportingComponent = (dbReports, extractReportInformationFunc) => new DBAllOperationsReporting_1.DBAllOperationsReporting(dbReports, extractReportInformationFunc);
exports.createDBAllOperationsReportingComponent = createDBAllOperationsReportingComponent;
//# sourceMappingURL=DBReporting_Funcs.js.map