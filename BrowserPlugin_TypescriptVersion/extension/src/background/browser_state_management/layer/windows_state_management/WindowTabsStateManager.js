"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = exports.WindowTabsStateManagerImpl = void 0;
const WindowTabs_1 = __importDefault(require("./entities/tabs/WindowTabs"));
/**
 *  Description:
 *  Model of browser window
 */
// TODO: complete
class WindowTabsStateManagerImpl extends WindowTabs_1.default {
    openNewTab(tabId) {
        throw new Error("Method not implemented.");
    }
    closeTab(tabId) {
        throw new Error("Method not implemented.");
    }
    changeFocusedTab(prevFocusedTabId, newFocusedTabId, timeStamp) {
        throw new Error("Method not implemented.");
    }
    setCurrentTab(tabId) {
        throw new Error("Method not implemented.");
    }
    openWebpageOnTab(tabId, newWebpageOnTab, visitTime) {
        throw new Error("Method not implemented.");
    }
    getWebpageAtTab(tabId) {
        throw new Error("Method not implemented.");
    }
    getCurrentWebpage() {
        throw new Error("Method not implemented.");
    }
    getCurrentTabWebpageTags() {
        throw new Error("Method not implemented.");
    }
    focusOnCurrentTab(timeStamp) {
        throw new Error("Method not implemented.");
    }
    unFocusCurrentTab(timeStamp) {
        throw new Error("Method not implemented.");
    }
}
exports.WindowTabsStateManagerImpl = WindowTabsStateManagerImpl;
function createWindow(tabs = new Map(), currentFocusedTabId = null) {
    return new WindowTabsStateManagerImpl(tabs, currentFocusedTabId);
}
exports.createWindow = createWindow;
//# sourceMappingURL=WindowTabsStateManager.js.map