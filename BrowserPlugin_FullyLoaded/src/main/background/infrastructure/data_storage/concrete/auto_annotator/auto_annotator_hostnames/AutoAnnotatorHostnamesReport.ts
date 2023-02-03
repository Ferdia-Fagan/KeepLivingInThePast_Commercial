import {UnaryReport} from "../../../../browser_state_management_component/handlers/reporting/UnaryReport";
import {HostnameId} from "./Types";

export interface AutoAnnotatorHostnameReport {
    hostnameId: HostnameId,
    hostname: string
}

export type AutoAnnotatorHostnamesReport = UnaryReport<AutoAnnotatorHostnameReport>

