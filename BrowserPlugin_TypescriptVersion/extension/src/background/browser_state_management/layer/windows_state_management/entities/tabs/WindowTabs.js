"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WindowTabs {
    constructor(tabs, currentFocusedTabId) {
        this.tabs = new Map();
        this.currentFocusedTabId = null;
        this.tabs = tabs;
        this.currentFocusedTabId = currentFocusedTabId;
    }
}
exports.default = WindowTabs;
//# sourceMappingURL=WindowTabs.js.map