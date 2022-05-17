import TagObject from "../../../../datastores/concrete_store_implementations/tags/TagObject";

export default interface TagMessageRouting {

    addNewTags(message: any): TagObject[]
    getAllTags(message: any): TagObject[]

}


