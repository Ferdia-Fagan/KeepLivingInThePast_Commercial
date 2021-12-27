import {
    BookmarksReport,
    CreatedBookmarkReport,
    UpdatedBookmarkReport,
} from "../../../../../datastores/stores/bookmarks/BookmarksReport";
import {BookmarkId} from "../../../../../datastores/stores/bookmarks/Types";
import {NativeMessageBaseInterface} from "../../../NativeMessageBaseInterface";
import {MessageType} from "../../../values/MessageType";


export function create_BookmarksReport_Message(
    createdBookmarksReport: CreatedBookmarkReport[] = null,
    updatedBookmarksReport: UpdatedBookmarkReport[] = null,
    deletedBookmarksReport: BookmarkId[] = null
): NativeMessageBaseInterface<BookmarksReport> {
    return {
        type: MessageType.Record_BookmarksReport,
        message: {
            createdBookmarksReport,
            updatedBookmarksReport,
            deletedBookmarksReport
        }
    }
}