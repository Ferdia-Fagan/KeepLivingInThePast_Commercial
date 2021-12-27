import {
    DeleteAutoAnnotatorsReport,
    NewAutoAnnotatorReport
} from "../../../../datastores/stores/auto_annotator/auto_annotator_created/AutoAnnotatorReport";
import {AutoAnnotatorId} from "../../../../datastores/stores/auto_annotator/auto_annotator_created/Types";
import {HostnameId} from "../../../../datastores/stores/auto_annotator/auto_annotator_hostnames/Types";
import {TagId} from "../../../../datastores/stores/tags/Types";
import {NativeMessageBaseInterface} from "../../NativeMessageBaseInterface";
import {MessageType} from "../../values/MessageType";

export type NewAutoAnnotatorReportMessage = NewAutoAnnotatorReport
export function create_NewAutoAnnotatorReportMessage_Message(
    autoAnnotatorId: AutoAnnotatorId,
    tagIds: Array<number>,
    hostIds: Array<number>
): NativeMessageBaseInterface<NewAutoAnnotatorReportMessage> {
    return {
        type: MessageType.Save_NewAutoAnnotatorReport,
        message: {
            autoAnnotatorId,
            tagIds,
            hostIds
        }
    }
}

export interface UpdatedAutoAnnotatorReportMessage {
    autoAnnotatorId: AutoAnnotatorId,

    tagIds_Added: TagId[],
    tagIds_Removed: TagId[],

    hostIds_Added: HostnameId[],
    hostIds_Removed: HostnameId[]
}
export function create_UpdatedAutoAnnotatorReportMessage_Message(
    autoAnnotatorId: AutoAnnotatorId,

    tagIds_Added: TagId[],
    tagIds_Removed: TagId[],

    hostIds_Added: HostnameId[],
    hostIds_Removed: HostnameId[]
): NativeMessageBaseInterface<UpdatedAutoAnnotatorReportMessage> {
    return {
        type: MessageType.Save_NewAutoAnnotatorReport,
        message: {
            autoAnnotatorId,
            tagIds_Added,
            tagIds_Removed,
            hostIds_Added,
            hostIds_Removed
        }
    }
}

export type DeleteAutoAnnotatorReportMessage = DeleteAutoAnnotatorsReport
export function create_DeleteAutoAnnotatorReportMessage_Message(
    autoAnnotatorIds: DeleteAutoAnnotatorsReport
): NativeMessageBaseInterface<DeleteAutoAnnotatorReportMessage> {
    return {
        type: MessageType.Save_NewAutoAnnotatorReport,
        message: autoAnnotatorIds
    }
}

