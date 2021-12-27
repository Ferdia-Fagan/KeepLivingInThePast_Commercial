import {WebpageTagReports} from "../../../../../datastores/stores/tags/WebpageTagReports";
import {NativeMessageBaseInterface} from "../../../NativeMessageBaseInterface";
import {MessageType} from "../../../values/MessageType";

interface TagsReport {
    tagsUpdateReport: WebpageTagReports
}

export function create_TagsReport_Message(
    tagsUpdateReport: WebpageTagReports
): NativeMessageBaseInterface<TagsReport> {
    return {
        type: MessageType.Record_TagsReport,
        message: {
            tagsUpdateReport
        }
    }
}

