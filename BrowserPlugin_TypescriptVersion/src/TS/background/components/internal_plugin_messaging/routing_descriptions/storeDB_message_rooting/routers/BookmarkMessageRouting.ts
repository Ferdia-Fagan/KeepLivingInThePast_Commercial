import BookmarkObject from "../../../../datastores/stores/bookmarks/BookmarkObject";

export default interface BookmarkMessageRouting {
    getAllBookmarks(): BookmarkObject[]
}

