import browser, {Bookmarks, Tabs, WebNavigation} from "webextension-polyfill";
import {
    tabIdToWindowIdDependency,
    TabIdToWindowIdT,
    urlToIdDependency, UrlToIdT
} from "../domainModel/analysis/BrowserDataModelsSingleton";
import {BrowserM} from "../domainModel/system/browser/models/BrowserM";
import {createTabEntity, TabM} from "../domainModel/system/browser/models/TabM";
import {WebpageM} from "../domainModel/system/browser/models/WebpageM";
import {createWindowEntity, WindowM} from "../domainModel/system/browser/models/WindowM";
import {BrowserStateDto, createBrowserStateMessage} from "../infrastructure/internalMessages/BrowserStateDto";
import OnRemovedRemoveInfoType = Bookmarks.OnRemovedRemoveInfoType;
import OnMovedMoveInfoType = Tabs.OnMovedMoveInfoType;
import OnAttachedAttachInfoType = Tabs.OnAttachedAttachInfoType;
import OnDetachedDetachInfoType = Tabs.OnDetachedDetachInfoType;
import OnActivatedActiveInfoType = Tabs.OnActivatedActiveInfoType;
import OnCompletedDetailsType = WebNavigation.OnCompletedDetailsType;


export interface WindowsManagerControllerI {

    openNewWindow(newWindow: browser.Windows.Window): void
    closeExistingWindow(windowId: number): void
    changeFocusedWindow(newlyFocusedWindowId: number): void

}

export interface TabsManagerControllerI {

    openNewTab(tab: browser.Tabs.Tab): void
    closeExistingTab(tabId: number, removeInfo: browser.Tabs.OnRemovedRemoveInfoType): void

    moveTab(tabId: number, moveInfo: browser.Tabs.OnMovedMoveInfoType): void
    attachTab(tabId: number, attachInfo: browser.Tabs.OnAttachedAttachInfoType): void
    detachTab(tabId: number, detachInfo: browser.Tabs.OnDetachedDetachInfoType): void

    changeFocusedTab(activeInfo: browser.Tabs.OnActivatedActiveInfoType): void

}

export interface WebpageManagerControllerI {
    visitWebpage(details: OnCompletedDetailsType): void  // TODO: complete
}

export interface SidebarControllerI {
    getBrowserState(): BrowserStateDto
}

export type KindOfBrowserManagerController =
    WindowsManagerControllerI | TabsManagerControllerI | WebpageManagerControllerI

export interface BrowserManagerControllerI
    extends WindowsManagerControllerI, TabsManagerControllerI, WebpageManagerControllerI, SidebarControllerI
    {}

export type BrowserManagerT = BrowserManagerControllerI

export class BrowserManager implements WindowsManagerControllerI, TabsManagerControllerI, WebpageManagerControllerI, SidebarControllerI {

    browser: BrowserM
    tabIdToWindowId: TabIdToWindowIdT
    urlToId: UrlToIdT

    constructor(browser: BrowserM) {
        this.browser = browser
        this.tabIdToWindowId = tabIdToWindowIdDependency()
        this.urlToId = urlToIdDependency()
    }

    // Windows

    openNewWindow(newWindow: browser.Windows.Window) {
        this.browser.openWindow(newWindow)
    }

    closeExistingWindow(windowId: number) {
        this.browser.closeWindow(windowId)
    }

    changeFocusedWindow(newlyFocusedWindowId: number) {
        this.browser.changeCurrentFocusedWindow(newlyFocusedWindowId)
    }

    // Tabs

    changeFocusedTab(activeInfo: Tabs.OnActivatedActiveInfoType) {
        this.browser.windows
            .get(activeInfo.windowId!!)!!
            .changeCurrentFocusedTab(activeInfo.tabId)
    }

    openNewTab(tab: Tabs.Tab) {
        this.browser.windows
            .get(tab.windowId!!)!!
            .openTab(tab)
    }

    closeExistingTab(tabId: number, removeInfo: Tabs.OnRemovedRemoveInfoType) {
        this.browser.windows
            .get(removeInfo.windowId)!!
            .closeTab(tabId)
    }

    moveTab(tabId: number, moveInfo: Tabs.OnMovedMoveInfoType) {
        this.browser.windows
            .get(moveInfo.windowId)!!
            .closeTab(tabId)
    }

    attachTab(tabId: number, attachInfo: Tabs.OnAttachedAttachInfoType) {
        browser.tabs.get(tabId)!!.then( tab => {
            this.browser.windows
                .get(attachInfo.newWindowId)!!
                .attachTab(tab)
        })
    }

    detachTab(tabId: number, detachInfo: Tabs.OnDetachedDetachInfoType) {
        this.browser.windows
            .get(detachInfo.oldWindowId)!!
            .detachTab(tabId)
    }

    visitWebpage(details: OnCompletedDetailsType) {
        const windowId = this.tabIdToWindowId.get(details.tabId)!!
        let webpageId: number
        if(this.urlToId.has(details.url)) {
            webpageId = this.urlToId.get(details.url)!!
        } else {
            webpageId = this.urlToId.setAndGetIndex(details.url)
        }
        const webpage = new WebpageM(webpageId, details.url)

        this.browser.windows
            .get(windowId!!)!!
            .tabs.get(details.tabId)!!
            .changeCurrentWebpage(webpage)
    }

    getBrowserState(): BrowserStateDto {
        console.log("getBrowserState s")
        const x = createBrowserStateMessage(this.browser);
        console.log("getBrowserState complete")
        return x
    }


}

export async function createBrowserManager(): Promise<BrowserManagerT> {
    let currentWindows = await browser.windows.getAll({populate: true})
    let currentWindow = await browser.windows.getCurrent()

    let windowEntities = new Map<number, WindowM>(
        currentWindows.map(window => [window.id!!, createWindowEntity(window)])
    )
    let currentWindowEntity = windowEntities.get(currentWindow.id!!)!!

    let browserEntity = new BrowserM(windowEntities, currentWindowEntity)

    return new BrowserManager(browserEntity)

}


