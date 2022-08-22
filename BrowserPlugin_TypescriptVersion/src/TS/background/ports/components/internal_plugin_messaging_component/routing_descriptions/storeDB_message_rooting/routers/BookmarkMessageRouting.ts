import BookmarkObject from "../../../../../../domain/components/datastore_components/concrete/bookmarks/BookmarkObject";

export default interface BookmarkMessageRouting {
    getAllBookmarks(): BookmarkObject[]
}

