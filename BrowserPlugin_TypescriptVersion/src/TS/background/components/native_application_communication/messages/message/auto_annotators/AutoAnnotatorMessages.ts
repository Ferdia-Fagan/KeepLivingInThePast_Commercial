import {
    DeleteAutoAnnotatorsReport,
    NewAutoAnnotatorReport
} from "../../../../datastores/concrete_store_implementations/auto_annotator/auto_annotator_created/AutoAnnotatorReport";
import {AutoAnnotatorId} from "../../../../datastores/concrete_store_implementations/auto_annotator/auto_annotator_created/Types";
import {HostnameId} from "../../../../datastores/concrete_store_implementations/auto_annotator/auto_annotator_hostnames/Types";
import {TagId} from "../../../../datastores/concrete_store_implementations/tags/Types";
import {NativeMessageOut} from "../../NativeMessageOut";
import {MessageType} from "../../values/MessageType";

export type TellSystem_NewAutoAnnotatorReport = NewAutoAnnotatorReport
export function create_TellSystem_NewAutoAnnotatorReportMessage_Message(
    newAutoAnnotatorReport: TellSystem_NewAutoAnnotatorReport
): NativeMessageOut<TellSystem_NewAutoAnnotatorReport> {
    return {
        type: MessageType.Save_NewAutoAnnotatorReport,
        messageData: newAutoAnnotatorReport
    }
}

export interface TellSystem_UpdatedAutoAnnotatorReport {
    autoAnnotatorId: AutoAnnotatorId,

    tagIds_Added: TagId[],
    tagIds_Removed: TagId[],

    hostIds_Added: HostnameId[],
    hostIds_Removed: HostnameId[]
}
export function create_TellSystem_UpdatedAutoAnnotatorReportMessage(
    updatedAutoAnnotatorReport: TellSystem_UpdatedAutoAnnotatorReport
): NativeMessageOut<TellSystem_UpdatedAutoAnnotatorReport> {
    return {
        type: MessageType.Save_NewAutoAnnotatorReport,
        messageData: updatedAutoAnnotatorReport
    }
}

export type TellSystem_DeleteAutoAnnotatorReport = DeleteAutoAnnotatorsReport
export function create_TellSystem_DeleteAutoAnnotatorReport(
    autoAnnotatorIds: DeleteAutoAnnotatorsReport
): NativeMessageOut<TellSystem_DeleteAutoAnnotatorReport> {
    return {
        type: MessageType.Save_NewAutoAnnotatorReport,
        messageData: autoAnnotatorIds
    }
}

