"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = exports.createWindowFromBrowserWindow = exports.WindowTabsStateManager = void 0;
const WindowTabsState_1 = __importDefault(require("./entities/WindowTabsState"));
/**
 *  Description:
 *  Model of browser window
 */
// TODO: complete
class WindowTabsStateManager extends WindowTabsState_1.default {
    openNewTab(tabId) {
        this.tabs.set(tabId, null);
    }
    closeTab(tabId) {
        this.tabs.delete(tabId);
    }
    changeFocusedTab(prevFocusedTabId, newFocusedTabId, timeStamp) {
        throw new Error("Method not implemented.");
        // TODO: complete
    }
    setCurrentTab(tabId) {
        this.currentFocusedTabId = tabId;
        this.currentFocusedWebpage = this.tabs.get(tabId);
    }
    openWebpageOnTab(tabId, newWebpageOnTab, visitTime) {
        this.tabs.set(tabId, newWebpageOnTab);
    }
    getWebpageAtTab(tabId) {
        return this.tabs.get(tabId);
    }
    getCurrentWebpage() {
        return this.currentFocusedWebpage;
    }
    getCurrentTabWebpageTags() {
        return this.currentFocusedWebpage.getTags();
    }
    focusOnCurrentTab() {
        this.currentFocusedWebpage.focusOnCurrentTab(Date.now());
    }
    unfocusOnCurrentTab() {
        this.currentFocusedWebpage.unfocusOnCurrentTab(Date.now());
    }
}
exports.WindowTabsStateManager = WindowTabsStateManager;
function createWindowFromBrowserWindow(window) {
}
exports.createWindowFromBrowserWindow = createWindowFromBrowserWindow;
function createWindow(currentFocusedTabId = 1, currentFocusedWebpage = null, tabs = new Map([[currentFocusedTabId, currentFocusedWebpage]])) {
    return new WindowTabsStateManager(tabs, currentFocusedTabId, currentFocusedWebpage);
}
exports.createWindow = createWindow;
//# sourceMappingURL=WindowTabsStateManager.js.map