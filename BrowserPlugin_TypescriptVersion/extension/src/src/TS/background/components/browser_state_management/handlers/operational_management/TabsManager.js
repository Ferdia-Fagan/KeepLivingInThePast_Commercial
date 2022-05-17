"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
class TabsManager {
    constructor() {
        webextension_polyfill_1.default.tabs.onActivated.addListener(this.onChangeActiveTab.bind(this));
        webextension_polyfill_1.default.tabs.onCreated.addListener(this.onCreateNewTab.bind(this));
        webextension_polyfill_1.default.tabs.onRemoved.addListener(this.onRemoveTab.bind(this));
    }
    onChangeActiveTab(newCurrentTab) {
        this.browserController.changeActiveTab(newCurrentTab.windowId, newCurrentTab.previousTabId, newCurrentTab.tabId);
    }
    onCreateNewTab(newTabCreated) {
        this.browserController.getWebpageForUrl(newTabCreated.url).then((webpage) => {
            this.browserController.createNewTab(newTabCreated.windowId, newTabCreated.id, webpage);
        });
    }
    onRemoveTab(tabId, removeInfo) {
        this.browserController.removeTab(removeInfo.windowId, tabId);
    }
}
//# sourceMappingURL=TabsManager.js.map