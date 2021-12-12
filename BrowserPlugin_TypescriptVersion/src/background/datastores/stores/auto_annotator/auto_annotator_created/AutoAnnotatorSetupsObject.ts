import IndexObject from "../../../store_objects_interfaces/base_store_objects/IndexObject";

export default interface AutoAnnotatorSetupsObject extends IndexObject {
    id?: number,
    name: string,
    tagIds: Array<number>,
    hostIds: Array<number>
}

export interface AutoAnnotatorSetupsObjectUpdateInterface extends IndexObject {
    id: number,
    name: string,
    tagIds: Array<number>,
    hostIds: Array<number>
}