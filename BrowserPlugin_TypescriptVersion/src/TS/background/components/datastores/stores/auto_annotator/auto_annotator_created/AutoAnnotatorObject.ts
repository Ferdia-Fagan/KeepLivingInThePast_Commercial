import {
    NonPersistedStoreObjectStub
} from "../../../parts/abstract_object_store_parts/layers/layer0_db/store_object/StoreObject_Dtos";
import {TagId} from "../../tags/Types";
import {HostnameId} from "../auto_annotator_hostnames/Types";
import {AutoAnnotatorId} from "./Types";

export interface AutoAnnotatorSetup {
    name: string,
    // TODO: feature: combinations of tag ids, host ids, bookmarks, etc.
    tagIds: Array<TagId>,
    hostIds: Array<HostnameId>
}

export type AutoAnnotatorObject = NonPersistedStoreObjectStub & AutoAnnotatorSetup

export interface AutoAnnotatorSetupObjectUpdateInterface {
    id: AutoAnnotatorId,
    name: string,
    tagIds: Array<TagId>,
    hostIds: Array<HostnameId>
}