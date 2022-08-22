import TagObject from "../../../../../../domain/components/datastore_components/concrete/tags/objs/Tag";

export default interface TagMessageRouting {

    addNewTags(message: any): TagObject[]
    getAllTags(message: any): TagObject[]

}


