import TagObject from "../../../../datastores/stores/tags/TagObject";

export default interface TagMessageRouting {

    addNewTags(message: any): TagObject[]
    getAllTags(message: any): TagObject[]

}


