// TODO: complete

import browser from "webextension-polyfill";

import {WebNavigation} from "webextension-polyfill";
import BrowserController_UserBrowserNavigation
    , {
    browserController_UserBrowserNavigation
} from "../../layers/layer0_browser_state_management/trades/BrowserController_UserBrowserNavigation";
import {WindowId} from "../../layers/layer0_browser_state_management/values/Types";
import {TabId} from "../../layers/layer1_windows_state_management/values/Types";
import {isNavigationToANewWebpage} from "./Helpers";

interface UserBrowserNavigationManagement {

    openNewWindow(newWindow: browser.Windows.Window): void
    closeWindow(windowId: WindowId): void
    changeCurrentWindow(windowId: WindowId): void

    openNewTab(tab: browser.Tabs.Tab): void
    tabClosed(tabId: TabId, tabCloseInfo: browser.Tabs.OnRemovedRemoveInfoType): void
    changeActiveTab(tabChangeInfo: browser.Tabs.OnActivatedActiveInfoType): void


    newWebpageLoaded(details: WebNavigation.OnCompletedDetailsType): void

}

export class UserBrowserNavigationManager
    implements UserBrowserNavigationManagement {
    browserController: BrowserController_UserBrowserNavigation
    constructor(browserController: BrowserController_UserBrowserNavigation) {
        this.browserController = browserController

        // Windows:
        browser.windows.onCreated.addListener(this.openNewWindow.bind(this))
        browser.windows.onRemoved.addListener(this.closeWindow.bind(this))
        browser.windows.onFocusChanged.addListener(this.changeCurrentWindow.bind(this))

        // Tabs:
        browser.tabs.onCreated.addListener(this.openNewTab.bind(this))
        browser.tabs.onRemoved.addListener(this.tabClosed.bind(this))
        browser.tabs.onActivated.addListener(this.changeActiveTab.bind(this))

        // Pages
        browser.webNavigation.onCompleted.addListener(this.newWebpageLoaded.bind(this))
    }

    openNewWindow(newWindow: browser.Windows.Window): void {
        this.browserController.openNewWindow(newWindow.id)
        // TODO: newWindow has tabs etc aswell. Add this stuff.
    }

    closeWindow(windowId: WindowId): void {
        this.browserController.closeWindow(windowId)
    }

    changeCurrentWindow(windowId: WindowId): void {
        this.browserController.changeCurrentFocusedWindow(windowId)
    }

    openNewTab(tab: browser.Tabs.Tab): void {
        this.browserController.openNewTab(tab.windowId, tab.id)
    }

    tabClosed(tabId: TabId, tabCloseInfo: browser.Tabs.OnRemovedRemoveInfoType): void {
        this.browserController.closeTab(tabCloseInfo.windowId, tabId)
    }

    changeActiveTab(tabChangeInfo: browser.Tabs.OnActivatedActiveInfoType): void {
        this.browserController.changeCurrentFocusedTab(
            tabChangeInfo.windowId,
            tabChangeInfo.previousTabId, tabChangeInfo.tabId
        )
        // TODO: the below was in OG codebase. This should make design
        // so that events should be sent and received instead of this direct calling.
        // if(SIDEBAR_WANTS_2B_NOTIFIED_OF_WEBPAGE_CHANGE){
        //     tellSidebarAboutNewWebpage(BrowserDataComponent.tabState.getCurrentWebpage())
        // }
    }


    newWebpageLoaded(details: WebNavigation.OnCompletedDetailsType): void {
        if(isNavigationToANewWebpage(details.frameId)) {
            // Then navigating to new webpage
            this.browserController.newWebpageLoaded(
                details.url,
                details.tabId, details.timeStamp
            )
        } else {
            // the new webpage load is an iFrame
            // TODO: complete eventually
        }
    }

}

const userBrowserNavigationManager = new UserBrowserNavigationManager(
    browserController_UserBrowserNavigation
)
