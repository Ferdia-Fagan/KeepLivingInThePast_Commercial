import {
    WebpageId
} from "../../../browser_state_management/layer/windows_state_management/layer/webpage_state_management/entities/webpage/Types";
import {BookmarkId} from "./Types";

// --------------------------------------------------
// CREATED

export interface CreatedBookmarkReport {
    bookmarkId: BookmarkId,
    bookmarkFolderId: BookmarkId,
    webpageId: WebpageId
}

export interface CreatedBookmarksReport {
    createdBookmarksReport: CreatedBookmarkReport[]
}

// --------------------------------------------------
// DELETED

export interface DeleteBookmarksReport {
    deletedBookmarksReport: BookmarkId[]
}

// --------------------------------------------------
// UPDATE

export interface UpdatedBookmarkReport {
    bookmarkId: BookmarkId,
    bookmarkFolderId: BookmarkId
}

export interface UpdatedBookmarksReport {
    updatedBookmarksReport: UpdatedBookmarkReport[]
}

// --------------------------------------------------

export interface BookmarksReport
    extends CreatedBookmarksReport,
        UpdatedBookmarksReport,
        DeleteBookmarksReport {

}