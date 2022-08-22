import browser, {Idle, Tabs} from "webextension-polyfill";
import {
    browserController_FocusCheckUser,
    BrowserController_FocusCheckUser
} from "../../layers/layer0_browser_state_management/trades/BrowserController_FocusCheckUser_Trade";
import IdleState = Idle.IdleState;
import Tab = Tabs.Tab;

// TODO: complete and test

export const DETECTION_INTERVAL = 250

export class FocusCheckUserManager {

    browserController: BrowserController_FocusCheckUser

    constructor(browserConnection: BrowserController_FocusCheckUser) {
        this.browserController = browserConnection

        browser.idle.setDetectionInterval(DETECTION_INTERVAL)
        browser.idle.onStateChanged.addListener(idleState => this.handleBrowserStateChange(idleState));
    }

    /**
     * @description
     * Called on state change.
     * If changes to idle -> it focus checks the user, and turns off logging of visit time of current web page .
     * If changes to active -> it turns logging of visit time of current web page back on.
     * @param {*} state
     */
    private handleBrowserStateChange(state: IdleState): void {
        // TODO: refactor
        if(state == "idle"){
            browser.tabs.query({currentWindow: true, active: true})
                .then(tabsInfo => this.pauseLoggingTimeIfCurrentTabIsNotActive(tabsInfo))
        } else if(state == "active"){
            this.browserController.focusOnCurrentTab();
        }
    }

    /**
     * @description
     * Checks if current web page on has audio or is muted, and if it is it logs web page visit time for the
     * current webpage/tab and pauses counting from there.
     * @param {*} tabInfo
     */
    private pauseLoggingTimeIfCurrentTabIsNotActive(tabInfo: Tab[]): void {
        // TODO: refactor
        // if(!tabInfo[0].audible || tabInfo[0].mutedInfo.muted){
        if(!tabInfo[0].audible){
            this.browserController.unfocusOnCurrentTab()
            console.log("hello")
        }
    }


}

const focusCheckUserManager = new FocusCheckUserManager(
    browserController_FocusCheckUser
)



