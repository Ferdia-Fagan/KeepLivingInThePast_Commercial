"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FocusCheckUserManager = exports.DETECTION_INTERVAL = void 0;
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
const BrowserController_FocusCheckUser_Trade_1 = require("../../layers/layer0_browser_state_management/trades/BrowserController_FocusCheckUser_Trade");
// TODO: complete and test
exports.DETECTION_INTERVAL = 250;
class FocusCheckUserManager {
    constructor(browserConnection) {
        this.browserController = browserConnection;
        webextension_polyfill_1.default.idle.setDetectionInterval(exports.DETECTION_INTERVAL);
        webextension_polyfill_1.default.idle.onStateChanged.addListener(idleState => this.handleBrowserStateChange(idleState));
    }
    /**
     * @description
     * Called on state change.
     * If changes to idle -> it focus checks the user, and turns off logging of visit time of current web page .
     * If changes to active -> it turns logging of visit time of current web page back on.
     * @param {*} state
     */
    handleBrowserStateChange(state) {
        // TODO: refactor
        if (state == "idle") {
            webextension_polyfill_1.default.tabs.query({ currentWindow: true, active: true })
                .then(tabsInfo => this.pauseLoggingTimeIfCurrentTabIsNotActive(tabsInfo));
        }
        else if (state == "active") {
            this.browserController.focusOnCurrentTab();
        }
    }
    /**
     * @description
     * Checks if current web page on has audio or is muted, and if it is it logs web page visit time for the
     * current webpage/tab and pauses counting from there.
     * @param {*} tabInfo
     */
    pauseLoggingTimeIfCurrentTabIsNotActive(tabInfo) {
        // TODO: refactor
        // if(!tabInfo[0].audible || tabInfo[0].mutedInfo.muted){
        if (!tabInfo[0].audible) {
            this.browserController.unfocusOnCurrentTab();
            console.log("hello");
        }
    }
}
exports.FocusCheckUserManager = FocusCheckUserManager;
const focusCheckUserManager = new FocusCheckUserManager(BrowserController_FocusCheckUser_Trade_1.browserController_FocusCheckUser);
//# sourceMappingURL=FocusCheckUserManager.js.map