"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WindowTabsState {
    constructor(tabs = new Map(), currentFocusedTabId = null, currentFocusedWebpage = null) {
        this.tabs = new Map();
        this.currentFocusedTabId = null;
        this.tabs = tabs;
        this.currentFocusedTabId = currentFocusedTabId;
        this.currentFocusedWebpage = currentFocusedWebpage;
    }
}
exports.default = WindowTabsState;
//# sourceMappingURL=WindowTabsState.js.map