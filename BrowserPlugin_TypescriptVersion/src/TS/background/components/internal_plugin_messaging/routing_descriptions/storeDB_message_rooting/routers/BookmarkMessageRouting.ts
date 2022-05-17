import BookmarkObject from "../../../../datastores/concrete_store_implementations/bookmarks/BookmarkObject";

export default interface BookmarkMessageRouting {
    getAllBookmarks(): BookmarkObject[]
}

