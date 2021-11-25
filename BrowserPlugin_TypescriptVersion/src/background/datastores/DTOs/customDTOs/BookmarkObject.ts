import IndexObject from "../baseDTOs/IndexObject";

enum BookmarkType {
    BookmarkFolder,
    BookmarkWebpage
}

export default interface BookmarkObject extends IndexObject {
    id?: number,
    key: string,
    bookmarkType: BookmarkType,
    parentId: number,
    webpageLoggingId?: number
}
