import {UnaryReport} from "../../../../browser_state_management/handlers/reporting/UnaryReport";
import {HostnameId} from "./Types";

export interface AutoAnnotatorHostnameReport {
    hostnameId: HostnameId,
    hostname: string
}

export type AutoAnnotatorHostnamesReport = UnaryReport<AutoAnnotatorHostnameReport>

