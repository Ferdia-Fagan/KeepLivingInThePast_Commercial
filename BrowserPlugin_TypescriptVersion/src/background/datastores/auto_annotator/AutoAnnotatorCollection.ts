import BasicStore from "../abstract_stores/BasicStore";
import StoreObjectInterface from "../../abstract_store_object_parts/StoreObjectInterface";


interface AutoAnnotator extends StoreObjectInterface {
    id: number,
    name: string,
    tagIds: Array<number>,
    hostIds: Array<number>
}

export const AutoAnnotatorCollection = new BasicStore<AutoAnnotator>("",1,"")
