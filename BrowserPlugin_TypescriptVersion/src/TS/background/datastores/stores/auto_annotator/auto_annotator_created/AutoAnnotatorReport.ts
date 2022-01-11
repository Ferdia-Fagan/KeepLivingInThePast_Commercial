/**
 * This is needed for updating past webpages with host ids their respective tags
 */
import {AutoAnnotatorId} from "./Types";

export interface NewAutoAnnotatorReport {
    autoAnnotatorId: AutoAnnotatorId,
    tagIds: Array<number>,
    hostIds: Array<number>
}

export type UpdatedAutoAnnotatorReport = NewAutoAnnotatorReport

export type DeleteAutoAnnotatorsReport = AutoAnnotatorId[]
