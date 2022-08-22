import {BookmarkId} from "../../../../datastore_components/concrete/bookmarks/Types";
import {TagId} from "../../../../datastore_components/concrete/tags/objs/Types";
import {WebpageState} from "../entities/Webpage";

export interface WebpageFocusStateManagementInterface
    extends WebpageState {
    focusOnCurrentTab(timeStamp: number): void
    unfocusOnCurrentTab(timeStamp: number): void
}

export interface WebpageTotalVisitTimeStateManagementInterface
    extends WebpageState {
    logWebpageVisitTime?(currentTimeStamp: number): void

    logWebpageLeaveTime?(currentTimeStamp: number): void
}

export interface WebpageMetaDataStateManagementInterface
    extends WebpageState {
    addWebpageBookmark?(parentBookmarkId: number): void

    removeWebpageBookmark?(parentBookmarkId: number): void

    getWebpageBookmarks?(): Set<BookmarkId>

    // removeWebpageBookmark()  TODO: complete

    addTags(tagIds: Set<TagId>): void

    removeTags(tagIds: Set<TagId>): void

    getTags?(): Set<TagId>

    markAsIndexed?(): void

}
