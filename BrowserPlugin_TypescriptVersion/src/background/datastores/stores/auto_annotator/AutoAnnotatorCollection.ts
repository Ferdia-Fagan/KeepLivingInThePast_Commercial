import BasicStore from "../../abstract_stores/BasicStore";
import IndexObject from "../../DTOs/baseDTOs/IndexObject";


interface AutoAnnotator extends IndexObject {
    id: number,
    name: string,
    tagIds: Array<number>,
    hostIds: Array<number>
}

export const AutoAnnotatorCollection = new BasicStore<AutoAnnotator>("",1,"")
