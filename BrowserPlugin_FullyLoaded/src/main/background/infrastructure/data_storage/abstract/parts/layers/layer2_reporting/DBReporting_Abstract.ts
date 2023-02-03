import {NonPersistedStoreObjectStub} from "../layer0_db/store_object/StoreObject_Dtos";
import {PersistedStoreObject} from "../layer0_db/store_object/StoreObject_Types";
import {ExtractReportInformationFunc} from "./implementations/DBInsertOperationsReporting";
import {DBFullOperationsReport} from "./reports/dtos/DBFullOperationsReport";
import {DBOperationsReportGenericWithMappedType} from "./reports/management/Types";

/**
 * DBReporting implementation base
 */
export abstract class DBReportingControllerBase<
    STORE_OBJECT_T extends NonPersistedStoreObjectStub,
    R_STORE_REPORT_T extends PersistedStoreObject
> {

    extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>

    protected constructor(extractReportInformationFunc: ExtractReportInformationFunc<STORE_OBJECT_T, R_STORE_REPORT_T>) {
        this.extractReportInformationFunc = extractReportInformationFunc
    }

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

