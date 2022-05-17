import HostnameObject from "../../../../datastores/concrete_store_implementations/auto_annotator/auto_annotator_hostnames/HostnameObject";
import AutoAnnotatorObject
    from "../../../../datastores/concrete_store_implementations/auto_annotator/auto_annotator_created/AutoAnnotatorObject";

export interface AutoAnnotatorMessageRouting {
    // addHostnameToCollection(message: any)    TODO: complete this internal message handler description
    getAllHostnames(message: any): HostnameObject[]

    // createAutoAnnotator(message: any)    TODO: complete this internal message handler
    getAllAutoAnnotators(message: any): AutoAnnotatorObject[]
    getAutoAnnotator(message: any): AutoAnnotatorObject
    // updateAutoAnnotator(message: any)    TODO: complete this internal message handler
    deleteAutoAnnotator(message: any): void
}
