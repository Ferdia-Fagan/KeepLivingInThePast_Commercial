import {TabId} from "../../layer1_windows_state_management/values/Types";
import {browserStateManager} from "../BrowserStateManager";
import {WindowId} from "../values/Types";

export default interface BrowserController_UserBrowserNavigation_Trade {

    openNewWindow(windowId: WindowId): void
    closeWindow(windowId: WindowId): void
    changeCurrentFocusedWindow(windowId: WindowId): void

    openNewTab(windowId: WindowId, tabId: TabId): void
    closeTab(windowId: WindowId, tabId: TabId): void
    changeCurrentFocusedTab(windowId: WindowId, previousTabId: TabId, updatedCurrentTabId: TabId): void

    newWebpageLoaded(url: string, tabId: TabId, timeStamp: number): void

}

export type BrowserController_UserBrowserNavigation = BrowserController_UserBrowserNavigation_Trade

export const browserController_UserBrowserNavigation: BrowserController_UserBrowserNavigation = browserStateManager
