import TagObject from "../../datastore_components/concrete/tags/objs/Tag";

export default interface UserActions {

    changeTagsOfWebpage(message: any): TagObject[]
    // getCurrentWebpageTags(message: any): TODO: complete

    // getAllTagsAndBookmarks()    TODO: complete
    // query(message: any): TODO: complete this internal message

    updateSettings(message: any): void

}


