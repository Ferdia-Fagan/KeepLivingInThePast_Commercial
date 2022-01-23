import {IndexObject} from "../../../store_objects_interfaces/base_store_objects/IndexObject";

export interface AutoAnnotatorSetup {
    name: string,
    tagIds: Array<number>,
    hostIds: Array<number>
}

export default interface AutoAnnotatorSetupObject
    extends IndexObject, AutoAnnotatorSetup {
}

export interface AutoAnnotatorSetupObjectUpdateInterface {
    id: number,
    name: string,
    tagIds: Array<number>,
    hostIds: Array<number>
}