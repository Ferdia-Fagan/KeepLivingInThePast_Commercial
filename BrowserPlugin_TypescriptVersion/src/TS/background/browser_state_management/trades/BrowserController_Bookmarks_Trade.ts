import {BookmarkId} from "../../datastores/stores/bookmarks/Types";
import {getBrowserStateManager} from "../layers/layer0_browser_state_management/BrowserStateManager";
import {WebpageId} from "../layers/layer2_webpage_state_management/entities/Types";

export interface BrowserController_Bookmarks_Trade {
    addWebpageBookmark(webpageId: WebpageId, bookmarkId: BookmarkId): void

    removeWebpageBookmark(webpageId: WebpageId, bookmarkId: BookmarkId): void

    getWebpageIdFromUrl(url: string): Promise<WebpageId>
}

export type BrowserController_Bookmarks = BrowserController_Bookmarks_Trade

export function get_BrowserController_Bookmarks_Trade(): BrowserController_Bookmarks {
    return getBrowserStateManager()
}