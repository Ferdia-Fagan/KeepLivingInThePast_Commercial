"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WindowTabsState {
    constructor(x
    // windowId: WindowId,
    // tabs: Map<TabId, WebpageStateContainer> = new Map<TabId, WebpageStateContainer>(),
    // currentFocusedTabId: TabId = null,
    // currentFocusedWebpage: WebpageStateContainer = null
    ) {
        this.tabs = new Map();
        this.currentFocusedTabId = null;
        Object.assign(this, x);
        // this.windowId = windowId
        // this.tabs = tabs
        // this.currentFocusedTabId = currentFocusedTabId
        // this.currentFocusedWebpage = currentFocusedWebpage
    }
}
exports.default = WindowTabsState;
//# sourceMappingURL=WindowTabsState.js.map