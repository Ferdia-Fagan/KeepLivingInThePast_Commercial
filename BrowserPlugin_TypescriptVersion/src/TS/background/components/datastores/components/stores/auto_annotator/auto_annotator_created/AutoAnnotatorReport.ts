/**
 * This is needed for updating past webpages with host ids their respective tags
 */
import {TagId} from "../../tags/Types";
import {HostnameId} from "../auto_annotator_hostnames/Types";
import {AutoAnnotatorId} from "./Types";

export interface NewAutoAnnotatorReport {
    autoAnnotatorId: AutoAnnotatorId,
    tagIds: Array<TagId>,
    hostIds: Array<HostnameId>
}

export type UpdatedAutoAnnotatorReport = NewAutoAnnotatorReport

export type DeleteAutoAnnotatorsReport = AutoAnnotatorId[]
