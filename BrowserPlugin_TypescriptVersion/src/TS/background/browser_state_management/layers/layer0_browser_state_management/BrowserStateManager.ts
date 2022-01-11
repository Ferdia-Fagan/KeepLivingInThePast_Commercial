import {
    create_Command_LogWebpageVisit
} from "../../../native_application_communication/messages/message/webpage/Command_LogWebpageVisit";
import {
    getNativeApplicationCommunicationLink, NativeApplicationCommunicationContract
} from "../../../native_application_communication/NativeApplicationCommunicationLink";
import MapCache from "../../../utils/MapCache";
import {TabId} from "../layer1_windows_state_management/values/Types";
import {WindowTabsStateManager} from "../layer1_windows_state_management/WindowTabsStateManager";
import {
    getWebpageIdMap,
    getWebpagesCache, WebpagesCache
} from "../layer2_webpage_state_management/components.webpages/WebpagesCache";
import {WebpageId} from "../layer2_webpage_state_management/entities/Types";
import {Webpage} from "../layer2_webpage_state_management/entities/Webpage";
import {WebpageStateContainer} from "../layer2_webpage_state_management/WebpageStateManagement";
import {BrowserStateManagement} from "./management/Actions";

type WindowId = number

export abstract class BrowserState {
    protected windowsOpen = new Map<WindowId, WindowTabsStateManager>();

    protected currentWindowOpen: WindowTabsStateManager;

    protected webpageIdMap: MapCache<WebpageId, Webpage>

    constructor(
        currentWindowOpen: WindowTabsStateManager = new WindowTabsStateManager(),
        currentWindowsOpen: Map<number, WindowTabsStateManager> = new Map([[1, currentWindowOpen]])
    ) {
        this.windowsOpen = currentWindowsOpen
        this.currentWindowOpen = currentWindowOpen
    }

}

export interface BrowserStateContainer
    extends BrowserState,

            BrowserStateManagement {

}

export class BrowserStateManager
    extends BrowserState
    implements BrowserStateContainer {

    webpagesCache: WebpagesCache = getWebpagesCache()

    nativeApp: NativeApplicationCommunicationContract = getNativeApplicationCommunicationLink()

    webpageIdMap: MapCache<WebpageId, WebpageStateContainer> = getWebpageIdMap()

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
                return this.nativeApp.sendRequest(
                    create_Command_LogWebpageVisit({
                        hostName: theUrl.hostname,
                        pathName: theUrl.pathname
                    }),
                    resolve
                )
            })
        }
    }

    addNewWindowOpened(
        windowId: number,
        windowTabsStateManager: WindowTabsStateManager
    ): void {
        this.windowsOpen.set(windowId, windowTabsStateManager);
    }

    changeActiveWindowOpenedById(changedWindowId: number){
        this.currentWindowOpen = this.windowsOpen.get(changedWindowId);
    }

    changeActiveWindowOpened(windowTabsStateManager: WindowTabsStateManager){
        this.currentWindowOpen = windowTabsStateManager
    }

    getActiveWindowOpened(): WindowTabsStateManager{
        return this.currentWindowOpen;
    }

    removeWindow(deletedWindowId: number){
        this.windowsOpen.delete(deletedWindowId);
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

export const browserStateManager: BrowserStateManagement = new BrowserStateManager()    // BrowserStateManagerImpl(currentWindowsOpen, currentWindowOpen)

