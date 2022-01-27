import TagObject from "../../datastores/components/stores/tags/TagObject";

export default interface UserActions {

    changeTagsOfWebpage(message: any): TagObject[]
    // getCurrentWebpageTags(message: any): TODO: complete

    // getAllTagsAndBookmarks()    TODO: complete
    // query(message: any): TODO: complete this internal message

    updateSettings(message: any): void

}


