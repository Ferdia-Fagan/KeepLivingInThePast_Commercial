import {WebpageTagReports} from "../../../../../datastores/components/stores/tags/WebpageTagReports";
import {NativeMessageOut} from "../../../NativeMessageOut";
import {MessageType} from "../../../values/MessageType";

interface TellSystem_TagsReport {
    tagsUpdateReport: WebpageTagReports
}

export function create_TellSystem_TagsReport(
    tagsUpdateReport: WebpageTagReports
): NativeMessageOut<TellSystem_TagsReport> {
    return {
        type: MessageType.Record_TagsReport,
        messageData: {
            tagsUpdateReport
        }
    }
}

