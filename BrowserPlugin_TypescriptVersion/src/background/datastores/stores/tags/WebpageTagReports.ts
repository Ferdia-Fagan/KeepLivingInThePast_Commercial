import {UnaryReport} from "../../../browser_state_management/handlers/reporting/UnaryReport";
import {
    WebpageId
} from "../../../browser_state_management/layer/windows_state_management/layer/webpage_state_management/entities/webpage/Types";
import {TagId} from "./Types";

interface WebpageTagReportIdentifier {
    tagId: TagId,
    webpageId: WebpageId
}

export type WebpageTagReports = UnaryReport<WebpageTagReportIdentifier>
