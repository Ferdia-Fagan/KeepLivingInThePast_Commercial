import {BookmarkId} from "../../../../datastores/components/stores/bookmarks/Types";
import {browserStateManager} from "../BrowserStateManager";
import {WebpageId} from "../../layer2_webpage_state_management/entities/Types";

export interface BrowserController_Bookmarks_Trade {
    addWebpageBookmark(webpageId: WebpageId, bookmarkId: BookmarkId): void

    removeWebpageBookmark(webpageId: WebpageId, bookmarkId: BookmarkId): void

    getWebpageIdFromUrl(url: string): Promise<WebpageId>
}

export type BrowserController_Bookmarks = BrowserController_Bookmarks_Trade

export const browserController_Bookmarks: BrowserController_Bookmarks = browserStateManager
