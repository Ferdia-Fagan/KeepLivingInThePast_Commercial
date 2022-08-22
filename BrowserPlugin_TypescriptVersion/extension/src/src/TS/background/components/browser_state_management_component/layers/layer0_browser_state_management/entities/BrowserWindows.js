"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserState = void 0;
const WindowTabsStateManager_1 = require("../../layer1_windows_state_management/WindowTabsStateManager");
class BrowserState {
    constructor(currentWindowOpen = new WindowTabsStateManager_1.WindowTabsStateManager(), currentWindowsOpen = new Map([[1, currentWindowOpen]])) {
        this.windows = new Map();
        this.currentWindowOpen = currentWindowOpen;
        this.windows = currentWindowsOpen;
    }
}
exports.BrowserState = BrowserState;
//# sourceMappingURL=BrowserWindows.js.map