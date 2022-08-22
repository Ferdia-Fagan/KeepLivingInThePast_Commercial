import BookmarkObject from "../../../../datastore_components/concrete/bookmarks/BookmarkObject";

export default interface BookmarkMessageRouting {
    getAllBookmarks(): BookmarkObject[]
}

