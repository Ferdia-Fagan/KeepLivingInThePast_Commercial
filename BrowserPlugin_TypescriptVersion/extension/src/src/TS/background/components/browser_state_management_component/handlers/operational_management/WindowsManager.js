"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
class WindowsManager {
    constructor() {
        webextension_polyfill_1.default.windows.onCreated.addListener(this.onWindowOpened.bind(this));
        webextension_polyfill_1.default.windows.onRemoved.addListener(this.onWindowRemoved.bind(this));
        webextension_polyfill_1.default.windows.onFocusChanged.addListener(this.onChangedFocusedWindow.bind(this));
    }
    onWindowOpened(newWindowOpened) {
        this.browserController.getWebpageIdsForUrls(newWindowOpened.tabs.map((tab) => tab.url)).then((webpageIds) => {
            this.browserController.windowOpened(newWindowOpened.id, {
                tabs: new Map(newWindowOpened.tabs.map((tab) => [tab.id, webpageIds.get(tab.url)]))
            });
        });
    }
    onWindowRemoved(windowIdAreClosing) {
        this.browserController.windowClosed(windowIdAreClosing);
    }
    onChangedFocusedWindow(newFocusedWindowId) {
        this.browserController.changeFocusedWindow(newFocusedWindowId);
    }
}
//# sourceMappingURL=WindowsManager.js.map