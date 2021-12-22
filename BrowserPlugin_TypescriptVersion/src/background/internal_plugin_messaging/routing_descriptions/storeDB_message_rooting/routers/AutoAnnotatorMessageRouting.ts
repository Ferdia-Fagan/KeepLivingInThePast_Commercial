import HostnameObject from "../../../../datastores/stores/auto_annotator/auto_annotator_hostnames/HostnameObject";
import AutoAnnotatorSetupObject
    from "../../../../datastores/stores/auto_annotator/auto_annotator_created/AutoAnnotatorSetupObject";

export interface AutoAnnotatorMessageRouting {
    // addHostnameToCollection(message: any)    TODO: complete this internal message handler description
    getAllHostnames(message: any): HostnameObject[]

    // createAutoAnnotator(message: any)    TODO: complete this internal message handler
    getAllAutoAnnotators(message: any): AutoAnnotatorSetupObject[]
    getAutoAnnotator(message: any): AutoAnnotatorSetupObject
    // updateAutoAnnotator(message: any)    TODO: complete this internal message handler
    deleteAutoAnnotator(message: any): void
}
