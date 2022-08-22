"use strict";
// TODO: complete
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBrowserNavigationManager = void 0;
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
const BrowserController_UserBrowserNavigation_1 = require("../../layers/layer0_browser_state_management/trades/BrowserController_UserBrowserNavigation");
const Helpers_1 = require("./Helpers");
class UserBrowserNavigationManager {
    constructor(browserController) {
        this.browserController = browserController;
        // Windows:
        webextension_polyfill_1.default.windows.onCreated.addListener(this.openNewWindow.bind(this));
        webextension_polyfill_1.default.windows.onRemoved.addListener(this.closeWindow.bind(this));
        webextension_polyfill_1.default.windows.onFocusChanged.addListener(this.changeCurrentWindow.bind(this));
        // Tabs:
        webextension_polyfill_1.default.tabs.onCreated.addListener(this.openNewTab.bind(this));
        webextension_polyfill_1.default.tabs.onRemoved.addListener(this.tabClosed.bind(this));
        webextension_polyfill_1.default.tabs.onActivated.addListener(this.changeActiveTab.bind(this));
        // Pages
        webextension_polyfill_1.default.webNavigation.onCompleted.addListener(this.newWebpageLoaded.bind(this));
    }
    openNewWindow(newWindow) {
        this.browserController.openNewWindow(newWindow.id);
        // TODO: newWindow has tabs etc aswell. Add this stuff.
    }
    closeWindow(windowId) {
        this.browserController.closeWindow(windowId);
    }
    changeCurrentWindow(windowId) {
        this.browserController.changeCurrentFocusedWindow(windowId);
    }
    openNewTab(tab) {
        this.browserController.openNewTab(tab.windowId, tab.id);
    }
    tabClosed(tabId, tabCloseInfo) {
        this.browserController.closeTab(tabCloseInfo.windowId, tabId);
    }
    changeActiveTab(tabChangeInfo) {
        this.browserController.changeCurrentFocusedTab(tabChangeInfo.windowId, tabChangeInfo.previousTabId, tabChangeInfo.tabId);
        // TODO: the below was in OG codebase. This should make design
        // so that events should be sent and received instead of this direct calling.
        // if(SIDEBAR_WANTS_2B_NOTIFIED_OF_WEBPAGE_CHANGE){
        //     tellSidebarAboutNewWebpage(BrowserDataComponent.tabState.getCurrentWebpage())
        // }
    }
    newWebpageLoaded(details) {
        if ((0, Helpers_1.isNavigationToANewWebpage)(details.frameId)) {
            // Then navigating to new webpage
            this.browserController.newWebpageLoaded(details.url, details.tabId, details.timeStamp);
        }
        else {
            // the new webpage load is an iFrame
            // TODO: complete eventually
        }
    }
}
exports.UserBrowserNavigationManager = UserBrowserNavigationManager;
const userBrowserNavigationManager = new UserBrowserNavigationManager(BrowserController_UserBrowserNavigation_1.browserController_UserBrowserNavigation);
//# sourceMappingURL=UserBrowserNavigation.js.map