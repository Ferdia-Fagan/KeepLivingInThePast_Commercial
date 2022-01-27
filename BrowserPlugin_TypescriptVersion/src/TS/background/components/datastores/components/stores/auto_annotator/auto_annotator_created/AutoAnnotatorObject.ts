import {IndexObject} from "../../../../parts/store_objects_interfaces/base_store_objects/IndexObject";
import {TagId} from "../../tags/Types";
import {HostnameId} from "../auto_annotator_hostnames/Types";
import {AutoAnnotatorId} from "./Types";

export interface AutoAnnotatorSetup {
    name: string,
    // TODO: feature: combinations of tag ids, host ids, bookmarks, etc.
    tagIds: Array<TagId>,
    hostIds: Array<HostnameId>
}

export type AutoAnnotatorObject = IndexObject & AutoAnnotatorSetup

export interface AutoAnnotatorSetupObjectUpdateInterface {
    id: AutoAnnotatorId,
    name: string,
    tagIds: Array<TagId>,
    hostIds: Array<HostnameId>
}