"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrowserStateManager = exports.getBrowserStateManager = exports.browserStateManagerHasBeenSetUp = exports.BrowserStateManagerImpl = exports.Browser = void 0;
class Browser {
    constructor(currentWindowsOpen, currentWindowOpen) {
        this.currentWindowsOpen = new Map();
        this.currentWindowsOpen = currentWindowsOpen;
        this.currentWindowOpen = currentWindowOpen;
    }
}
exports.Browser = Browser;
class BrowserStateManagerImpl extends Browser {
    addNewWindowOpened(windowId, windowTabsStateManager) {
        this.windowsOpen.set(windowId, windowTabsStateManager);
    }
    changeActiveWindowOpenedById(changedWindowId) {
        this.currentWindowOpen = this.windowsOpen.get(changedWindowId);
    }
    changeActiveWindowOpened(windowTabsStateManager) {
        this.currentWindowOpen = windowTabsStateManager;
    }
    getActiveWindowOpened() {
        return this.currentWindowOpen;
    }
    removeWindow(deletedWindowId) {
        this.windowsOpen.delete(deletedWindowId);
    }
}
exports.BrowserStateManagerImpl = BrowserStateManagerImpl;
var browserStateManager = null;
function browserStateManagerHasBeenSetUp() {
    return (browserStateManager == null);
}
exports.browserStateManagerHasBeenSetUp = browserStateManagerHasBeenSetUp;
function getBrowserStateManager() {
    return browserStateManager;
}
exports.getBrowserStateManager = getBrowserStateManager;
function createBrowserStateManager(currentWindowsOpen = new Map(), currentWindowOpen = null) {
    browserStateManager = new BrowserStateManagerImpl(currentWindowsOpen, currentWindowOpen);
    // newBrowserStateManager.addNewWindowOpened(windowId,currentWindowOpen)
    // newBrowserStateManager.changeActiveWindowOpened(currentWindowOpen)
}
exports.createBrowserStateManager = createBrowserStateManager;
//# sourceMappingURL=BrowserStateManager.js.map