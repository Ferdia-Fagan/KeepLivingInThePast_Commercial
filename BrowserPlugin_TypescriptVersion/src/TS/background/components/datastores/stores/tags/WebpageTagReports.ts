import {UnaryReport} from "../../../browser_state_management/handlers/reporting/UnaryReport";
import {
    WebpageId
} from "../../../browser_state_management/layers/layer2_webpage_state_management/entities/Types";
import {TagId} from "./Types";

interface WebpageTagReportIdentifier {
    tagId: TagId,
    webpageId: WebpageId
}

export type WebpageTagReports = UnaryReport<WebpageTagReportIdentifier>
