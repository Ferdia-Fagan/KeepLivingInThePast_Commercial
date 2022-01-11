import {BrowserController_Bookmarks_Trade} from "../../../trades/BrowserController_Bookmarks_Trade";
import {BrowserController_FocusCheckUser_Trade} from "../../../trades/BrowserController_FocusCheckUser_Trade";
import {BrowserState} from "../BrowserStateManager";
import {TabChange} from "../../layer1_windows_state_management/dtos/TabStateChanges";
import {WindowTabsStateManager} from "../../layer1_windows_state_management/WindowTabsStateManager";
import NewWebpageOpenedDetails from "../../layer2_webpage_state_management/dtos/NewWebpageOpenedDetails";

export interface BrowserStateManagement
    extends BrowserState,
            BrowserController_FocusCheckUser_Trade,
            BrowserController_Bookmarks_Trade {

    addNewWindowOpened(windowId: number, windowTabsStateManager: WindowTabsStateManager): void

    changeActiveWindowOpenedById(changedWindowId: number): void

    changeActiveWindowOpened(tabsStateManager: WindowTabsStateManager): void

    getActiveWindowOpened(): WindowTabsStateManager

    removeWindow(deletedWindowId: number): void
}

export interface WindowTabStateManagementInterface {
    tabCreated(tab: any): void  // TODO: specific type
    tabChanged(tabChangeDetails: TabChange): void

    tabRemoved(tabId: number): void
} // TODO: complete hook up

export interface  WebpageStateManagementInterface {
    // recordWebpageVisit(webPageUrl: string, tabId: number, timeStamp: number): void
    newWebpageOpened(newWebpageOpenedDetails: NewWebpageOpenedDetails): void

    updateWebpageBookmark(webpageLoggingId: number, parentBookmarkId: number): void

    // updateWebpagesTags(webpageLoggingId: number, )   TODO: complete
}