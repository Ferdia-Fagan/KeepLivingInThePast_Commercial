import BookmarkObject from "../../../../datastores/components/stores/bookmarks/BookmarkObject";

export default interface BookmarkMessageRouting {
    getAllBookmarks(): BookmarkObject[]
}

