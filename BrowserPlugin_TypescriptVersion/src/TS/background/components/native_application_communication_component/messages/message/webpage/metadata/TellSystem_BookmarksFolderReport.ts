import {
    BookmarksReport,
    CreatedBookmarkReport,
    UpdatedBookmarkReport,
} from "../../../../../datastore_components/concrete/bookmarks/BookmarksReport";
import {BookmarkId} from "../../../../../datastore_components/concrete/bookmarks/Types";
import {NativeMessageOut} from "../../../NativeMessageOut";
import {MessageType} from "../../../values/MessageType";

type TellSystem_BookmarksFolderReport = BookmarksReport

export function create_TellSystem_BookmarksFolderReport(
    createdBookmarksReport: CreatedBookmarkReport[] = null,
    updatedBookmarksReport: UpdatedBookmarkReport[] = null,
    deletedBookmarksReport: BookmarkId[] = null
): NativeMessageOut<TellSystem_BookmarksFolderReport> {
    return {
        type: MessageType.Record_BookmarksReport,
        messageData: {
            createdBookmarksReport,
            updatedBookmarksReport,
            deletedBookmarksReport
        }
    }
}