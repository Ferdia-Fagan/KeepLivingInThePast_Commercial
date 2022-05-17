"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserStateManager = exports.BrowserStateManager = void 0;
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
const NativeApplicationCommunicationLink_1 = require("../../../native_application_communication/NativeApplicationCommunicationLink");
const WindowTabsStateManager_1 = require("../layer1_windows_state_management/WindowTabsStateManager");
const WebpagesCache_1 = require("../layer2_webpage_state_management/components.webpages/WebpagesCache");
const Types_1 = require("../layer2_webpage_state_management/entities/Types");
const BrowserWindows_1 = require("./entities/BrowserWindows");
class BrowserStateManager extends BrowserWindows_1.BrowserState {
    constructor(currentWindowOpen = new WindowTabsStateManager_1.WindowTabsStateManager(), currentWindowsOpen = new Map([[1, currentWindowOpen]])) {
        super(currentWindowOpen, currentWindowsOpen);
        this.webpagesCache = (0, WebpagesCache_1.getWebpagesCache)();
        this.nativeApp = NativeApplicationCommunicationLink_1.nativeApplicationCommunicationLink;
        this.webpageIdMap = (0, WebpagesCache_1.getWebpageIdMap)();
        this.focusOnCurrentTab = () => this.currentWindowOpen.focusOnCurrentTab();
        this.unfocusOnCurrentTab = () => this.currentWindowOpen.unfocusOnCurrentTab();
    }
    // Bookmarks controll
    addWebpageBookmark(webpageId, bookmarkId) {
        this.webpageIdMap.get(webpageId).addWebpageBookmark(bookmarkId);
    }
    removeWebpageBookmark(webpageId, bookmarkId) {
        this.webpageIdMap.get(webpageId).removeWebpageBookmark(bookmarkId);
    }
    // TODO: this is generic!! []
    getWebpageIdFromUrl(url) {
        const theUrl = new URL(url);
        if (this.webpagesCache.checkIfWebpageHasBeenCached(theUrl.hostname, theUrl.pathname)) {
            return Promise.resolve(this.webpagesCache.getWebpageIdForURL(theUrl.hostname, theUrl.pathname));
        }
        else {
            return new Promise((resolve, reject) => {
                throw new Error('Method not implemented.');
                // TODO complete
                // return this.nativeApp.sendRequest(
                //     create_Command_LogWebpageVisit({
                //         hostName: theUrl.hostname,
                //         pathName: theUrl.pathname
                //     }),
                //     resolve
                // )
            });
        }
    }
    addNewWindowOpened(windowId, windowTabsStateManager) {
        this.windows.set(windowId, windowTabsStateManager);
    }
    changeActiveWindowOpenedById(changedWindowId) {
        this.currentWindowOpen = this.windows.get(changedWindowId);
    }
    changeActiveWindowOpened(windowTabsStateManager) {
        this.currentWindowOpen = windowTabsStateManager;
    }
    getActiveWindowOpened() {
        return this.currentWindowOpen;
    }
    removeWindow(deletedWindowId) {
        this.windows.delete(deletedWindowId);
    }
    changeCurrentFocusedTab(windowId, previousTabId, updatedCurrentTabId) {
    }
    changeCurrentFocusedWindow(windowId) {
    }
    closeTab(windowId, tabId) {
    }
    closeWindow(windowId) {
    }
    newWebpageLoaded(url, tabId, timeStamp) {
    }
    openNewTab(windowId, tabId) {
    }
    openNewWindow(windowId) {
    }
}
exports.BrowserStateManager = BrowserStateManager;
const createWindowsFromBrowserWindows = (browserWindows) => {
    const windowTabUrls = browserWindows.flatMap(window => {
        return window.tabs.map(tab => ({
            windowId: window.id,
            tabId: tab.id,
            webpageIdentifier: (0, Types_1.getWebpageHostnameAndPathnameFromUrl)(tab.url)
        }));
    });
    // TODO: use windowTabUrls to get webpages from native application
    // use this to make webpages/tabs in windows
    throw new Error("not implemented yet");
};
const createBrowserStateManager = (currentBrowserWindow, currentBrowserWindows) => {
    const windows = createWindowsFromBrowserWindows(currentBrowserWindows);
    return new BrowserStateManager(windows.get(currentBrowserWindow.id), windows);
};
function setup() {
    Promise.all([
        webextension_polyfill_1.default.windows.getCurrent(),
        webextension_polyfill_1.default.windows.getAll()
    ]).then(([currentWindow, currentWindows]) => {
        createBrowserStateManager(currentWindow, currentWindows);
    });
}
exports.browserStateManager = new BrowserStateManager(); // BrowserStateManagerImpl(currentWindowsOpen, currentWindowOpen)
//# sourceMappingURL=BrowserStateManager.js.map