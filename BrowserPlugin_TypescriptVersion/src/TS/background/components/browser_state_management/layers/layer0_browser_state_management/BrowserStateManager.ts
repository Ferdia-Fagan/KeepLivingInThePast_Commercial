import browser from "webextension-polyfill";
import MapCache from "../../../../utils/MapCache";
import {
    NativeApplicationCommunicationContract,
    nativeApplicationCommunicationLink
} from "../../../native_application_communication/NativeApplicationCommunicationLink";
import {TabId} from "../layer1_windows_state_management/values/Types";
import {WindowTabsStateManager} from "../layer1_windows_state_management/WindowTabsStateManager";
import {
    getWebpageIdMap,
    getWebpagesCache,
    WebpagesCache
} from "../layer2_webpage_state_management/components.webpages/WebpagesCache";
import {
    getWebpageHostnameAndPathnameFromUrl,
    WebpageId,
    WebpageIdentifier,
    WebpageUrl
} from "../layer2_webpage_state_management/entities/Types";
import {WebpageStateContainer} from "../layer2_webpage_state_management/WebpageStateManagement";
import {BrowserState, BrowserWindows} from "./entities/BrowserWindows";
import {BrowserStateManagement} from "./management/Actions";
import {WindowId} from "./values/Types";

export interface BrowserStateContainer
    extends BrowserState,

            BrowserStateManagement {

}

export class BrowserStateManager
    extends BrowserState
    implements BrowserStateContainer {

    webpagesCache: WebpagesCache = getWebpagesCache()

    nativeApp: NativeApplicationCommunicationContract = nativeApplicationCommunicationLink

    protected webpageIdMap: MapCache<WebpageId, WebpageStateContainer> = getWebpageIdMap()

    constructor(
        currentWindowOpen: WindowTabsStateManager = new WindowTabsStateManager(),
        currentWindowsOpen: Map<number, WindowTabsStateManager> = new Map([[1, currentWindowOpen]])
    ) {
        super(currentWindowOpen, currentWindowsOpen);
    }

    // Bookmarks controll
    addWebpageBookmark(webpageId: number, bookmarkId: number): void {
        this.webpageIdMap.get(webpageId).addWebpageBookmark(bookmarkId)
    }
    removeWebpageBookmark(webpageId: number, bookmarkId: number): void {
        this.webpageIdMap.get(webpageId).removeWebpageBookmark(bookmarkId)
    }
    // TODO: this is generic!! []
    getWebpageIdFromUrl(url: string): Promise<WebpageId> {
        const theUrl = new URL(url)
        if(this.webpagesCache.checkIfWebpageHasBeenCached(theUrl.hostname, theUrl.pathname)){
            return Promise.resolve(
                this.webpagesCache.getWebpageIdForURL(theUrl.hostname, theUrl.pathname)
            )
        } else {
            return new Promise<WebpageId>((resolve,reject) => {
                throw new Error('Method not implemented.')
                // TODO complete
                // return this.nativeApp.sendRequest(
                //     create_Command_LogWebpageVisit({
                //         hostName: theUrl.hostname,
                //         pathName: theUrl.pathname
                //     }),
                //     resolve
                // )
            })
        }
    }

    addNewWindowOpened(
        windowId: number,
        windowTabsStateManager: WindowTabsStateManager
    ): void {
        this.windows.set(windowId, windowTabsStateManager);
    }

    changeActiveWindowOpenedById(changedWindowId: number){
        this.currentWindowOpen = this.windows.get(changedWindowId);
    }

    changeActiveWindowOpened(windowTabsStateManager: WindowTabsStateManager){
        this.currentWindowOpen = windowTabsStateManager
    }

    getActiveWindowOpened(): WindowTabsStateManager{
        return this.currentWindowOpen;
    }

    removeWindow(deletedWindowId: number){
        this.windows.delete(deletedWindowId);
    }

    focusOnCurrentTab = () => this.currentWindowOpen.focusOnCurrentTab()
    unfocusOnCurrentTab = () => this.currentWindowOpen.unfocusOnCurrentTab()

    changeCurrentFocusedTab(windowId: WindowId, previousTabId: TabId, updatedCurrentTabId: TabId): void {
    }

    changeCurrentFocusedWindow(windowId: WindowId): void {
    }

    closeTab(windowId: WindowId, tabId: TabId): void {
    }

    closeWindow(windowId: WindowId): void {
    }

    newWebpageLoaded(url: string, tabId: TabId, timeStamp: number): void {
    }

    openNewTab(windowId: WindowId, tabId: TabId): void {
    }

    openNewWindow(windowId: WindowId): void {
    }

}

interface WindowTabUrl {
    windowId: WindowId
    tabId: TabId
    webpageIdentifier: WebpageIdentifier
}

const createWindowsFromBrowserWindows = (browserWindows: Array<browser.Windows.Window>): BrowserWindows => {
    const windowTabUrls: WindowTabUrl[] = browserWindows.flatMap(window => {
        return window.tabs.map(tab => ({
            windowId: window.id,
            tabId: tab.id,
            webpageIdentifier: getWebpageHostnameAndPathnameFromUrl(tab.url)
        }))
    })
    // TODO: use windowTabUrls to get webpages from native application
    // use this to make webpages/tabs in windows
    throw new Error("not implemented yet")
}

const createBrowserStateManager = (
    currentBrowserWindow: browser.Windows.Window,
    currentBrowserWindows: Array<browser.Windows.Window>
) => {
    const windows = createWindowsFromBrowserWindows(currentBrowserWindows)
    return new BrowserStateManager(
        windows.get(currentBrowserWindow.id),
        windows
    )
}

function setup(): void {
    Promise.all([
        browser.windows.getCurrent(),
        browser.windows.getAll()
    ]).then(([currentWindow, currentWindows]) => {
        createBrowserStateManager(currentWindow, currentWindows)
    })
}

export const browserStateManager: BrowserStateManagement = new BrowserStateManager()    // BrowserStateManagerImpl(currentWindowsOpen, currentWindowOpen)

